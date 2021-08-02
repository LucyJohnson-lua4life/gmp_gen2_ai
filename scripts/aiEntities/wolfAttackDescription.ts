
import { IActionDescription } from './IActionDescription';
import { EntityManager } from '../aiStates/entityManager';
import { getAngleToTarget, getDistance, getPlayerAngle } from "../aiFunctions/aiUtils";
import { RunForward, SFistAttackAction, SRunParadeJump, SRunStrafeLeft, SRunStrafeRight, RunToTargetAction, WaitAction, TurnToTargetAction } from "../aiFunctions/commonActions";

export class WolfAttackDescription implements IActionDescription {
    entityId: number
    lastAttackTime: number

    constructor(id: number) {
        this.entityId = id
        this.lastAttackTime = 0
    }

    describeAction(entityManager: EntityManager): void {
        let enemyId = entityManager.getEnemyComponent(this.entityId).enemyId
        if (this.enemyExists(enemyId)) {
            let range = getDistance(this.entityId, enemyId)
            let actionListSize = entityManager.getActionsComponent(this.entityId).nextActions.length
            if (range < 800 && actionListSize < 5) {
                this.describeFightAction(entityManager, enemyId, range)
            }
        }
    }

    private describeFightAction(entityManager: EntityManager, enemyId: number, range: number): void {
        if (range > 300) {
            entityManager.getActionsComponent(this.entityId).nextActions.push(new RunToTargetAction(this.entityId, enemyId, 300))
        }
        else {
            this.describeWhenInRange(entityManager, enemyId, range)
        }
        entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
    }

    private describeWhenInRange(entityManager: EntityManager, enemyId: number, range: number): void {
        /*
        let dangle = Math.abs(getPlayerAngle(this.entityId) - getAngleToTarget(this.entityId, enemyId))

        if(dangle > 180){
            dangle = Math.min(this.entityId, enemyId)
        }
        */
        let dangle = getPlayerAngle(this.entityId) - getAngleToTarget(this.entityId, enemyId)
        /*
        const currentTime = Date.now()
        console.log("current: " + currentTime)
        console.log("lastTime: " + this.lastAttackTime)
        */
        const currentTime = Date.now()
        console.log(dangle)
        if (dangle > -20 && dangle < 20 && currentTime - this.lastAttackTime > 3000) {
            //entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
            entityManager.getActionsComponent(this.entityId).nextActions.push(new SFistAttackAction(this.entityId, enemyId, 150))
            this.lastAttackTime = currentTime
            console.log("i got here")
        }
        else if (range < 100) {
            entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunParadeJump(this.entityId))
        }
        else {
            let random = Math.floor(Math.random() * 10);
            let pangle = getAngleToTarget(this.entityId, enemyId)
            if (random < 2) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunParadeJump(this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
            }
            else if (random <= 3) {

                if (pangle > 180) {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeRight(this.entityId))
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 300, Date.now()))
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeRight(this.entityId))
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 300, Date.now()))
                }
                else {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeLeft(this.entityId))
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 300, Date.now()))
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeLeft(this.entityId))
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 300, Date.now()))
                }
            }
            else if (random <= 7 && dangle > -20 && dangle < 20) {
                if(getAngleToTarget(this.entityId, enemyId)> 180){
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else{
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeLeft(this.entityId))
                }
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 400, Date.now()))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new RunForward(this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 200, Date.now()))
            }
            else{
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
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

    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.isPlayer(id)
    }
}
