
import { IActionDescription } from './IActionDescription';
import { EntityManager } from '../aiStates/entityManager';
import { getAngleToTarget, getDistance, getPlayerAngle } from "../aiFunctions/aiUtils";
import { PlayAnimationForDuration, RunForward, SForwardAttackAction,
         SRunParadeJump, SRunStrafeLeft, SRunStrafeRight,
         RunToTargetAction, WaitAction, TurnToTargetAction,
         WarnEnemy, WarnEnemyActionInput} from "../aiFunctions/commonActions";
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';
import { AiState } from '../aiStates/aiState';

export class DefaultMonsterAttackDescription implements IActionDescription {
    entityId: number
    lastAttackTime: number
    attackRange: number

    constructor(id: number) {
        this.entityId = id
        this.lastAttackTime = 0
        this.attackRange = 300
    }

    describeAction(aiState: AiState): void {
        if(revmp.valid(this.entityId)){
            this.describeGeneralRoutine(aiState)
        }
    }

    private describeGeneralRoutine(aiState: AiState): void{
        let npcActionUtils = new NpcActionUtils(aiState)
        let entityManager = aiState.getEntityManager()

        let enemyId = entityManager.getEnemyComponent(this.entityId).enemyId


        let actionListSize = entityManager.getActionsComponent(this.entityId).nextActions.length
        if (this.enemyExists(enemyId)) {
            let range = getDistance(this.entityId, enemyId)
            if (range < 800 && actionListSize < 5) {
                this.describeFightAction(entityManager, enemyId, range)
            }
        }
        else if(actionListSize < 1){
            //TODO: the world constant should only be fixed in later versions!
            let charId = npcActionUtils.getNearestCharacter(this.entityId, "NEWWORLD\\NEWWORLD.ZEN")
            let range = 99999999
            //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
            if (charId !== this.entityId && charId !== -1 && revmp.isPlayer(charId)){
                range = getDistance(this.entityId, charId)
            }
            if (range < 400){
                let warnInput:WarnEnemyActionInput = {aiId: this.entityId, enemyId: charId, waitTime: 10000, startTime: Date.now(), warnDistance: 400, attackDistance: 0, entityManager: entityManager}
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WarnEnemy(warnInput))
            }
            else {
                this.describeEatRoutine(entityManager)
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
        let dangle = getPlayerAngle(this.entityId) - getAngleToTarget(this.entityId, enemyId)
        const currentTime = Date.now()
        if (dangle > -20 && dangle < 20 && currentTime - this.lastAttackTime > 3000) {
            entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
            entityManager.getActionsComponent(this.entityId).nextActions.push(new SForwardAttackAction(this.entityId, enemyId, this.attackRange))
            this.lastAttackTime = currentTime
        }
        else if (range < this.attackRange - 150) {
            entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 400, Date.now()))
            entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunParadeJump(this.entityId))
        }
        else {
            let random = Math.floor(Math.random() * 10);
            let pangle = getAngleToTarget(this.entityId, enemyId)
            if (random < 2) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 3) {
                if (pangle > 180) {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else if (random <= 4) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 300, Date.now()))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunParadeJump(this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 7 && dangle > -20 && dangle < 20) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                if (getAngleToTarget(this.entityId, enemyId) > 180) {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else if (random <= 9 && dangle > -20 && dangle < 20) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 200, Date.now()))
                if(getAngleToTarget(this.entityId, enemyId)> 180){
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else{
                    entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else{
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
            }
        }
    }

    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.valid(id) && revmp.isPlayer(id)
    }

    private describeEatRoutine(entityManager: EntityManager):void{
        entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(this.entityId, 2000, Date.now()))
        entityManager.getActionsComponent(this.entityId).nextActions.push(new PlayAnimationForDuration(this.entityId, "S_EAT", 2000))
        entityManager.getActionsComponent(this.entityId).nextActions.push(new PlayAnimationForDuration(this.entityId, "T_STAND_2_EAT", 2000))
    }
}