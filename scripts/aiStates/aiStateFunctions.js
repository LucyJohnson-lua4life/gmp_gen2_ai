"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiStateFunctions = void 0;
class AiStateFunctions {
    constructor(aiState) {
        this.aiState = aiState;
    }
    spawnNpc(npc, x, y, z, world) {
        let entityManager = this.aiState.getEntityManager();
        this.aiState.registerBot(npc);
        revmp.setPosition(npc.id, [x, y, z]);
        let position = entityManager.getPositionsComponents(npc.id);
        position.currentPosX = x;
        position.currentPosY = y;
        position.currentPosZ = z;
        entityManager.setPositionsComponent(npc.id, position);
    }
}
exports.AiStateFunctions = AiStateFunctions;
