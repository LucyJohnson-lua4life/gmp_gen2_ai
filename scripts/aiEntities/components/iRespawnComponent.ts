
/**
 * @interface IResoawnComponent
 * Contains respawn information about an entity.
 * 
 * @field entityId: id of the entity for which the resapwn information should be checked
 * @field respawnTime: time until the npc should be respawned when dead
 */
export interface IRespawnComponent {
    entityId:number,
    respawnTime:number
}