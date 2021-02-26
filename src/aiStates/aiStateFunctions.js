"use strict";
exports.__esModule = true;
exports.SpawnNpc = void 0;
function SpawnNpc(state, npc, x, y, z) {
    state.registerPlayer(npc.id);
    revmp.setPosition(npc.id, { x: x, y: y, z: z });
}
exports.SpawnNpc = SpawnNpc;
