"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIState = void 0;
var AIState = /** @class */ (function () {
    function AIState() {
        this.allPlayers = [];
        this.allBots = [];
    }
    AIState.prototype.addBot = function (bot) {
        this.allBots.push(bot);
    };
    return AIState;
}());
exports.AIState = AIState;
