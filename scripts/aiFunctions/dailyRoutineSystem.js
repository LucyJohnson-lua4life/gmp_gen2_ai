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
    /**
     * Returns if the current time overlaps the target time for the first time, in which case a new daily routine should be triggered.
     * @param playerid name of the entity for which the daily routine is checked
     * @param currentTime the current time
     * @param targetTime the time on which a new daily routine should be triggered.
     * @returns true if a new daily routine should be triggered, otherwise false
     */
    shouldTriggerDailyRoutine(playerid, currentTime, targetTime) {
        let result = false;
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
    updateEntityLastHourAndMinute(playerid, currentTime) {
        let dailyRoutineComponent = this.entityManager.getDailyRoutineComponent(playerid);
        dailyRoutineComponent.lastHour = currentTime.hour;
        dailyRoutineComponent.lastMinute = currentTime.minute;
        this.entityManager.setDailyRoutineComponent(playerid, dailyRoutineComponent);
    }
    updateEntityDrInfo(playerid, targetTime, currentTime) {
        this.entityManager.setDailyRoutineComponent(playerid, {
            entityId: playerid,
            startHour: targetTime.startHour,
            startMinute: targetTime.startMinute,
            endHour: targetTime.endHour,
            endMinute: targetTime.endMinute,
            lastHour: currentTime.hour,
            lastMinute: currentTime.minute
        });
    }
    isFirstOverlapWithTargetTime(playerid, currentTime, targetTime) {
        let lastTime = this.entityManager.getDailyRoutineComponent(playerid);
        return (typeof lastTime.startHour === 'undefined')
            || ((lastTime.startHour !== targetTime.startHour || lastTime.startMinute !== targetTime.startMinute)
                || (lastTime.endHour !== targetTime.endHour || lastTime.endMinute !== targetTime.endMinute))
            || (targetTime.startHour === 0 && targetTime.startMinute === 0 && targetTime.endHour === 24 && targetTime.endMinute === 0 && lastTime.lastHour === 23 && currentTime.hour === 0);
    }
    hoursOverlap(currentTime, targetTime) {
        let offsettedEndHour;
        if (targetTime.startHour > targetTime.endHour) {
            offsettedEndHour = targetTime.endHour + 24;
        }
        return (currentTime.hour >= targetTime.startHour && currentTime.hour <= targetTime.endHour)
            || (typeof offsettedEndHour !== 'undefined' && currentTime.hour + 24 >= targetTime.startHour && currentTime.hour <= targetTime.endHour)
            || (typeof offsettedEndHour !== 'undefined' && currentTime.hour >= targetTime.startHour && currentTime.hour <= offsettedEndHour);
    }
    minutesOverlap(currentTime, info) {
        let isOverlapping = true;
        if (currentTime.hour == info.startHour && currentTime.minute < info.startMinute) {
            isOverlapping = false;
        }
        if (currentTime.hour == info.endHour && currentTime.minute >= info.endMinute) {
            isOverlapping = false;
        }
        return isOverlapping;
    }
}
exports.DailyRoutineSystem = DailyRoutineSystem;
