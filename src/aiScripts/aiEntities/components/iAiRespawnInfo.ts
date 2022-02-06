
/**
 * @interface IAiRespawnInfo
 * Contains respawn information about an entity.
 * 
 * @field entityId: id of the entity for which the resapwn information should be checked
 * @field respawnTime: time in seconds until the npc should be respawned when dead
 * @field deathTime: time of death in milliseconds of the npc using Date.now()
 */
export interface IAiRespawnInfo {
    entityId:number,
    respawnTime:number
    deathTime: number
}
