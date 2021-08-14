"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnNpc = void 0;
// TODO: world has to be handled.
function SpawnNpc(entityManager, npc, x, y, z) {
    entityManager.registerBot(npc);
    revmp.setPosition(npc.id, [x, y, z]);
    let position = entityManager.getPositionsComponents(npc.id);
    position.currentPosX = x;
    position.currentPosY = y;
    position.currentPosZ = z;
    entityManager.setPositionsComponent(npc.id, position);
}
exports.SpawnNpc = SpawnNpc;
