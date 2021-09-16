

import {IActionDescription} from '../iActionDescription';
/**
 * @interface IActionDescriptionComponent 
 * Contains all the action descriptions of an entity.
 * 
 * @field entityId: id of the entity for which the action descriptions should be read 
 * @field descriptions: all descriptions of the entity 
 */
export interface IActionDescriptionComponent{
    entityId: number,
    descriptions: Array<IActionDescription>;
}
