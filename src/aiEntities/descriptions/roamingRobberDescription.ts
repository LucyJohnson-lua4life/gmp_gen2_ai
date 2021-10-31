

import { IActionDescription } from './iActionDescription';
import { getAngleToTarget, getDistance, } from "../../aiFunctions/aiUtils";
import {
    SLeftAttackAction, SRightAttackAction,
    SRunParadeJump, SRunStrafeLeft, SRunStrafeRight,
    RunToTargetAction, WaitAction, TurnToTargetAction,
    PlayAnimation, GotoPoint, ThreatenPlayerAction
} from "../actions/commonActions";
import { NpcActionUtils } from '../../aiFunctions/npcActionUtils';
import { AiState } from '../../aiStates/aiState';
import { IActionComponent } from '.././components/iActionsComponent';

export class RoamingRobberDescription implements IActionDescription {
    entityId: number
    lastAttackTime: number
    attackRange: number

    constructor(id: number) {
        this.entityId = id
        this.lastAttackTime = 0
        this.attackRange = 200
    }

    describeAction(aiState: AiState): void {
        if (revmp.valid(this.entityId)) {
            //this.describeGeneralRoutine(aiState)
        }
    }

    /*
    private describeGeneralRoutine(aiState: AiState): void {
        const npcActionUtils = new NpcActionUtils(aiState)
        const entityManager = aiState.getEntityManager()
        const enemyId = entityManager.getEnemyComponent(this.entityId)?.enemyId
        const actionsComponent = entityManager.getActionsComponent(this.entityId)
        const nextActions = entityManager.getActionsComponent(this.entityId)?.nextAction ?? []
        const actionListSize = entityManager.getActionsComponent(this.entityId)?.nextAction.length ?? 99999

        if (typeof enemyId !== 'undefined' && this.enemyExists(enemyId)) {
            const range = getDistance(this.entityId, enemyId)
            const isEnemyAlive = revmp.getHealth(enemyId).current > 0
            if (range < 800 && typeof actionsComponent !== 'undefined' && actionListSize < 5 && isEnemyAlive) {
                this.describeFightAction(aiState, enemyId, range)
            }
            else if (isEnemyAlive === false && typeof actionsComponent !== 'undefined') {
                revmp.putWeaponAway(this.entityId)
                actionsComponent.nextAction = []
                entityManager.deleteEnemyComponent(this.entityId)
            }
        }
        else if (typeof actionsComponent !== 'undefined' && actionListSize < 1 && !nextActions.some(action => action instanceof ThreatenPlayerAction)) {
            //TODO: the world constant should only be fixed in later versions!
            const charId = npcActionUtils.getNearestCharacter(this.entityId, "NEWWORLD\\NEWWORLD.ZEN")
            let range = 99999999
            //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
            if (charId !== this.entityId && charId !== -1 && revmp.isPlayer(charId) && revmp.getHealth(charId).current > 0) {
                range = getDistance(this.entityId, charId)
            }
            if (range < 500 && typeof actionsComponent !== 'undefined' && revmp.isPlayer(charId) && revmp.getHealth(charId).current > 0) {
                actionsComponent.nextAction.push(new ThreatenPlayerAction(entityManager, this.entityId, charId, 200, 10000))
            }
        }
        else if (typeof actionsComponent !== 'undefined' && actionListSize < 1) {
            revmp.putWeaponAway(this.entityId)
            this.describeRoamingRoutine(actionsComponent, aiState)
        }
    }
    private describeFightAction(aiState: AiState, enemyId: number, range: number): void {
        const entityManager = aiState.getEntityManager();
        const actionsComponent = entityManager?.getActionsComponent(this.entityId);
        if (revmp.getCombatState(this.entityId).weaponMode === revmp.WeaponMode.None) {
            revmp.drawMeleeWeapon(this.entityId)
        }
        if (typeof actionsComponent !== 'undefined' && range > this.attackRange) {
            actionsComponent.nextAction.push(new RunToTargetAction(this.entityId, enemyId))
        }
        else if (typeof actionsComponent !== 'undefined' && range > 800) {
            entityManager.deleteEnemyComponent(this.entityId)
        }
        else if (typeof actionsComponent !== 'undefined') {
            this.describeWhenInRange(actionsComponent, enemyId, range)
        }

        if (typeof actionsComponent !== 'undefined') {
            actionsComponent.nextAction.push(new TurnToTargetAction(this.entityId, enemyId))
        }
    }

    private describeWhenInRange(actionsComponent: IActionComponent, enemyId: number, range: number): void {
        const angleRange = Math.abs(getAngleToTarget(this.entityId, enemyId) - getAngleToTarget(enemyId, this.entityId))
        const isEntityInEnemyAngleRange = (angleRange < 180 + 20 || angleRange > 180 + 20)
        const currentTime = Date.now()
        if (isEntityInEnemyAngleRange && currentTime - this.lastAttackTime > 2700) {
            this.describeAttackAction(actionsComponent, enemyId)
            this.lastAttackTime = currentTime
        }
        else if (range < this.attackRange - 150) {
            actionsComponent.nextAction.push(new WaitAction(this.entityId, 200))
            actionsComponent.nextAction.push(new SRunParadeJump(this.entityId))
        }
        else {
            const random = Math.floor(Math.random() * 10);
            const pangle = getAngleToTarget(this.entityId, enemyId)
            if (random <= 2) {
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
                actionsComponent.nextAction.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 6) {
                if (pangle > 180) {
                    actionsComponent.nextAction.push(new WaitAction(this.entityId, 200))
                    actionsComponent.nextAction.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextAction.push(new WaitAction(this.entityId, 200))
                    actionsComponent.nextAction.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else if (random <= 7) {
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 300))
                actionsComponent.nextAction.push(new SRunParadeJump(this.entityId))
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
                actionsComponent.nextAction.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 9 && isEntityInEnemyAngleRange) {
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
                if (pangle > 180) {
                    actionsComponent.nextAction.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextAction.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else {
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 200))
            }
        }
    }

    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.valid(id) && revmp.isPlayer(id)
    }

    private describeAttackAction(actionsComponent: IActionComponent, enemyId: number) {
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
        actionsComponent.nextAction.push(new SLeftAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 150))
        actionsComponent.nextAction.push(new SRightAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 150))
        actionsComponent.nextAction.push(new SLeftAttackAction(this.entityId, enemyId, this.attackRange))
    }

    private describeRoamingRoutine(actionsComponent: IActionComponent, aiState: AiState): void {
        const random = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        aiState.getWaynetRegistry().unregisterCrimminal(this.entityId)
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 60000 * random))
        actionsComponent.nextAction.push(new PlayAnimation(this.entityId, "S_LGUARD"))
        const targetPoint = aiState.getWaynetRegistry().registerCrimminalAndGetPoint(this.entityId)
        revmp.addOverlay(this.entityId, "HumanS_Relaxed.mds")
        console.log(this.entityId + "robber goes to: " + targetPoint)
        actionsComponent.nextAction.push(new GotoPoint(this.entityId, aiState, targetPoint, "S_WALKL"))
    }
    */

}