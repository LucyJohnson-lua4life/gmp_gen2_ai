import {IAiAction} from '../iAiAction';
/**
 * @interface IActionComponent
 * Contains the next action that the entity should execute.
 * 
 * @field entityId: id of the entity for which the actions should be checked
 * @field nextAction: next action to execute by the entity
 */
export interface IActionComponent{
    entityId: number,
    nextAction?: IAiAction,
}
