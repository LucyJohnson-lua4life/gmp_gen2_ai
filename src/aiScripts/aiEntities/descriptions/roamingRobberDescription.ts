

import { IActionDescription } from './iActionDescription';
import { isAniPlaying} from "../../aiFunctions/aiUtils";
import {GotoPoint, ThreatenPlayerAction} from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { IActionComponent } from '.././components/iActionsComponent';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/defaultDescriptionTemplate';
import { TripleQuickAttack } from '../actions/fightActions';
import { gotoStartPoint, setActionWhenUndefined, setAttackerToEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { getActionHistoryComponent, getActionsComponent, getEnemyComponent, setActionHistoryComponent } from '../../../aiScripts/aiStates/commonAiStateFunctions';

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
            aiId: this.entityId,
            aiState: aiState,
            attackRange: this.attackRange,
            onAiAttacks: this.describeAttackAction.bind(this),
            onIdle: this.describeRoamingAction.bind(this),
            onAiEnemyDies: gotoStartPoint,
            onEnemyInWarnRange: this.threatenEnemy.bind(this),
            onEnemyOutOfRange: gotoStartPoint,
            onEnemyDisconnected: gotoStartPoint,
            onAiIsAttacked: setAttackerToEnemy
        }
        describeGeneralRoutine(template)
    }


    private describeAttackAction(template: IDefaultDescriptionTemplateValues) {
        const pauseTime = 500
        const actionsComponent = getActionsComponent(template.aiState, template.aiId)
        const enemyId = getEnemyComponent(template.aiState, template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
           setActionWhenUndefined(actionsComponent, new TripleQuickAttack(template.aiId, enemyId, this.attackRange, pauseTime))
        }
    }

    private describeRoamingAction(template: IDefaultDescriptionTemplateValues) {
        //do nothing
        const random = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        const actionHistory = getActionHistoryComponent(template.aiState, template.aiId) ?? { entityId: template.aiId }
        const actionsComponent = getActionsComponent(template.aiState, template.aiId)
        const lastRoamingTime = actionHistory?.lastRoamingTime ?? 0
        const currentTime = Date.now()
        const isNoActionRunning = typeof actionsComponent?.nextAction === 'undefined'

        if (isNoActionRunning && currentTime > lastRoamingTime + 30000) {
            template.aiState.getWaynetRegistry().unregisterTownie(template.aiId)
            const targetPoint = template.aiState.getWaynetRegistry().registerTownieAndGetPoint(template.aiId)
            revmp.addOverlay(this.entityId, "HumanS_Relaxed.mds")
            setActionWhenUndefined(actionsComponent, new GotoPoint(template.aiId, template.aiState, targetPoint, "S_WALKL"))
            actionHistory.lastRoamingTime = currentTime
            setActionHistoryComponent(template.aiState, actionHistory)
        }
        else if (isNoActionRunning && !isAniPlaying(template.aiId, "S_LGUARD")) {
            revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.None })
            revmp.startAnimation(template.aiId, "S_LGUARD")
        }
    }

    private threatenEnemy(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number) {
        const actionsComponent = getActionsComponent(template.aiState, template.aiId)

        if (typeof actionsComponent !== 'undefined' && !(actionsComponent.nextAction instanceof ThreatenPlayerAction)) {
            this.clearAction(actionsComponent)
            setActionWhenUndefined(actionsComponent, new ThreatenPlayerAction(template.aiState,template.aiId, warnableEnemyId, 200, 10000))
            revmp.drawMeleeWeapon(template.aiId)
        }
    }

    private clearAction(actionsComponent: IActionComponent | undefined): void {
        if (typeof actionsComponent !== 'undefined') {
            actionsComponent.nextAction = undefined
        }
    }

}