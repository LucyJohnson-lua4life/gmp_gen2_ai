import { info } from "console";
import { NodeFlags } from "typescript";
import { AIState } from "../aiStates/aiStates";
import { StringKeyMap } from "../utils/mapStructs";
import { DR_START_HOUR, DR_START_MINUTE, DR_END_HOUR, DR_END_MINUTE, DR_LAST_HOUR, DR_LAST_MINUTE } from '../aiStates/aiFlags';

/**
 * @interface DRTimeInfo
 * Encapsulates the current time and a time period in minutes and hours. This 
 * structure is used to compare the current time with the time period to decide,
 * if a new DailyRoutine should be triggered. 
 * 
 * @field startHour: start hour of the period - on which the new daily routine should be triggered
 * @field startMinute: start minute of the period - on which the new daily routine should be triggered
 * @field endHour: end hour of the period - on which the new daily routine should be triggered
 * @field endMinute: end minute of the period - on which the new daily routine should be triggered
 * @field currentHour: current hour - on which the new daily routine should be triggered
 * @field currentMinute: current minute - on which the new daily routine should be triggered
 */
export interface DrTimeTriggerInfo {
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
export class DailyRoutineHandler {
    private aiState: AIState;
    constructor(state: AIState) {
        this.aiState = state;
    }

    public newDrTimePeriodEntered(playerid: number, info: DrTimeTriggerInfo): boolean {
        if (this.currentHourOverlapsWithTriggerPeriod(info)) {
            if (!this.currentMinuteOverlapsWithTriggerPeriod(info)) {
                return false;
            }

            if (this.playerOverlapsWithTriggerPeriodFirstTime(playerid, info)) {
                this.aiState.allBots[playerid].aiFlags[DR_START_HOUR] = info.startHour
                this.aiState.allBots[playerid].aiFlags[DR_START_MINUTE] = info.startMinute
                this.aiState.allBots[playerid].aiFlags[DR_END_HOUR] = info.endHour
                this.aiState.allBots[playerid].aiFlags[DR_END_MINUTE] = info.endMinute
                this.aiState.allBots[playerid].aiFlags[DR_LAST_HOUR] = info.currentHour
                this.aiState.allBots[playerid].aiFlags[DR_LAST_MINUTE] = info.currentMinute
                return true;
            }
            else {
                this.aiState.allBots[playerid].aiFlags[DR_LAST_HOUR] = info.currentHour
                this.aiState.allBots[playerid].aiFlags[DR_LAST_MINUTE] = info.currentMinute
                return false;
            }

        }
        return false;
    }

    private playerOverlapsWithTriggerPeriodFirstTime(playerid: number, info: DrTimeTriggerInfo) {
        let aiFlags: StringKeyMap<number | string> = this.aiState.allBots[playerid].aiFlags;
        return (typeof aiFlags[DR_START_HOUR] === 'undefined')
            || ((aiFlags[DR_START_HOUR] !== info.startHour || aiFlags[DR_START_MINUTE] !== info.startMinute)
                || (aiFlags[DR_END_HOUR] !== info.endHour || aiFlags[DR_END_MINUTE] !== info.endMinute))
            || (info.startHour === 0 && info.startMinute === 0 && info.endHour === 24 && info.endMinute === 0 && aiFlags[DR_LAST_HOUR] === 23 && info.currentHour === 0)
    }

    private currentHourOverlapsWithTriggerPeriod(info: DrTimeTriggerInfo): boolean {
        let offsettedEndHour: number | undefined;

        if (info.startHour > info.endHour) {
            offsettedEndHour = info.endHour + 24
        }
        return (info.currentHour >= info.startHour && info.currentHour <= info.endHour)
            || (typeof offsettedEndHour !== 'undefined' && info.currentHour + 24 >= info.startHour && info.currentHour <= info.endHour)
            || (typeof offsettedEndHour !== 'undefined' && info.currentHour >= info.startHour && info.currentHour <= offsettedEndHour)
    }

    private currentMinuteOverlapsWithTriggerPeriod(info: DrTimeTriggerInfo): boolean {
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