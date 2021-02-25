"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIState = void 0;
var AIState = /** @class */ (function () {
    function AIState() {
        this.allPlayers = [];
        this.allBots = [];
        this.allPositions = {};
    }
    Object.defineProperty(AIState.prototype, "botMap", {
        get: function () {
            return this.allBots;
        },
        enumerable: false,
        configurable: true
    });
    return AIState;
}());
exports.AIState = AIState;
