import {EntityManager} from '../../scripts/aiStates/entityManager';
import {IDrInfoComponent} from '../../scripts/aiEntities/components/iDrInfoComponent';
import {DailyRoutineSystem, DrTimeInfo} from '../../scripts/aiFunctions/dailyRoutineSystem';

test('hour & minute overlap trigger period first time ... SHOULD RETURN TRUE', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:13, currentMinute:40, startHour:12, startMinute:30, endHour:15, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(true);
})

test('hour doesnt overlap trigger period, but minute ... SHOULD RETURN false', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:11, currentMinute:40, startHour:12, startMinute:30, endHour:15, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('hour overlaps trigger period first time, but not minute ... SHOULD RETURN false', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:12, currentMinute:0, startHour:12, startMinute:30, endHour:15, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('hour & minute overlap trigger period but not for the first time ... SHOULD RETURN false', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 12, startMinute: 30, endHour: 15, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:12, currentMinute:40, startHour:12, startMinute:30, endHour:15, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('hour & minute overlap trigger period first time, while start hour > end hour of trigger period AND current time > start trigger period ... SHOULD RETURN true', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:23, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(true);
})

test('hour overlaps trigger period first time but not minute, while start hour > end hour of trigger period AND current time > start trigger period ... SHOULD RETURN false', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:23, currentMinute:20, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('minute overlaps trigger period first time but not hour, while start hour > end hour of trigger period AND current time > start trigger period ... SHOULD RETURN false', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:22, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})


test('hour & minute overlap trigger period NOT first time, while start hour > end hour of trigger period AND current time > start trigger period ... SHOULD RETURN false', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 23, startMinute: 30, endHour: 2, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:23, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})


test('hour & minute overlap trigger period first time, while start hour > end hour of trigger period AND current time < start trigger period ... SHOULD RETURN true', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:1, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(true);
})

test('hour & minute overlap trigger period NOT first time, while start hour > end hour of trigger period AND current time < start trigger period ... SHOULD RETURN false', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 23, startMinute: 30, endHour: 2, endMinute: 0, lastHour: 0, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:1, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('trigger period starts and ends from 0-24. 24h are over ... SHOULD RETURN true', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 24, endMinute: 0, lastHour: 23, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:0, currentMinute:0, startHour:0, startMinute:0, endHour:24, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(true);
})

test('trigger period starts and end at 0 o clock. 24h not over ... SHOULD RETURN false', () => {
    let botId = 1;
    let entityManager:EntityManager = new EntityManager();
    let routineInfoComponent:IDrInfoComponent = {entityId: botId, startHour: 0, startMinute: 0, endHour: 24, endMinute: 0, lastHour: 21, lastMinute: 0}
    entityManager.setDailyRoutineComponent(botId, routineInfoComponent)
    let drTimeInfo:DrTimeInfo = {currentHour:22, currentMinute:0, startHour:0, startMinute:0, endHour:24, endMinute:0};
    let handler:DailyRoutineSystem = new DailyRoutineSystem(entityManager);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})