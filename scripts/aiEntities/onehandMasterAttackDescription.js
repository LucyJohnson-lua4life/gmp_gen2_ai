"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnehandMasterAttackDescription = void 0;
const aiUtils_1 = require("../aiFunctions/aiUtils");
const commonActions_1 = require("../aiFunctions/commonActions");
const npcActionUtils_1 = require("../aiFunctions/npcActionUtils");
class OnehandMasterAttackDescription {
    constructor(id) {
        this.entityId = id;
        this.lastAttackTime = 0;
        this.attackRange = 300;
    }
    describeAction(aiState) {
        if (revmp.valid(this.entityId)) {
            this.describeGeneralRoutine(aiState);
        }
    }
    describeGeneralRoutine(aiState) {
        let npcActionUtils = new npcActionUtils_1.NpcActionUtils(aiState);
        let entityManager = aiState.getEntityManager();
        let enemyId = entityManager.getEnemyComponent(this.entityId).enemyId;
        let actionListSize = entityManager.getActionsComponent(this.entityId).nextActions.length;
        if (this.enemyExists(enemyId)) {
            let range = aiUtils_1.getDistance(this.entityId, enemyId);
            if (range < 800 && actionListSize < 5) {
                this.describeFightAction(entityManager, enemyId, range);
            }
        }
        else if (actionListSize < 1) {
            //TODO: the world constant should only be fixed in later versions!
            let charId = npcActionUtils.getNearestCharacter(this.entityId, "NEWWORLD\\NEWWORLD.ZEN");
            let range = 99999999;
            //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
            if (charId !== this.entityId && charId !== -1 && revmp.isPlayer(charId)) {
                range = aiUtils_1.getDistance(this.entityId, charId);
            }
            if (range < 400) {
                let warnInput = { aiId: this.entityId, enemyId: charId, waitTime: 10000, startTime: Date.now(), warnDistance: 400, attackDistance: 0, entityManager: entityManager };
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WarnEnemy(warnInput));
            }
        }
    }
    describeFightAction(entityManager, enemyId, range) {
        if (range > 300) {
            entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.RunToTargetAction(this.entityId, enemyId, 300));
        }
        else {
            this.describeWhenInRange(entityManager, enemyId, range);
        }
        entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.TurnToTargetAction(this.entityId, enemyId));
    }
    describeWhenInRange(entityManager, enemyId, range) {
        let dangle = aiUtils_1.getPlayerAngle(this.entityId) - aiUtils_1.getAngleToTarget(this.entityId, enemyId);
        const currentTime = Date.now();
        //this.setWeaponMode(this.entityId)
        if (dangle > -20 && dangle < 20 && currentTime - this.lastAttackTime > 3000) {
            this.describeAttackAction(entityManager, enemyId, range);
            this.lastAttackTime = currentTime;
        }
        else if (range < this.attackRange - 150) {
            entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 400, Date.now()));
            entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunParadeJump(this.entityId));
        }
        else {
            let random = Math.floor(Math.random() * 10);
            let pangle = aiUtils_1.getAngleToTarget(this.entityId, enemyId);
            if (random < 2) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 500, Date.now()));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunParadeJump(this.entityId));
            }
            else if (random <= 3) {
                if (pangle > 180) {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 400, Date.now()));
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeRight(this.entityId));
                }
                else {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 400, Date.now()));
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeLeft(this.entityId));
                }
            }
            else if (random <= 5) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 300, Date.now()));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunParadeJump(this.entityId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 500, Date.now()));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunParadeJump(this.entityId));
            }
            else if (random <= 7 && dangle > -20 && dangle < 20) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 500, Date.now()));
                if (aiUtils_1.getAngleToTarget(this.entityId, enemyId) > 180) {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeRight(this.entityId));
                }
                else {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeLeft(this.entityId));
                }
            }
            else if (random <= 9 && dangle > -20 && dangle < 20) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 200, Date.now()));
                if (aiUtils_1.getAngleToTarget(this.entityId, enemyId) > 180) {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeRight(this.entityId));
                }
                else {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeLeft(this.entityId));
                }
            }
            else {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 500, Date.now()));
            }
        }
    }
    enemyExists(id) {
        return id >= 0 && revmp.valid(id) && revmp.isPlayer(id);
    }
    describeAttackAction(entityManager, enemyId, range) {
        entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 1000, Date.now()));
        entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SLeftAttackAction(this.entityId, enemyId, this.attackRange));
        entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 300, Date.now()));
        entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRightAttackAction(this.entityId, enemyId, this.attackRange));
        entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 300, Date.now()));
        entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SLeftAttackAction(this.entityId, enemyId, this.attackRange));
    }
}
exports.OnehandMasterAttackDescription = OnehandMasterAttackDescription;
