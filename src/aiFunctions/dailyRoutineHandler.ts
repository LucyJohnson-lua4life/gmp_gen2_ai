import { AIState } from "../aiStates/aiStates";


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
export interface DrTimeTriggerInfo{
    startHour:number,
    startMinute:number,
    endHour:number,
    endMinute:number,
    currentHour:number,
    currentMinute:number
}

/**
 * Handles all functionalities about daily routines of the monster ai.
 */
export class DailyRoutineHandler{
    private aiState:AIState;
    constructor(state:AIState){
        this.aiState = state;
    }

}