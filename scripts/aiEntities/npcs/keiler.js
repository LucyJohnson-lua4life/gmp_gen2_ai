"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keiler = void 0;
const defaultMonsterAttackDescription_1 = require("../defaultMonsterAttackDescription");
const npcInits_1 = require("./npcInits");
class Keiler {
    constructor() {
        this.id = revmp.createBot(npcInits_1.getKeilerInstance());
        ;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.nextActions = new Array();
        this.actionDescriptions = [new defaultMonsterAttackDescription_1.DefaultMonsterAttackDescription(this.id)];
        this.aiFlags = new Map();
        this.lastPosUpdate = 0;
        this.lastPosX = 0;
        this.lastPosY = 0;
        this.lastPosZ = 0;
        this.currentPosX = 0;
        this.currentPosY = 0;
        this.currentPosZ = 0;
        this.npcInstance = npcInits_1.INSTANCE_KEILER;
    }
    addAction(action) {
        this.nextActions.push(action);
    }
}
exports.Keiler = Keiler;
