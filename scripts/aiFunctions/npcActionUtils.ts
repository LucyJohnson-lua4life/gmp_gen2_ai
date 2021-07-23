import { EntityManager } from "../aiStates/entityManager";


/**
 * Provides utility functions for npc's to execute their actions.
 */
const AI_TARGET_DISTANCE: number = 2500;
export class NpcActionUtils {

    private entityManager: EntityManager;

    constructor(em: EntityManager) {
        this.entityManager = em;
    }

    /**
     * Returns all npc id's that are in the same 2500x2500x2500 distance sector of the given point.
     * 
     * E.g 
     * 3500x3100x4000 are in the same sector as 4999x4999x4999
     * 5000x3100x4000 are NOT in the same sector as 4999x4999x4999
     * 
     * @param world 
     * @param x the x value of the point, for which nearby npc ids should be found
     * @param y the y value of the point, for which nearby npc ids should be found
     * @param z the z value of the point, for which nearby npc ids should be found
     */
    public getNearbyNpcs(world: string, x: number, y: number, z: number): Array<number> {
        let worldPositionMap = this.entityManager.positionMap.get(world);
        let deepCopyOfNearbyNpcs: Array<number> = []
        if (typeof worldPositionMap !== 'undefined') {
            let nearbyNpcs = worldPositionMap.get(this.calculatePositionCheckSum(x, y, z));
            if (typeof nearbyNpcs !== 'undefined') {
                nearbyNpcs.forEach(id => deepCopyOfNearbyNpcs.push(id))
            }
        }
        return deepCopyOfNearbyNpcs;
    }



    private calculatePositionCheckSum(x: number, y: number, z: number): number {
        return Math.floor(x / AI_TARGET_DISTANCE) + 1000 * Math.floor(y / AI_TARGET_DISTANCE) + 1000 * Math.floor(z / AI_TARGET_DISTANCE) * 1000
    }

}
