import { EntityManager } from "../aiStates/entityManager";


/**
 * Represents 'DNA' of an npc. It describes which action a npc should put into it's action collection based on the current npc state and the state of the environment. E.g the description will define that, when an enemy is nearby a 'attack action' should be put into the action collection of the npc.
 * @interface IActionDescription
 * @field entityId: id of the npc for which a description should be defined
 */
export interface IActionDescription{
    entityId:number,
    /**
     * Adds new actions into the npc action list based on the npc state and environment.
     * @param entityManager represents the state of all npc on the server.
     */
    describeAction(entityManager: EntityManager):void;
}
