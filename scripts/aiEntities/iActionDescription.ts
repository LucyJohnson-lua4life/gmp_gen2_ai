import { EntityManager } from "../aiStates/entityManager";

export interface IActionDescription{
    entityId:number,
    describeAction(entityManager: EntityManager):void;
}
