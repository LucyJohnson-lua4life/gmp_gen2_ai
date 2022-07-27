import { IAiDailyRoutineInfo } from "../aiEntities/components/iAiDailyRoutineInfo";
import { AiState } from "../aiStates/aiState";
import { getAiDailyRoutineInfo, setAiDailyRoutineInfo } from "../aiStates/aiStateFunctions/commonAiStateFunctions";

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
export interface DrCurrentTime {
    hour: number,
    minute: number
}

/**
 * Handles all functionalities about daily routines of the monster ai.
 */
export class DailyRoutineSystem {
    private readonly aiState: AiState;
    constructor(state: AiState) {
        this.aiState = state;
    }

    /**
     * Returns if the current time overlaps the target time for the first time, in which case a new daily routine should be triggered.
     * @param playerid name of the entity for which the daily routine is checked
     * @param currentTime the current time
     * @param targetTime the time on which a new daily routine should be triggered.
     * @returns true if a new daily routine should be triggered, otherwise false
     */
    public shouldTriggerDailyRoutine(playerid: number, currentTime: DrCurrentTime, targetTime: DrTargetTime): boolean {
        let result = false
        if (!this.hoursOverlap(currentTime, targetTime) || !this.minutesOverlap(currentTime, targetTime)) {
            result = false;
        }
        else if (this.isFirstOverlapWithTargetTime(playerid, currentTime, targetTime)) {
            this.updateEntityDrInfo(playerid, targetTime, currentTime);
            result = true;
        }
        else {
            this.updateEntityLastHourAndMinute(playerid, currentTime);
            result = false;
        }
        return result;
    }

    private updateEntityLastHourAndMinute(playerid: number, currentTime: DrCurrentTime) {
        const dailyRoutineComponent: IAiDailyRoutineInfo | undefined = getAiDailyRoutineInfo(this.aiState, playerid);
        if (typeof dailyRoutineComponent !== 'undefined') {
            dailyRoutineComponent.lastHour = currentTime.hour;
            dailyRoutineComponent.lastMinute = currentTime.minute;
            setAiDailyRoutineInfo(this.aiState, dailyRoutineComponent);
        }
    }

    private updateEntityDrInfo(playerid: number, targetTime: DrTargetTime, currentTime: DrCurrentTime) {
        setAiDailyRoutineInfo(this.aiState, {
            entityId: playerid,
            startHour: targetTime.startHour,
            startMinute: targetTime.startMinute,
            endHour: targetTime.endHour,
            endMinute: targetTime.endMinute,
            lastHour: currentTime.hour,
            lastMinute: currentTime.minute
        });
    }

    private isFirstOverlapWithTargetTime(playerid: number, currentTime: DrCurrentTime, targetTime: DrTargetTime):boolean {
        const lastTime: IAiDailyRoutineInfo|undefined = getAiDailyRoutineInfo(this.aiState, playerid)
        if(typeof lastTime !== 'undefined'){
        return (typeof lastTime.startHour === 'undefined')
            || ((lastTime.startHour !== targetTime.startHour || lastTime.startMinute !== targetTime.startMinute)
                || (lastTime.endHour !== targetTime.endHour || lastTime.endMinute !== targetTime.endMinute))
            || (targetTime.startHour === 0 && targetTime.startMinute === 0 && targetTime.endHour === 24 && targetTime.endMinute === 0 && lastTime.lastHour === 23 && currentTime.hour === 0)
        }
        return false
    }

    private hoursOverlap(currentTime: DrCurrentTime, targetTime: DrTargetTime): boolean {
        let offsettedEndHour: number | undefined;

        if (targetTime.startHour > targetTime.endHour) {
            offsettedEndHour = targetTime.endHour + 24
        }
        return (currentTime.hour >= targetTime.startHour && currentTime.hour <= targetTime.endHour)
            || (typeof offsettedEndHour !== 'undefined' && currentTime.hour + 24 >= targetTime.startHour && currentTime.hour <= targetTime.endHour)
            || (typeof offsettedEndHour !== 'undefined' && currentTime.hour >= targetTime.startHour && currentTime.hour <= offsettedEndHour)
    }

    private minutesOverlap(currentTime: DrCurrentTime, info: DrTargetTime): boolean {
        let isOverlapping = true;
        if (currentTime.hour == info.startHour && currentTime.minute < info.startMinute) {
            isOverlapping = false;
        }
        if (currentTime.hour == info.endHour && currentTime.minute >= info.endMinute) {
            isOverlapping = false
        }
        return isOverlapping;
    }


}