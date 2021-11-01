

import { IActionDescription } from './iActionDescription';
import { getDistanceToPoint, isAniPlaying } from "../../aiFunctions/aiUtils";
import {GotoPoint} from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { IActionComponent } from '../components/iActionsComponent';
import { ForwardAttackWithPause} from '../actions/fightActions';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/fightDescriptionTemplates';
import { IAiAction } from '../iAiAction';

export class CitizenDescription implements IActionDescription {
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
            onEnemyInWarnRange: this.describeOnInWarnRange
        }
        describeGeneralRoutine(template)
    }

    private describeOnInWarnRange(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number){

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
}