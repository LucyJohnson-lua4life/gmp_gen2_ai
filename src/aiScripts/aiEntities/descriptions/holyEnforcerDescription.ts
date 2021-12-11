import { IActionDescription } from './iActionDescription';
import { AiState } from '../../aiStates/aiState';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/defaultDescriptionTemplate';
import { ForwardAttackWithPause } from '../actions/fightActions';
import { gotoStartPoint, setAttackerToEnemy, warnEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { EnforcePrayerAction } from '../actions/paladinActions';
import { deleteAiAction, getAiAction, getEnemyComponent, setAiActionIfUndefined } from '../../aiStates/aiStateFunctions/commonAiStateFunctions';

export class HolyEnforcerDescription implements IActionDescription {
    entityId: number
    lastAttackTime: number
    attackRange: number
    lastPrayerTime: number

    constructor(id: number) {
        this.entityId = id
        this.lastAttackTime = 0
        this.attackRange = 300
        this.lastPrayerTime = 0
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
            onIdle: gotoStartPoint,
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
            setAiActionIfUndefined(template.aiState, new ForwardAttackWithPause(template.aiId, enemyId, this.attackRange, pauseTime))
        }
    }

    private threatenEnemy(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number) {
        const currentAction = getAiAction(template.aiState, template.aiId)

        if (typeof currentAction !== 'undefined' && !(currentAction instanceof EnforcePrayerAction)) {
            deleteAiAction(template.aiState, template.aiId)
        }

        if(Date.now() > this.lastPrayerTime + 180000){
            setAiActionIfUndefined(template.aiState, new EnforcePrayerAction(template.aiState, template.aiId, warnableEnemyId, 200, 20000))
            this.lastPrayerTime = Date.now()
        }
    }
}