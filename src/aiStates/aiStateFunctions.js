"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnNpc = void 0;
function SpawnNpc(state, npc, x, y, z) {
    state.registerBot(npc);
    revmp.setPosition(npc.id, { x: x, y: y, z: z });
}
exports.SpawnNpc = SpawnNpc;
