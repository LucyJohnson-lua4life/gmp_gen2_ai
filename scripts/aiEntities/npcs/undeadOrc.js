"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndeadOrc = void 0;
const TwohandMasterAttackDescription_1 = require("../TwohandMasterAttackDescription");
const npcInits_1 = require("./npcInits");
const weapons_1 = require("../../serverComponents/weapons");
class UndeadOrc {
    constructor() {
        this.id = revmp.createBot(npcInits_1.getUndeadOrcInstance());
        ;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.nextActions = new Array();
        this.actionDescriptions = [new TwohandMasterAttackDescription_1.TwohandMasterAttackDescription(this.id)];
        this.aiFlags = new Map();
        this.lastPosUpdate = 0;
        this.lastPosX = 0;
        this.lastPosY = 0;
        this.lastPosZ = 0;
        this.currentPosX = 0;
        this.currentPosY = 0;
        this.currentPosZ = 0;
        this.npcInstance = npcInits_1.INSTANCE_ORC_UNDEAD;
        revmp.addItem(this.id, weapons_1.Instances.eliteOrcSword, 1);
        revmp.equipItem(this.id, weapons_1.Instances.eliteOrcSword);
        revmp.setAttributes(this.id, { twoHanded: 100 });
    }
    addAction(action) {
        this.nextActions.push(action);
    }
}
exports.UndeadOrc = UndeadOrc;
