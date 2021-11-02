

import { IActionDescription } from './iActionDescription';
import { isAniPlaying } from "../../aiFunctions/aiUtils";
import {GotoPoint} from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { ForwardAttackWithPause} from '../actions/fightActions';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/defaultDescriptionTemplate';
import { gotoStartPointOnDistance, setActionWhenUndefined } from './templates/commonDefaultTemplateDescriptionFunctions';

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
            aiId: this.entityId,
            aiState: aiState,
            necessaryRange: this.attackRange,
            onAiAttacks: this.describeAttackAction.bind(this),
            onIdle: this.describeRoamingAction.bind(this),
            onAiEnemyDies: gotoStartPointOnDistance,
            onEnemyInWarnRange: this.describeOnInWarnRange
        }
        describeGeneralRoutine(template)
    }

    private describeOnInWarnRange(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number){
        //do nothing
    }

    private describeAttackAction(template: IDefaultDescriptionTemplateValues) {
        const pauseTime = 500
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.aiId)
        const enemyId = template.aiState.getEntityManager().getEnemyComponent(template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            setActionWhenUndefined(actionsComponent, new ForwardAttackWithPause(template.aiId, enemyId, template.necessaryRange, pauseTime))
        }
    }

    private describeRoamingAction(template: IDefaultDescriptionTemplateValues) {
        const random = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        const actionHistory = template.aiState.getEntityManager().getActionHistoryComponent(template.aiId) ?? { entityId: template.aiId }
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.aiId)
        const lastRoamingTime = actionHistory?.lastRoamingTime ?? 0
        const currentTime = Date.now()
        const isNoActionRunning = typeof actionsComponent?.nextAction === 'undefined'

        if (isNoActionRunning && currentTime > lastRoamingTime + random*60000) {
            template.aiState.getWaynetRegistry().unregisterCitizen(template.aiId)
            const targetPoint = template.aiState.getWaynetRegistry().registerCitizenAndGetPoint(template.aiId)
            revmp.addOverlay(this.entityId, "HumanS_Relaxed.mds")
            setActionWhenUndefined(actionsComponent, new GotoPoint(template.aiId, template.aiState, targetPoint, "S_WALKL"))
            actionHistory.lastRoamingTime = currentTime
            template.aiState.getEntityManager().setActionHistoryComponent(template.aiId, actionHistory)
        }
        else if (isNoActionRunning && !isAniPlaying(template.aiId, "S_LGUARD")) {
            revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.None })
            revmp.startAnimation(template.aiId, "S_LGUARD")
        }
    }
}