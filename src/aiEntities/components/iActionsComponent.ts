import {IAiAction} from '../iAiAction';
/**
 * @interface IActionsComponent
 * Contains all the actions that the entity should execute.
 * 
 * @field entityId: id of the entity for which the actions should be checked
 * @field nextActions: actions to execute by the entity
 */
export interface IActionsComponent{
    entityId: number,
    nextActions: Array<IAiAction>,
}
