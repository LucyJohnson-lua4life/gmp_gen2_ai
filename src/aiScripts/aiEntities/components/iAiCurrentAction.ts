import {IAiAction} from '../iAiAction';
/**
 * @interface IAiCurrentAction
 * Contains the current action that the entity should execute.
 * 
 * @field entityId: id of the entity for which the actions should be checked
 * @field nextAction: current action to execute by the entity
 */
export interface IAiCurrentAction{
    entityId: number,
    currentAction?: IAiAction,
}
