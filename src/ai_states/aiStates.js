"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIState = void 0;
var AIState = /** @class */ (function () {
    function AIState() {
        this.allPlayers = [];
        this.allBots = [];
    }
    /**
     * Puts bot in the bot map, using it's id as a key.
     * @param bot bot to put into the map.
     */
    AIState.prototype.putBot = function (bot) {
        this.allBots[bot.id] = bot;
    };
    return AIState;
}());
exports.AIState = AIState;
