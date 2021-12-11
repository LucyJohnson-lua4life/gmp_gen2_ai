

import { IActionDescription } from './iActionDescription';
import { isAniPlaying} from "../../aiFunctions/aiUtils";
import {GotoPoint, ThreatenPlayerAction} from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { IActionComponent } from '.././components/iActionsComponent';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/defaultDescriptionTemplate';
import { TripleQuickAttack } from '../actions/fightActions';
import { gotoStartPoint, setAttackerToEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { deleteActionsComponent, getActionHistoryComponent, getActionsComponent, getEnemyComponent, getWaynetRegistry, setActionHistoryComponent, setActionsComponentIfUndefined } from '../../aiStates/aiStateFunctions/commonAiStateFunctions';

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
        const enemyId = getEnemyComponent(template.aiState, template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
           setActionsComponentIfUndefined(template.aiState, new TripleQuickAttack(template.aiId, enemyId, this.attackRange, pauseTime))
        }
    }

    private describeRoamingAction(template: IDefaultDescriptionTemplateValues) {
        //do nothing
        const random = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        const actionHistory = getActionHistoryComponent(template.aiState, template.aiId) ?? { entityId: template.aiId }
        const actionsComponent = getActionsComponent(template.aiState, template.aiId)
        const lastRoamingTime = actionHistory?.lastRoamingTime ?? 0
        const currentTime = Date.now()
        const isNoActionRunning = typeof actionsComponent === 'undefined'

        if (isNoActionRunning && currentTime > lastRoamingTime + 30000) {
            getWaynetRegistry(template.aiState).unregisterTownie(template.aiId)
            const targetPoint = getWaynetRegistry(template.aiState).registerTownieAndGetPoint(template.aiId)
            revmp.addOverlay(this.entityId, "HumanS_Relaxed.mds")
            setActionsComponentIfUndefined(template.aiState, new GotoPoint(template.aiId, template.aiState, targetPoint, "S_WALKL"))
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

        if (typeof actionsComponent !== 'undefined' && !(actionsComponent instanceof ThreatenPlayerAction)) {
            deleteActionsComponent(template.aiState, template.aiId)
        }
        setActionsComponentIfUndefined(template.aiState, new ThreatenPlayerAction(template.aiState,template.aiId, warnableEnemyId, 200, 10000))
        revmp.drawMeleeWeapon(template.aiId)
    }

}