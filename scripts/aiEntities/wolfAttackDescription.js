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
    }
    enemyExists(id) {
        return id >= 0 && revmp.isPlayer(id);
    }
}
exports.WolfAttackDescription = WolfAttackDescription;
