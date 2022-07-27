import { AiState } from "../../aiStates/aiState"
import { getAiEnemyInfo, setAiActionIfUndefined, getAiAction } from "../../aiStates/aiStateFunctions/commonAiStateFunctions"
import { FreeAttackWithPause, StunAttackWithPause } from "../actions/fightActions"
import { IActionDescription } from "../iActionDescription"
import { gotoStartPoint, warnEnemy, setAttackerToEnemy } from "./templates/commonDefaultTemplateDescriptionFunctions"
import { IDefaultDescriptionTemplateValues, describeGeneralRoutine } from "./templates/defaultDescriptionTemplate"

export class TrollDescription implements IActionDescription {
    entityId: number
    lastAttackTime: number
    attackRange: number

    constructor(id: number) {
        this.entityId = id
        this.lastAttackTime = 0
        this.attackRange = 700 
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
            attackFrequency: 5000,
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
        const enemyId = getAiEnemyInfo(values.aiState, values.aiId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            const random = Math.floor(Math.random() * 3);
            if(random === 0){
                setAiActionIfUndefined(values.aiState, new StunAttackWithPause(values.aiId, enemyId, this.attackRange, pauseTime, "T_FISTATTACKMOVE"))
            }
            else{
                setAiActionIfUndefined(values.aiState, new FreeAttackWithPause(values.aiId, enemyId, this.attackRange, pauseTime, "T_FISTATTACKMOVE"))
            }
        }
    }
    private describeEatRoutine(values: IDefaultDescriptionTemplateValues): void {
        const currentAction = getAiAction(values.aiState, values.aiId)
        if (typeof currentAction !== 'undefined') {
            if (!revmp.isAnimationActive(values.aiId, "S_EAT") && revmp.hasAnimation(values.aiId, "S_EAT")) {
                revmp.startAnimation(values.aiId, "S_EAT")
            }
        }

    }

}