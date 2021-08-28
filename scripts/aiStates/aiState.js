"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiState = void 0;
const waynet_1 = require("../waynet/waynet");
const entityManager_1 = require("./entityManager");
const worldNames = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"];
/** Entry point to access the all ai related state.*/
class AiState {
    constructor(wpPath, fpPath) {
        this.entityManager = new entityManager_1.EntityManager();
        this.waynet = new waynet_1.Waynet(wpPath, fpPath);
        this.playerInPositionAreas = new Map();
        worldNames.forEach(name => this.playerInPositionAreas.set(name, new Map()));
        this.allBots = new Array();
        this.allPlayer = new Array();
    }
    getEntityManager() {
        return this.entityManager;
    }
    getWaynet() {
        return this.waynet;
    }
    getPlayerInPositionAreas() {
        return this.playerInPositionAreas;
    }
    getAllBots() {
        return this.allBots;
    }
    registerBot(npc) {
        this.allBots.push(npc.id);
        this.entityManager.registerBot(npc);
    }
    unregisterBot(npcId) {
        this.allBots = this.allBots.filter(id => id !== npcId);
        this.entityManager.unregisterBot(npcId);
    }
}
exports.AiState = AiState;
