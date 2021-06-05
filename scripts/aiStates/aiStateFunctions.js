"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnNpc = void 0;
function SpawnNpc(entityManager, npc, x, y, z) {
    entityManager.registerBot(npc);
    revmp.setPosition(npc.id, { x: x, y: y, z: z });
}
exports.SpawnNpc = SpawnNpc;
