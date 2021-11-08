
/**
 * @interface IActionHistoryComponent 
 * Contains a mapping between a entity and it's history of executed actions. 
 * @field entityId: id of the entity for which the history is checked 
 * @field lastAttackTime: last time the entity executed an attack */
export interface IActionHistoryComponent {
    entityId: number,
    lastAttackTime?: number,
    lastRoamingTime?: number
}