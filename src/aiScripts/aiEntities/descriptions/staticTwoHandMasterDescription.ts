import { IActionDescription } from './iActionDescription';
import { AiState } from '../../aiStates/aiState';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues} from './templates/defaultDescriptionTemplate';
import { ForwardAttackWithPause} from '../actions/fightActions';
import { gotoStartPoint, setAttackerToEnemy, warnEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { getActionsComponent, getEnemyComponent, setActionsComponentIfUndefined } from '../../aiStates/aiStateFunctions/commonAiStateFunctions';

export class StaticTwoHandMaster implements IActionDescription {
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
        const enemyId = getEnemyComponent(template.aiState, template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            setActionsComponentIfUndefined(template.aiState, new ForwardAttackWithPause(template.aiId, enemyId, this.attackRange, pauseTime))
        }
    }

    private describeIdleAction(template: IDefaultDescriptionTemplateValues) {
        //do nothing
    }

}