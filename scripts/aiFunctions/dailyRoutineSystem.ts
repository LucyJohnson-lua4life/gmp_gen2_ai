import { EntityManager } from "../aiStates/entityManager";
import { IDrInfoComponent } from "../aiEntities/components/iDrInfoComponent";

/**
 * @interface DRTimeInfo
 * Encapsulates the current time and a time period in minutes and hours. This 
 * structure is used to compare the current time with the previous time period to decide,
 * if a new DailyRoutine should be triggered. 
 * 
 * @field startHour: start hour of the period - on which the new daily routine should be triggered
 * @field startMinute: start minute of the period - on which the new daily routine should be triggered
 * @field endHour: end hour of the period - on which the new daily routine should be triggered
 * @field endMinute: end minute of the period - on which the new daily routine should be triggered
 * @field currentHour: current hour - on which the new daily routine should be triggered
 * @field currentMinute: current minute - on which the new daily routine should be triggered
 */
export interface DrTimeInfo {
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
    currentHour: number,
    currentMinute: number
}

/**
 * Handles all functionalities about daily routines of the monster ai.
 */
export class DailyRoutineSystem {
    private entityManager: EntityManager;
    constructor(state: EntityManager) {
        this.entityManager = state;
    }

    public newDrTimePeriodEntered(playerid: number, info: DrTimeInfo): boolean {
        if (this.currentHourOverlapsWithTriggerPeriod(info)) {
            if (!this.currentMinuteOverlapsWithTriggerPeriod(info)) {
                return false;
            }

            if (this.playerOverlapsWithTriggerPeriodFirstTime(playerid, info)) {
                this.entityManager.setDailyRoutineComponent(playerid, {
                    entityId: playerid,
                    startHour: info.startHour,
                    startMinute: info.startMinute,
                    endHour: info.endHour,
                    endMinute: info.endMinute,
                    lastHour: info.currentHour,
                    lastMinute: info.currentMinute
                });

                return true;
            }
            else {
                let dailyRoutineComponent: IDrInfoComponent = this.entityManager.getDailyRoutineComponent(playerid)
                dailyRoutineComponent.lastHour = info.currentHour
                dailyRoutineComponent.lastMinute = info.currentMinute
                this.entityManager.setDailyRoutineComponent(playerid, dailyRoutineComponent)
                return false;
            }

        }
        return false;
    }

    private playerOverlapsWithTriggerPeriodFirstTime(playerid: number, info: DrTimeInfo) {
        let dailyRoutineComponent: IDrInfoComponent = this.entityManager.getDailyRoutineComponent(playerid)
        return (typeof dailyRoutineComponent.startHour === 'undefined')
            || ((dailyRoutineComponent.startHour !== info.startHour || dailyRoutineComponent.startMinute !== info.startMinute)
                || (dailyRoutineComponent.endHour !== info.endHour || dailyRoutineComponent.endMinute !== info.endMinute))
            || (info.startHour === 0 && info.startMinute === 0 && info.endHour === 24 && info.endMinute === 0 && dailyRoutineComponent.lastHour === 23 && info.currentHour === 0)
    }

    private currentHourOverlapsWithTriggerPeriod(info: DrTimeInfo): boolean {
        let offsettedEndHour: number | undefined;

        if (info.startHour > info.endHour) {
            offsettedEndHour = info.endHour + 24
        }
        return (info.currentHour >= info.startHour && info.currentHour <= info.endHour)
            || (typeof offsettedEndHour !== 'undefined' && info.currentHour + 24 >= info.startHour && info.currentHour <= info.endHour)
            || (typeof offsettedEndHour !== 'undefined' && info.currentHour >= info.startHour && info.currentHour <= offsettedEndHour)
    }

    private currentMinuteOverlapsWithTriggerPeriod(info: DrTimeInfo): boolean {
        let isOverlapping: boolean = true;
        if (info.currentHour == info.startHour && info.currentMinute < info.startMinute) {
            isOverlapping = false;
        }
        if (info.currentHour == info.endHour && info.currentMinute >= info.endMinute) {
            isOverlapping = false
        }
        return isOverlapping;
    }


}