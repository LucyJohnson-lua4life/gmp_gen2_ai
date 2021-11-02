
import { IActionDescription } from './iActionDescription';
import {PlayAnimationForDuration} from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { ForwardAttackWithPause } from '../actions/fightActions';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues} from './templates/defaultDescriptionTemplate';
import { gotoStartPointOnDistance, setActionWhenUndefined, warnEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';

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
        if (revmp.valid(this.entityId) ) {
            this.describeGeneralRoutine(aiState)
        }
    }

    private describeGeneralRoutine(aiState: AiState): void {
        const template: IDefaultDescriptionTemplateValues = {
            aiId: this.entityId,
            aiState: aiState,
            necessaryRange: this.attackRange,
            onAiAttacks: this.describeAttackAction.bind(this),
            onIdle: this.describeEatRoutine.bind(this),
            onAiEnemyDies: gotoStartPointOnDistance,
            onEnemyInWarnRange: warnEnemy
            
        }
        describeGeneralRoutine(template)
    }

    private describeAttackAction(template: IDefaultDescriptionTemplateValues) {
        const pauseTime = 500
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.aiId)
        const enemyId = template.aiState.getEntityManager().getEnemyComponent(template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            setActionWhenUndefined(actionsComponent, new ForwardAttackWithPause(template.aiId, enemyId, template.necessaryRange, pauseTime))
        }
    }
    private describeEatRoutine(template: IDefaultDescriptionTemplateValues): void {
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.aiId)
        if (typeof actionsComponent !== 'undefined') {
            setActionWhenUndefined(actionsComponent, new PlayAnimationForDuration(template.aiId, "S_EAT", 2000))
        }
    }

}

