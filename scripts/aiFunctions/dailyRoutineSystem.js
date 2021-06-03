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
    newDrTimePeriodEntered(playerid, currentTime, targetPeriod) {
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
                let dailyRoutineComponent = this.entityManager.getDailyRoutineComponent(playerid);
                dailyRoutineComponent.lastHour = currentTime.hour;
                dailyRoutineComponent.lastMinute = currentTime.minute;
                this.entityManager.setDailyRoutineComponent(playerid, dailyRoutineComponent);
                return false;
            }
        }
        return false;
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
