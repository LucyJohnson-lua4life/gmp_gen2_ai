
/**
 * @interface IAiNpcStatus
 * Contains general state information about an npc.
 * 
 * @field entityId: id of the entity for which the general state should be checked
 * @field isDead: returns true if npc is dead
 * @field isUnconscious: returns true if npc is isUnconscious
 */
export interface IAiNpcStatus {
    entityId:number,
    isDead:boolean,
    isUnconscious:boolean,
    npcInstance:string
}
