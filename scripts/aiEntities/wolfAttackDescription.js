"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WolfAttackDescription = void 0;
const aiUtils_1 = require("../aiFunctions/aiUtils");
const commonActions_1 = require("../aiFunctions/commonActions");
class WolfAttackDescription {
    constructor(id) {
        this.entityId = id;
    }
    describeAction(entityManager) {
        let enemyId = entityManager.getEnemyComponent(this.entityId).enemyId;
        if (this.enemyExists(enemyId)) {
            let range = aiUtils_1.getDistance(this.entityId, enemyId);
            if (range < 800) {
                this.describeFightAction(entityManager, enemyId, range);
            }
        }
    }
    describeFightAction(entityManager, enemyId, range) {
        if (range > 300) {
            entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.RunToTargetAction(5, this.entityId, enemyId, 300));
        }
        else {
            let random = Math.floor(Math.random() * 4);
            if (random == 0) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.TurnToTargetAction(2, this.entityId, enemyId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SFistAttackAction(2, this.entityId, enemyId, 400));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(2, this.entityId, 800, new Date().getMilliseconds()));
            }
            else if (random == 1) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunParadeJump(2, this.entityId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.TurnToTargetAction(2, this.entityId, enemyId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(2, this.entityId, 400, new Date().getMilliseconds()));
            }
            else if (random == 2) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeLeft(2, this.entityId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.TurnToTargetAction(2, this.entityId, enemyId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(2, this.entityId, 400, new Date().getMilliseconds()));
            }
            else if (random == 3) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeRight(2, this.entityId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.TurnToTargetAction(2, this.entityId, enemyId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(2, this.entityId, 400, new Date().getMilliseconds()));
            }
        }
    }
    enemyExists(id) {
        return id >= 0 && revmp.isPlayer(id);
    }
}
exports.WolfAttackDescription = WolfAttackDescription;
