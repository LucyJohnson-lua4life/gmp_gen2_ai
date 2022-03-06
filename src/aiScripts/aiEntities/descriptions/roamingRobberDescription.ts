

import { IActionDescription } from './iActionDescription';
import {GotoPoint, ThreatenPlayerAction} from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/defaultDescriptionTemplate';
import { TripleQuickAttack } from '../actions/fightActions';
import { gotoStartPoint, setAttackerToEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { deleteAiAction, getAiActionHistory, getAiAction, getAiEnemyInfo, getWaynetRegistry, setAiActionHistory, setAiActionIfUndefined } from '../../aiStates/aiStateFunctions/commonAiStateFunctions';

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
            this.describeDefaultRoutine(aiState)
        }
    }

    private describeDefaultRoutine(aiState: AiState): void {
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
        const enemyId = getAiEnemyInfo(template.aiState, template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
           setAiActionIfUndefined(template.aiState, new TripleQuickAttack(template.aiId, enemyId, this.attackRange, pauseTime))
        }
    }

    private describeRoamingAction(template: IDefaultDescriptionTemplateValues) {
        //do nothing
        const random = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        const actionHistory = getAiActionHistory(template.aiState, template.aiId) ?? { entityId: template.aiId }
        const currentAction = getAiAction(template.aiState, template.aiId)
        const lastRoamingTime = actionHistory?.lastRoamingTime ?? 0
        const currentTime = Date.now()
        const isRoaming = currentAction instanceof GotoPoint

        if (currentTime > lastRoamingTime + 30000) {
            getWaynetRegistry(template.aiState).unregisterTownie(template.aiId)
            const targetPoint = getWaynetRegistry(template.aiState).registerTownieAndGetPoint(template.aiId)
            revmp.addMdsOverlay(this.entityId, "HumanS_Relaxed.mds")
            setAiActionIfUndefined(template.aiState, new GotoPoint(template.aiId, template.aiState, targetPoint, "S_WALKL"))
            actionHistory.lastRoamingTime = currentTime
            setAiActionHistory(template.aiState, actionHistory)
        }
        else if (!isRoaming) {
            revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.None })
            revmp.startAnimation(template.aiId, "S_LGUARD")
        }
    }

    private threatenEnemy(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number) {
        const currentAction = getAiAction(template.aiState, template.aiId)

        if (typeof currentAction !== 'undefined' && !(currentAction instanceof ThreatenPlayerAction)) {
            deleteAiAction(template.aiState, template.aiId)
        }
        setAiActionIfUndefined(template.aiState, new ThreatenPlayerAction(template.aiState,template.aiId, warnableEnemyId, 200, 10000))
        revmp.drawMeleeWeapon(template.aiId)
    }

}