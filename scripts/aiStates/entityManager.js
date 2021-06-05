"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
const worldNames = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"];
/**
 * Central class that contains all lookups between the entity id and it's components.
 * TODO: document the different components and the interface.
 */
class EntityManager {
    constructor() {
        this.allPositions = new Map();
        worldNames.forEach(name => this.allPositions.set(name, new Map()));
        this.allBots = new Array();
        this.allPlayer = new Array();
        this.dailyRoutineComponents = new Map();
        this.actionsComponents = new Map();
        this.positionsComponents = new Map();
        this.npcStateComponents = new Map();
        this.respawnComponents = new Map();
    }
    get positionMap() {
        return this.allPositions;
    }
    get getAllBots() {
        return this.allBots;
    }
    //todo: add more functionality once revmp functions are available
    registerBot(npc) {
        this.allBots.push(npc.id);
        let stateInfo = { entityId: npc.id, isDead: false, isUnconscious: false };
        let respawnInfo = { entityId: npc.id, respawnTime: npc.respawnTime };
        let actionInfo = { entityId: npc.id, nextActions: npc.nextActions };
        this.setNpcStateComponent(npc.id, stateInfo);
        this.setRespawnComponent(npc.id, respawnInfo);
        this.setActionsComponent(npc.id, actionInfo);
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
