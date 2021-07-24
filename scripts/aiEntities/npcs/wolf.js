"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wolf = void 0;
const heap_js_1 = require("heap-js");
const wolfAttackDescription_1 = require("../wolfAttackDescription");
const npcInits_1 = require("./npcInits");
class Wolf {
    constructor() {
        this.id = revmp.createBot(npcInits_1.getWolfInstance());
        ;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 240;
        this.nextActions = new heap_js_1.default((a, b) => a.priority - b.priority);
        this.actionDescriptions = [new wolfAttackDescription_1.WolfAttackDescription(this.id)];
        this.aiFlags = new Map();
        this.lastPosUpdate = 0;
        this.lastPosX = 0;
        this.lastPosY = 0;
        this.lastPosZ = 0;
        this.currentPosX = 0;
        this.currentPosY = 0;
        this.currentPosZ = 0;
    }
    addAction(action) {
        this.nextActions.push(action);
    }
}
exports.Wolf = Wolf;
