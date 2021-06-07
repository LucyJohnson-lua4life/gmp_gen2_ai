"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcActionUtils = void 0;
/**
 * Provides utility functions for npc's to execute their actions.
 */
const AI_TARGET_DISTANCE = 2500;
class NpcActionUtils {
    constructor(em) {
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
    getNearbyNpcs(world, x, y, z) {
        let worldPositionMap = this.entityManager.positionMap.get(world);
        let deepCopyOfNearbyNpcs = [];
        if (typeof worldPositionMap !== 'undefined') {
            let nearbyNpcs = worldPositionMap.get(this.calculatePositionCheckSum(x, y, z));
            if (typeof nearbyNpcs !== 'undefined') {
                nearbyNpcs.forEach(id => deepCopyOfNearbyNpcs.push(id));
            }
        }
        return deepCopyOfNearbyNpcs;
    }
    calculatePositionCheckSum(x, y, z) {
        return Math.floor(x / AI_TARGET_DISTANCE) + 1000 * Math.floor(y / AI_TARGET_DISTANCE) + 1000 * Math.floor(z / AI_TARGET_DISTANCE) * 1000;
    }
}
exports.NpcActionUtils = NpcActionUtils;
