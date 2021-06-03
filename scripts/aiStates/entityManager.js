"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
const worldNames = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"];
class EntityManager {
    constructor() {
        this.allPositions = new Map();
        worldNames.forEach(name => this.allPositions.set(name, new Map()));
    }
    get positionMap() {
        return this.allPositions;
    }
    getDailyRoutineComponent(entityId) {
        return this.dailyRoutineComponents.get(entityId);
    }
    getActionsComponent(entityId) {
        return this.actionsComponents.get(entityId);
    }
    getPositionsComponents(entityId) {
        return this.positionsComponents.get(entityId);
    }
    getNpcStateComponent(entityId) {
        return this.npcStateComponents.get(entityId);
    }
    getRespawnComponent(entityId) {
        return this.respawnComponents.get(entityId);
    }
}
exports.EntityManager = EntityManager;
