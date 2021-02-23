"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiUpdateLoop = void 0;
var AiUpdateLoop = /** @class */ (function () {
    function AiUpdateLoop(state) {
        this._state = state;
    }
    Object.defineProperty(AiUpdateLoop.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    AiUpdateLoop.prototype.updateAi = function (aiId) {
        var npc = this._state.allBots[aiId];
        if (typeof npc !== 'undefined') {
            npc.executeNextAction();
        }
    };
    return AiUpdateLoop;
}());
exports.AiUpdateLoop = AiUpdateLoop;
