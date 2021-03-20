"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wolf = void 0;
const heap_js_1 = require("heap-js");
const npcInits_1 = require("./npcInits");
class Wolf {
    constructor() {
        this.id = revmp.createBot(npcInits_1.INSTANCE_WOLF);
        ;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 240;
        this.nextActions = new heap_js_1.default((a, b) => a.priority - b.priority);
        this.aiFlags = new Map();
    }
    executeNextAction() {
        console.log("Nothing implemented yet.");
    }
    onNpcHitted(aiNpcId, attackerId) {
        console.log("Nothing implemented yet.");
    }
}
exports.Wolf = Wolf;
