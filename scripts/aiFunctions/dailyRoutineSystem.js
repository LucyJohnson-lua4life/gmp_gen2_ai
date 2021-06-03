"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyRoutineSystem = void 0;
/**
 * Handles all functionalities about daily routines of the monster ai.
 */
class DailyRoutineSystem {
    constructor(state) {
        this.entityManager = state;
    }
    newDrTimePeriodEntered(playerid, info) {
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
                let dailyRoutineComponent = this.entityManager.getDailyRoutineComponent(playerid);
                dailyRoutineComponent.lastHour = info.currentHour;
                dailyRoutineComponent.lastMinute = info.currentMinute;
                this.entityManager.setDailyRoutineComponent(playerid, dailyRoutineComponent);
                return false;
            }
        }
        return false;
    }
    playerOverlapsWithTriggerPeriodFirstTime(playerid, info) {
        let dailyRoutineComponent = this.entityManager.getDailyRoutineComponent(playerid);
        return (typeof dailyRoutineComponent.startHour === 'undefined')
            || ((dailyRoutineComponent.startHour !== info.startHour || dailyRoutineComponent.startMinute !== info.startMinute)
                || (dailyRoutineComponent.endHour !== info.endHour || dailyRoutineComponent.endMinute !== info.endMinute))
            || (info.startHour === 0 && info.startMinute === 0 && info.endHour === 24 && info.endMinute === 0 && dailyRoutineComponent.lastHour === 23 && info.currentHour === 0);
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
exports.DailyRoutineSystem = DailyRoutineSystem;
