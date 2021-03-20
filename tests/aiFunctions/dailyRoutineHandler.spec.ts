import Heap from 'heap-js';
import { IAiAction } from '../../scripts/aiEntities/iAiAction';
import { IAiNpc } from '../../scripts/aiEntities/iAiNpc';
import {AIState} from '../../scripts/aiStates/aiStates';
import {DrTimeTriggerInfo, DailyRoutineHandler} from '../../scripts/aiFunctions/dailyRoutineHandler';
import { DR_START_HOUR, DR_START_MINUTE, DR_END_HOUR, DR_END_MINUTE, DR_LAST_HOUR, DR_LAST_MINUTE } from '../../scripts/aiStates/aiFlags';

//TODO: this combinatorics of these test cases are still pretty complicated, think about ways to make it easier to understand them.
class TestAiNpc implements IAiNpc{
    id:number;
    isDead:boolean;
    isUnconscious:boolean;
    enemyIds: Array<number>;
    friendIds: Array<number>;
    respawnTime: number;
    nextActions: Heap<IAiAction>;
    aiFlags: Map<string, number|string>;
    constructor(id:number){
        this.id = id;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = []
        this.friendIds = [];
        this.respawnTime = 100;
        this.nextActions = new Heap();
        this.aiFlags = new Map();
    }

    executeNextAction():void{
        //nothing
    }

    onNpcHitted():void{
        //nothing
    }
}

function createTestNpc(id:number, drStartHour:number, drStartMinute:number, drEndHour:number, drEndMinute:number, drLastHour:number, drLastMinute:number):TestAiNpc{
    let npc = new TestAiNpc(id);
    npc.aiFlags.set(DR_START_HOUR, drStartHour)
    npc.aiFlags.set(DR_START_MINUTE, drStartMinute)
    npc.aiFlags.set(DR_END_HOUR, drEndHour)
    npc.aiFlags.set(DR_END_MINUTE, drEndMinute)
    npc.aiFlags.set(DR_LAST_HOUR, drLastHour)
    npc.aiFlags.set(DR_LAST_MINUTE, drLastMinute)
    return npc;
}

test('hour & minute overlap trigger period first time ... SHOULD RETURN TRUE', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,0,0,0,0);
    state.botMap.set(botId, testnpc)
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:13, currentMinute:40, startHour:12, startMinute:30, endHour:15, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(true);
})

test('hour doesnt overlap trigger period, but minute ... SHOULD RETURN false', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,0,0,0,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:11, currentMinute:40, startHour:12, startMinute:30, endHour:15, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('hour overlaps trigger period first time, but not minute ... SHOULD RETURN false', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,0,0,0,0);
    state.botMap.set(botId, testnpc)
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:12, currentMinute:0, startHour:12, startMinute:30, endHour:15, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('hour & minute overlap trigger period but not for the first time ... SHOULD RETURN false', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,12,30,15,0,0,0);
    state.botMap.set(botId, testnpc)
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:12, currentMinute:40, startHour:12, startMinute:30, endHour:15, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('hour & minute overlap trigger period first time, while start hour > end hour of trigger period AND current time > start trigger period ... SHOULD RETURN true', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,0,0,0,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:23, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(true);
})



test('hour overlaps trigger period first time but not minute, while start hour > end hour of trigger period AND current time > start trigger period ... SHOULD RETURN false', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,0,0,0,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:23, currentMinute:20, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('minute overlaps trigger period first time but not hour, while start hour > end hour of trigger period AND current time > start trigger period ... SHOULD RETURN false', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,0,0,0,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:22, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})


test('hour & minute overlap trigger period NOT first time, while start hour > end hour of trigger period AND current time > start trigger period ... SHOULD RETURN false', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,23,30,2,0,0,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:23, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})


test('hour & minute overlap trigger period first time, while start hour > end hour of trigger period AND current time < start trigger period ... SHOULD RETURN true', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,0,0,0,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:1, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(true);
})

test('hour & minute overlap trigger period NOT first time, while start hour > end hour of trigger period AND current time < start trigger period ... SHOULD RETURN false', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,23,30,2,0,0,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:1, currentMinute:40, startHour:23, startMinute:30, endHour:2, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})

test('trigger period starts and ends from 0-24. 24h are over ... SHOULD RETURN true', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,24,0,23,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:0, currentMinute:0, startHour:0, startMinute:0, endHour:24, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(true);
})

test('trigger period starts and end at 0 o clock. 24h not over ... SHOULD RETURN false', () => {
    let botId = 1;
    let state:AIState = new AIState();
    let testnpc:TestAiNpc = createTestNpc(botId,0,0,24,0,21,0);
    state.botMap.set(botId, testnpc);
    let drTimeInfo:DrTimeTriggerInfo = {currentHour:22, currentMinute:0, startHour:0, startMinute:0, endHour:24, endMinute:0};
    let handler:DailyRoutineHandler = new DailyRoutineHandler(state);
    expect(handler.newDrTimePeriodEntered(botId, drTimeInfo)).toBe(false);
})