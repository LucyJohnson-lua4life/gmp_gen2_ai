
/**
 * @interface IEnemyComponent
 * Contains a mapping between a entity and it's current enemy entity. 
 * @field entityId: id of the entity for which the enemy is checked 
 * @field enemyId: id of the enemy */
export interface IEnemyComponent {
    entityId: number,
    enemyId: number
}
