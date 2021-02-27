"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyRoutineHandler = void 0;
const aiFlags_1 = require("../aiStates/aiFlags");
/**
 * Handles all functionalities about daily routines of the monster ai.
 */
class DailyRoutineHandler {
    constructor(state) {
        this.aiState = state;
    }
    newDrTimePeriodEntered(playerid, info) {
        if (this.currentHourOverlapsWithTriggerPeriod(info)) {
            if (!this.currentMinuteOverlapsWithTriggerPeriod(info)) {
                return false;
            }
            if (this.playerOverlapsWithTriggerPeriodFirstTime(playerid, info)) {
                this.aiState.botMap[playerid].aiFlags[aiFlags_1.DR_START_HOUR] = info.startHour;
                this.aiState.botMap[playerid].aiFlags[aiFlags_1.DR_START_MINUTE] = info.startMinute;
                this.aiState.botMap[playerid].aiFlags[aiFlags_1.DR_END_HOUR] = info.endHour;
                this.aiState.botMap[playerid].aiFlags[aiFlags_1.DR_END_MINUTE] = info.endMinute;
                this.aiState.botMap[playerid].aiFlags[aiFlags_1.DR_LAST_HOUR] = info.currentHour;
                this.aiState.botMap[playerid].aiFlags[aiFlags_1.DR_LAST_MINUTE] = info.currentMinute;
                return true;
            }
            else {
                this.aiState.botMap[playerid].aiFlags[aiFlags_1.DR_LAST_HOUR] = info.currentHour;
                this.aiState.botMap[playerid].aiFlags[aiFlags_1.DR_LAST_MINUTE] = info.currentMinute;
                return false;
            }
        }
        return false;
    }
    playerOverlapsWithTriggerPeriodFirstTime(playerid, info) {
        let aiFlags = this.aiState.botMap[playerid].aiFlags;
        return (typeof aiFlags[aiFlags_1.DR_START_HOUR] === 'undefined')
            || ((aiFlags[aiFlags_1.DR_START_HOUR] !== info.startHour || aiFlags[aiFlags_1.DR_START_MINUTE] !== info.startMinute)
                || (aiFlags[aiFlags_1.DR_END_HOUR] !== info.endHour || aiFlags[aiFlags_1.DR_END_MINUTE] !== info.endMinute))
            || (info.startHour === 0 && info.startMinute === 0 && info.endHour === 24 && info.endMinute === 0 && aiFlags[aiFlags_1.DR_LAST_HOUR] === 23 && info.currentHour === 0);
    }
    currentHourOverlapsWithTriggerPeriod(info) {
        let offsettedEndHour;
        if (info.startHour > info.endHour) {
            offsettedEndHour = info.endHour + 24;
        }
        return (info.currentHour >= info.startHour && info.currentHour <= info.endHour)
            || (typeof offsettedEndHour !== 'undefined' && info.currentHour + 24 >= info.startHour && info.currentHour <= info.endHour)
            || (typeof offsettedEndHour !== 'undefined' && info.currentHour >= info.startHour && info.currentHour <= offsettedEndHour);
    }
    currentMinuteOverlapsWithTriggerPeriod(info) {
        let isOverlapping = true;
        if (info.currentHour == info.startHour && info.currentMinute < info.startMinute) {
            isOverlapping = false;
        }
        if (info.currentHour == info.endHour && info.currentMinute >= info.endMinute) {
            isOverlapping = false;
        }
        return isOverlapping;
    }
}
exports.DailyRoutineHandler = DailyRoutineHandler;
