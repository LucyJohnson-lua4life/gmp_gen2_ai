import { IActionDescription } from './iActionDescription';
import { AiState } from '../../aiStates/aiState';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues} from './templates/defaultDescriptionTemplate';
import { ForwardAttackWithPause} from '../actions/fightActions';
import { gotoStartPoint, setActionWhenUndefined, setAttackerToEnemy, warnEnemy } from './templates/commonDefaultTemplateDescriptionFunctions';
import { EnforcePrayerAction } from '../actions/paladinActions';
import { IActionComponent } from '../components/iActionsComponent';
import { getActionsComponent, getEnemyComponent } from '../../../aiScripts/aiStates/commonAiStateFunctions';

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
        const actionsComponent = getActionsComponent(template.aiState, template.aiId)
        const enemyId = getEnemyComponent(template.aiState, template.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            setActionWhenUndefined(actionsComponent, new ForwardAttackWithPause(template.aiId, enemyId, this.attackRange, pauseTime))
        }
    }

    private threatenEnemy(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number) {
        const actionsComponent = getActionsComponent(template.aiState, template.aiId)

        if (typeof actionsComponent !== 'undefined' && !(actionsComponent.nextAction instanceof EnforcePrayerAction) && Date.now() > this.lastPrayerTime + 180000) {
            this.clearAction(actionsComponent)
            setActionWhenUndefined(actionsComponent, new EnforcePrayerAction(template.aiState,template.aiId, warnableEnemyId, 200, 20000))
            this.lastPrayerTime = Date.now()
        }
    }

    private describeIdleAction(template: IDefaultDescriptionTemplateValues) {
        //do nothing
    }

    private clearAction(actionsComponent: IActionComponent | undefined): void {
        if (typeof actionsComponent !== 'undefined') {
            actionsComponent.nextAction = undefined
        }
    }
}