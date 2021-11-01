

import { IActionDescription } from './iActionDescription';
import { getDistanceToPoint, isAniPlaying, } from "../../aiFunctions/aiUtils";
import {GotoPoint, ThreatenPlayerAction} from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { IActionComponent } from '.././components/iActionsComponent';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/fightDescriptionTemplates';
import { ForwardAttackWithPause } from '../actions/fightActions';
import { IAiAction } from '../iAiAction';

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
            this.describeGeneralRoutine(aiState)
        }
    }

    private describeGeneralRoutine(aiState: AiState): void {
        const template: IDefaultDescriptionTemplateValues = {
            fighterId: this.entityId,
            aiState: aiState,
            necessaryRange: this.attackRange,
            onAiAttacks: this.describeAttackAction.bind(this),
            onIdle: this.describeRoamingAction.bind(this),
            onAiEnemyDied: this.gotoStartPointOnDistance.bind(this),
            onEnemyInWarnRange: this.threatenEnemy.bind(this)
        }
        describeGeneralRoutine(template)
    }


    private describeAttackAction(template: IDefaultDescriptionTemplateValues) {
        const pauseTime = 500
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.fighterId)
        const enemyId = template.aiState.getEntityManager().getEnemyComponent(template.fighterId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            this.setActionWhenUndefined(actionsComponent, new ForwardAttackWithPause(template.fighterId, enemyId, template.necessaryRange, pauseTime))
        }
    }

    private describeRoamingAction(template: IDefaultDescriptionTemplateValues) {
        //do nothing
        const random = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        const actionHistory = template.aiState.getEntityManager().getActionHistoryComponent(template.fighterId) ?? { entityId: template.fighterId }
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.fighterId)
        const lastRoamingTime = actionHistory?.lastRoamingTime ?? 0
        const currentTime = Date.now()
        const isNoActionRunning = typeof actionsComponent?.nextAction === 'undefined'

        if (isNoActionRunning && currentTime > lastRoamingTime + 30000) {
            template.aiState.getWaynetRegistry().unregisterCitizen(template.fighterId)
            const targetPoint = template.aiState.getWaynetRegistry().registerCitizenAndGetPoint(template.fighterId)
            revmp.addOverlay(this.entityId, "HumanS_Relaxed.mds")
            this.setActionWhenUndefined(actionsComponent, new GotoPoint(template.fighterId, template.aiState, targetPoint, "S_WALKL"))
            actionHistory.lastRoamingTime = currentTime
            template.aiState.getEntityManager().setActionHistoryComponent(template.fighterId, actionHistory)
        }
        else if (isNoActionRunning && !isAniPlaying(template.fighterId, "S_LGUARD")) {
            revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.None })
            revmp.startAnimation(template.fighterId, "S_LGUARD")
        }
    }

    private gotoStartPointOnDistance(template: IDefaultDescriptionTemplateValues) {
        const entityManager = template.aiState.getEntityManager();
        const startPoint = entityManager.getPositionsComponents(this.entityId)?.startPoint
        const startWayPoint = typeof startPoint !== 'undefined' ? template.aiState.getWaynet().waypoints.get(startPoint) : undefined
        let pointVec: revmp.Vec3 | undefined = undefined;

        if (typeof startWayPoint === 'undefined') {
            const startFreepoint = template.aiState.getWaynet().freepoints.find(fp => fp.fpName === startPoint)
            if (typeof startFreepoint !== 'undefined') {
                pointVec = [startFreepoint.x, startFreepoint.y, startFreepoint.z]
            }
        }
        else {
            pointVec = [startWayPoint.x, startWayPoint.y, startWayPoint.z]
        }


        if (typeof pointVec !== 'undefined' && typeof startPoint !== 'undefined' && getDistanceToPoint(this.entityId, pointVec) > 500) {
            const actionsComponent = entityManager.getActionsComponent(this.entityId)
            if (typeof actionsComponent !== 'undefined') {
                revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.None })
                this.setActionWhenUndefined(actionsComponent, new GotoPoint(this.entityId, template.aiState, startPoint, "S_RUNL"))
            }
        }
    }

    private setActionWhenUndefined(actionComponent: IActionComponent | undefined, action: IAiAction | undefined) {
        if (typeof actionComponent !== 'undefined' && typeof action !== 'undefined' && typeof actionComponent.nextAction === 'undefined') {
            actionComponent.nextAction = action
        }
    }


    private threatenEnemy(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number) {
        const entityManager = template.aiState.getEntityManager()
        const actionsComponent = entityManager.getActionsComponent(template.fighterId)
        console.log("here")

        if (typeof actionsComponent !== 'undefined' && !(actionsComponent.nextAction instanceof ThreatenPlayerAction)) {
        console.log("here2")
            this.clearAction(actionsComponent)
            this.setActionWhenUndefined(actionsComponent, new ThreatenPlayerAction(entityManager,template.fighterId, warnableEnemyId, 200, 10000))
            revmp.drawMeleeWeapon(template.fighterId)
        }
    }

    private clearAction(actionsComponent: IActionComponent | undefined): void {
        if (typeof actionsComponent !== 'undefined') {
            actionsComponent.nextAction = undefined
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