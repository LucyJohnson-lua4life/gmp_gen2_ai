
import { IActionDescription } from './iActionDescription';
import { AiState } from '../../aiStates/aiState';
import { ForwardAttackWithPause } from '../actions/fightActions';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/defaultDescriptionTemplate';
import { gotoStartPoint, setActionWhenUndefined, setAttackerToEnemy, warnEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { isAniPlaying } from '../../aiFunctions/aiUtils';

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
            this.describeGeneralRoutine(aiState)
        }
    }

    private describeGeneralRoutine(aiState: AiState): void {
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
        const actionsComponent = values.aiState.getEntityManager().getActionsComponent(values.aiId)
        const enemyId = values.aiState.getEntityManager().getEnemyComponent(values.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            setActionWhenUndefined(actionsComponent, new ForwardAttackWithPause(values.aiId, enemyId, this.attackRange, pauseTime))
        }
    }
    private describeEatRoutine(values: IDefaultDescriptionTemplateValues): void {
        const actionsComponent = values.aiState.getEntityManager().getActionsComponent(values.aiId)
        if (typeof actionsComponent !== 'undefined') {
            if (!isAniPlaying(values.aiId, "S_EAT")) {
                revmp.startAnimation(values.aiId, "S_EAT")
            }
        }

    }

}
