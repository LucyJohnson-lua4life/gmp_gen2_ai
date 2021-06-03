import { EntityManager } from "../aiStates/entityManager";
import { IDrInfoComponent } from "../aiEntities/components/iDrInfoComponent";

/**
 * @interface DrTargetTime
 * Contains the target time to which a new daily routine should be triggered.
 * 
 * @field startHour: start hour of the period - on which the new daily routine should be triggered
 * @field startMinute: start minute of the period - on which the new daily routine should be triggered
 * @field endHour: end hour of the period - on which the new daily routine should be triggered
 * @field endMinute: end minute of the period - on which the new daily routine should be triggered

 */
export interface DrTargetTime {
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
}


/**
 * @interface DrCurrentTime
 * Contains the current time which should be compared against the target time.
 * @field hour: current hour - on which the new daily routine should be triggered
 * @field minute: current minute - on which the new daily routine should be triggered
 */
export interface DrCurrentTime{
    hour: number,
    minute: number
}

/**
 * Handles all functionalities about daily routines of the monster ai.
 */
export class DailyRoutineSystem {
    private entityManager: EntityManager;
    constructor(state: EntityManager) {
        this.entityManager = state;
    }

    public newDrTimePeriodEntered(playerid: number, currentTime:DrCurrentTime, targetPeriod: DrTargetTime): boolean {
        if (this.hoursOverlap(currentTime, targetPeriod)) {
            if (!this.minutesOverlap(currentTime, targetPeriod)) {
                return false;
            }

            if (this.isFirstOverlapWithTargetTime(playerid, currentTime, targetPeriod)) {
                this.entityManager.setDailyRoutineComponent(playerid, {
                    entityId: playerid,
                    startHour: targetPeriod.startHour,
                    startMinute: targetPeriod.startMinute,
                    endHour: targetPeriod.endHour,
                    endMinute: targetPeriod.endMinute,
                    lastHour: currentTime.hour,
                    lastMinute: currentTime.minute
                });

                return true;
            }
            else {
                let dailyRoutineComponent: IDrInfoComponent = this.entityManager.getDailyRoutineComponent(playerid)
                dailyRoutineComponent.lastHour = currentTime.hour
                dailyRoutineComponent.lastMinute = currentTime.minute
                this.entityManager.setDailyRoutineComponent(playerid, dailyRoutineComponent)
                return false;
            }

        }
        return false;
    }

    private isFirstOverlapWithTargetTime(playerid: number, currentTime: DrCurrentTime, targetTime: DrTargetTime) {
        let lastTime: IDrInfoComponent = this.entityManager.getDailyRoutineComponent(playerid)
        return (typeof lastTime.startHour === 'undefined')
            || ((lastTime.startHour !== targetTime.startHour || lastTime.startMinute !== targetTime.startMinute)
                || (lastTime.endHour !== targetTime.endHour || lastTime.endMinute !== targetTime.endMinute))
            || (targetTime.startHour === 0 && targetTime.startMinute === 0 && targetTime.endHour === 24 && targetTime.endMinute === 0 && lastTime.lastHour === 23 && currentTime.hour === 0)
    }

    private hoursOverlap(currentTime:DrCurrentTime, targetTime: DrTargetTime): boolean {
        let offsettedEndHour: number | undefined;

        if (targetTime.startHour > targetTime.endHour) {
            offsettedEndHour = targetTime.endHour + 24
        }
        return (currentTime.hour >= targetTime.startHour && currentTime.hour <= targetTime.endHour)
            || (typeof offsettedEndHour !== 'undefined' && currentTime.hour + 24 >= targetTime.startHour && currentTime.hour <= targetTime.endHour)
            || (typeof offsettedEndHour !== 'undefined' && currentTime.hour >= targetTime.startHour && currentTime.hour <= offsettedEndHour)
    }

    private minutesOverlap(currentTime:DrCurrentTime, info: DrTargetTime): boolean {
        let isOverlapping: boolean = true;
        if (currentTime.hour == info.startHour && currentTime.minute < info.startMinute) {
            isOverlapping = false;
        }
        if (currentTime.hour == info.endHour && currentTime.minute >= info.endMinute) {
            isOverlapping = false
        }
        return isOverlapping;
    }


}