import { AIState } from "../aiStates/aiStates";


/**
 * @interface DRTimeInfo
 * Encapsulates the current time and a time period in minutes and hours. This 
 * structure is used to compare the current time with the time period to decide,
 * if a new DailyRoutine should be triggered. 
 * 
 * @field startHour: start hour of the period
 * @field startMinute: start minute of the period
 * @field endHour: end hour of the period
 * @field endMinute: end minute of the period
 * @field currentHour: current hour
 * @field currentMinute: current minute
 */
interface DRTimeInfo{
    startHour:number,
    startMinute:number,
    endHour:number,
    endMinute:number,
    currentHour:number,
    currentMinute:number
}

class DalyRoutineHandler{
    private aiState:AIState;
    constructor(state:AIState){
        this.aiState = state;
    }

}