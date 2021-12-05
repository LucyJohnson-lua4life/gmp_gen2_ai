
import { IActionDescription } from './iActionDescription';
import { AiState } from '../../aiStates/aiState';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues} from './templates/defaultDescriptionTemplate';
import { TripleQuickAttack } from '../actions/fightActions';
import { gotoStartPoint, setActionWhenUndefined, setAttackerToEnemy, warnEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';

export class OrcMasterDescription implements IActionDescription {
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
            onIdle: this.describeIdleAction.bind(this),
            onAiEnemyDies: gotoStartPoint,
            onEnemyInWarnRange: warnEnemy,
            onEnemyOutOfRange: gotoStartPoint,
            onEnemyDisconnected: gotoStartPoint,
            onAiIsAttacked: setAttackerToEnemy
        }
        describeGeneralRoutine(template)
    }

    private describeAttackAction(template: IDefaultDescriptionTemplateValues) {
        const pauseTime = 500
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.aiId)
        const enemyId = template.aiState.getEntityManager().getEnemyComponent(template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            setActionWhenUndefined(actionsComponent, new TripleQuickAttack(template.aiId, enemyId, this.attackRange, pauseTime))
        }
    }

    private describeIdleAction(template: IDefaultDescriptionTemplateValues) {
        //do nothing
    }

}
