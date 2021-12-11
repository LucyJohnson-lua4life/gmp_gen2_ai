
import { IActionDescription } from './iActionDescription';
import { AiState } from '../../aiStates/aiState';
import { ForwardAttackWithPause } from '../actions/fightActions';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/defaultDescriptionTemplate';
import { gotoStartPoint, setAttackerToEnemy, warnEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { isAniPlaying } from '../../aiFunctions/aiUtils';
import { getAiAction, getEnemyComponent, setAiActionIfUndefined } from '../../aiStates/aiStateFunctions/commonAiStateFunctions';

export class DefaultMonsterDescription implements IActionDescription {
    entityId: number
    lastAttackTime: number
    attackRange: number

    constructor(id: number) {
        this.entityId = id
        this.lastAttackTime = 0
        this.attackRange = 300
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
            onIdle: this.describeEatRoutine.bind(this),
            onAiEnemyDies: gotoStartPoint,
            onEnemyInWarnRange: warnEnemy,
            onEnemyOutOfRange: gotoStartPoint,
            onEnemyDisconnected: gotoStartPoint,
            onAiIsAttacked: setAttackerToEnemy

        }
        describeGeneralRoutine(template)
    }

    private describeAttackAction(values: IDefaultDescriptionTemplateValues) {
        const pauseTime = 500
        const enemyId = getEnemyComponent(values.aiState, values.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            setAiActionIfUndefined(values.aiState, new ForwardAttackWithPause(values.aiId, enemyId, this.attackRange, pauseTime))
        }
    }
    private describeEatRoutine(values: IDefaultDescriptionTemplateValues): void {
        const currentAction = getAiAction(values.aiState, values.aiId)
        if (typeof currentAction !== 'undefined') {
            if (!isAniPlaying(values.aiId, "S_EAT")) {
                revmp.startAnimation(values.aiId, "S_EAT")
            }
        }

    }

}
