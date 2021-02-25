"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpcActionUtils = void 0;
/**
 * Provides utility functions for npc's to execute their actions.
 */
var AI_TARGET_DISTANCE = 2500;
var NpcActionUtils = /** @class */ (function () {
    function NpcActionUtils(s) {
        this.state = s;
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
    NpcActionUtils.prototype.getNearbyNpcs = function (world, x, y, z) {
        var worldPositionMap = this.state.positionMap[world];
        var deepCopyOfNearbyNpcs = [];
        if (typeof worldPositionMap !== 'undefined') {
            var nearbyNpcs = worldPositionMap[this.calculatePositionCheckSum(x, y, z)];
            if (typeof nearbyNpcs !== 'undefined') {
                nearbyNpcs.forEach(function (id) { return deepCopyOfNearbyNpcs.push(id); });
            }
        }
        return deepCopyOfNearbyNpcs;
    };
    NpcActionUtils.prototype.calculatePositionCheckSum = function (x, y, z) {
        return Math.floor(x / AI_TARGET_DISTANCE) + 1000 * Math.floor(y / AI_TARGET_DISTANCE) + 1000 * Math.floor(z / AI_TARGET_DISTANCE) * 1000;
    };
    return NpcActionUtils;
}());
exports.NpcActionUtils = NpcActionUtils;
