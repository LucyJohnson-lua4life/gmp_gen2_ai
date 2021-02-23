"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIState = void 0;
var AIState = /** @class */ (function () {
    function AIState() {
        this._allPlayers = [];
        this._allBots = [];
    }
    Object.defineProperty(AIState.prototype, "allBots", {
        get: function () {
            return this._allBots;
        },
        enumerable: false,
        configurable: true
    });
    return AIState;
}());
exports.AIState = AIState;
