"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIState = void 0;
const worldNames = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"];
class AIState {
    constructor() {
        this.allPlayers = new Map();
        this.allBots = new Map();
        this.allPositions = new Map();
        worldNames.forEach(name => this.allPositions.set(name, new Map()));
    }
    get botMap() {
        return this.allBots;
    }
    get positionMap() {
        return this.allPositions;
    }
    registerBot(bot) {
        this.allBots.set(bot.id, bot);
    }
}
exports.AIState = AIState;
