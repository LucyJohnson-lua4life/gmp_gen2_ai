
import { IActionDescription } from './iActionDescription';
import { isAniPlaying } from "../../aiFunctions/aiUtils";
import { GotoPoint } from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues} from './templates/defaultDescriptionTemplate';
import { TripleQuickAttack } from '../actions/fightActions';
import { gotoStartPoint, setAttackerToEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { getAiActionHistory, getAiAction, getAiEnemyInfo, getWaynetRegistry, setAiActionHistory, setAiActionIfUndefined } from '../../aiStates/aiStateFunctions/commonAiStateFunctions';

export class HeavyCrimminalDescription implements IActionDescription {
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
            onEnemyInWarnRange: this.describeOnInWarnRange,
            onEnemyOutOfRange: gotoStartPoint,
            onEnemyDisconnected: gotoStartPoint,
            onAiIsAttacked: setAttackerToEnemy
        }
        describeGeneralRoutine(template)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private describeOnInWarnRange(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number){

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
        const isNoActionRunning = typeof currentAction === 'undefined'

        if (isNoActionRunning && currentTime > lastRoamingTime + 30000) {
            getWaynetRegistry(template.aiState).unregisterCrimminal(template.aiId)
            const targetPoint = getWaynetRegistry(template.aiState).registerCrimminalAndGetPoint(template.aiId)
            revmp.addOverlay(this.entityId, "HumanS_Relaxed.mds")
            setAiActionIfUndefined(template.aiState, new GotoPoint(template.aiId, template.aiState, targetPoint, "S_WALKL"))
            actionHistory.lastRoamingTime = currentTime
            setAiActionHistory(template.aiState, actionHistory)
        }
        else if (isNoActionRunning && !isAniPlaying(template.aiId, "S_LGUARD")) {
            revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.None })
            revmp.startAnimation(template.aiId, "S_LGUARD")
        }
    }
}
