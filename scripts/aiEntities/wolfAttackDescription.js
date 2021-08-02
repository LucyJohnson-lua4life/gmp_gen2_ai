"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WolfAttackDescription = void 0;
const aiUtils_1 = require("../aiFunctions/aiUtils");
const commonActions_1 = require("../aiFunctions/commonActions");
class WolfAttackDescription {
    constructor(id) {
        this.entityId = id;
        this.lastAttackTime = 0;
    }
    describeAction(entityManager) {
        let enemyId = entityManager.getEnemyComponent(this.entityId).enemyId;
        if (this.enemyExists(enemyId)) {
            let range = aiUtils_1.getDistance(this.entityId, enemyId);
            let actionListSize = entityManager.getActionsComponent(this.entityId).nextActions.length;
            if (range < 800 && actionListSize < 5) {
                this.describeFightAction(entityManager, enemyId, range);
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
        /*
        let dangle = Math.abs(getPlayerAngle(this.entityId) - getAngleToTarget(this.entityId, enemyId))

        if(dangle > 180){
            dangle = Math.min(this.entityId, enemyId)
        }
        */
        let dangle = aiUtils_1.getPlayerAngle(this.entityId) - aiUtils_1.getAngleToTarget(this.entityId, enemyId);
        /*
        const currentTime = Date.now()
        console.log("current: " + currentTime)
        console.log("lastTime: " + this.lastAttackTime)
        */
        const currentTime = Date.now();
        console.log(dangle);
        if (dangle > -20 && dangle < 20 && currentTime - this.lastAttackTime > 3000) {
            //entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
            entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SFistAttackAction(this.entityId, enemyId, 150));
            this.lastAttackTime = currentTime;
            console.log("i got here");
        }
        else if (range < 100) {
            entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunParadeJump(this.entityId));
        }
        else {
            let random = Math.floor(Math.random() * 10);
            let pangle = aiUtils_1.getAngleToTarget(this.entityId, enemyId);
            if (random < 2) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunParadeJump(this.entityId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 500, Date.now()));
            }
            else if (random <= 3) {
                if (pangle > 180) {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeRight(this.entityId));
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 300, Date.now()));
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeRight(this.entityId));
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 300, Date.now()));
                }
                else {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeLeft(this.entityId));
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 300, Date.now()));
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeLeft(this.entityId));
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 300, Date.now()));
                }
            }
            else if (random <= 7 && dangle > -20 && dangle < 20) {
                if (aiUtils_1.getAngleToTarget(this.entityId, enemyId) > 180) {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeRight(this.entityId));
                }
                else {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.SRunStrafeLeft(this.entityId));
                }
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 400, Date.now()));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.RunForward(this.entityId));
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 200, Date.now()));
            }
            else {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new commonActions_1.WaitAction(this.entityId, 500, Date.now()));
            }
        }
    }
    /*
            if(random == 0){
                entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SFistAttackAction(this.entityId, enemyId, 400))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 800, Date.now()))
            }
            else if(random == 1){
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunParadeJump(this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 400, Date.now()))
            }

            else if (random == 2) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeLeft(this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 400, Date.now()))
            }

            else if (random == 3) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeRight(this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 400, Date.now()))
            }
            */
    enemyExists(id) {
        return id >= 0 && revmp.isPlayer(id);
    }
}
exports.WolfAttackDescription = WolfAttackDescription;
