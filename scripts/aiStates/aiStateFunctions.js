"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiStateFunctions = void 0;
class AiStateFunctions {
    constructor(aiState) {
        this.aiState = aiState;
    }
    spawnNpcByCoordinates(npc, x, y, z, world) {
        let entityManager = this.aiState.getEntityManager();
        this.aiState.registerBot(npc);
        revmp.setPosition(npc.id, [x, y, z]);
        let position = entityManager.getPositionsComponents(npc.id);
        position.currentPosX = x;
        position.currentPosY = y;
        position.currentPosZ = z;
        entityManager.setPositionsComponent(npc.id, position);
    }
    spawnNpc(npc, pointName, world) {
        let entityManager = this.aiState.getEntityManager();
        let npcPosition = this.getCoordinatesForPointName(pointName);
        this.aiState.registerBot(npc);
        revmp.setPosition(npc.id, [npcPosition[0], npcPosition[1], npcPosition[2]]);
        let position = entityManager.getPositionsComponents(npc.id);
        position.currentPosX = npcPosition[0];
        position.currentPosY = npcPosition[1];
        position.currentPosZ = npcPosition[2];
        entityManager.setPositionsComponent(npc.id, position);
    }
    getCoordinatesForPointName(pointName) {
        let waynet = this.aiState.getWaynet();
        let foundFreepoint = waynet.freepoints.find(x => x.fpName === pointName);
        if (typeof foundFreepoint !== 'undefined') {
            return [foundFreepoint.x, foundFreepoint.y, foundFreepoint.z];
        }
        let foundWaypoint = Array.from(waynet.waypoints.values()).find(wp => wp.wpName === pointName);
        if (typeof foundWaypoint !== 'undefined') {
            return [foundWaypoint.x, foundWaypoint.y, foundWaypoint.z];
        }
        console.log("Error: for the given point no coordinates where found! Default coordinates will be provided");
        return [0, 0, 0];
    }
}
exports.AiStateFunctions = AiStateFunctions;
