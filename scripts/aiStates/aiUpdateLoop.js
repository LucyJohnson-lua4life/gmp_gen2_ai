"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiUpdateLoop = void 0;
class AiUpdateLoop {
    constructor(state) {
        this._state = state;
    }
    get state() {
        return this._state;
    }
    updateAll() {
        Array.from(this._state.botMap.keys()).forEach((aiId) => this.updateAi(aiId));
    }
    updateAi(aiId) {
        let npc = this._state.botMap.get(aiId);
        if (typeof npc !== 'undefined') {
            npc.executeNextAction();
        }
    }
}
exports.AiUpdateLoop = AiUpdateLoop;