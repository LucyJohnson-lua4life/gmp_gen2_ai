"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIState = void 0;
const worldNames = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"];
class AIState {
    constructor() {
        this.allPlayers = [];
        this.allBots = [];
        this.allPositions = {};
        worldNames.forEach(name => this.allPositions[name] = {});
    }
    get botMap() {
        return this.allBots;
    }
    get positionMap() {
        return this.allPositions;
    }
    registerBot(bot) {
        this.allBots[bot.id] = bot;
    }
}
exports.AIState = AIState;
