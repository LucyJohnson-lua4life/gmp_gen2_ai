"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
const worldNames = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"];
class EntityManager {
    constructor() {
        this.allPositions = new Map();
        worldNames.forEach(name => this.allPositions.set(name, new Map()));
        this.allPositions = new Map();
        this.dailyRoutineComponents = new Map();
        this.actionsComponents = new Map();
        this.positionsComponents = new Map();
        this.npcStateComponents = new Map();
        this.respawnComponents = new Map();
    }
    get positionMap() {
        return this.allPositions;
    }
    getDailyRoutineComponent(entityId) {
        return this.dailyRoutineComponents.get(entityId);
    }
    setDailyRoutineComponent(entityId, component) {
        this.dailyRoutineComponents.set(entityId, component);
    }
    getActionsComponent(entityId) {
        return this.actionsComponents.get(entityId);
    }
    setActionsComponent(entityId, component) {
        this.actionsComponents.set(entityId, component);
    }
    getPositionsComponents(entityId) {
        return this.positionsComponents.get(entityId);
    }
    setPositionsComponent(entityId, component) {
        this.positionsComponents.set(entityId, component);
    }
    getNpcStateComponent(entityId) {
        return this.npcStateComponents.get(entityId);
    }
    setNpcStateComponent(entityId, component) {
        this.npcStateComponents.set(entityId, component);
    }
    getRespawnComponent(entityId) {
        return this.respawnComponents.get(entityId);
    }
    setRespawnComponent(entityId, component) {
        this.respawnComponents.set(entityId, component);
    }
}
exports.EntityManager = EntityManager;
