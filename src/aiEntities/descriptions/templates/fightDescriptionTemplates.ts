import { WaitAction } from "../../../aiEntities/actions/commonActions"
import { ParadeWithPause, StrafeRightWithPause, StrafeLeftWithPause, DoubleParadeWithPause } from "../../..//aiEntities/actions/fightActions"
import { getAngleToTarget } from "../../../aiFunctions/aiUtils"
import { AiState } from "../../../aiStates/aiState"

export interface IFightMoveDescriptionTemplate{
    fighterId: number
    aiState: AiState
    enemyId: number
    currentRange: number
    necessaryRange: number
    describeAttackMoves(template: IFightMoveDescriptionTemplate):void
}

export function describeFightMovements(template: IFightMoveDescriptionTemplate): void{
    const entityManager = template.aiState.getEntityManager()
    const actionsComponent= entityManager.getActionsComponent(template.fighterId)

    const lastAttackTime = entityManager.getEnemyComponent(template.fighterId)?.lastAttackTime ?? 0

        const currentTime = Date.now()
        const angleRange = Math.abs(getAngleToTarget(template.fighterId, template.enemyId) - getAngleToTarget(template.enemyId, template.fighterId))
        const isEntityInEnemyAngleRange = (angleRange < 180 + 20 || angleRange > 180 - 20)
        if (isEntityInEnemyAngleRange && currentTime - lastAttackTime > 2700) {
            //this.describeAttackAction(actionsComponent, enemyId)
            template.describeAttackMoves(template)
            entityManager.setEnemyComponent(template.fighterId,{entityId: template.fighterId, enemyId: template.enemyId, lastAttackTime: currentTime})
        }
        else if (template.currentRange < template.necessaryRange - 150) {
            actionsComponent?.nextActions.push(new ParadeWithPause(template.fighterId,200))
        }
        else {
            const random = Math.floor(Math.random() * 10);
            const pangle = getAngleToTarget(template.fighterId, template.enemyId)
            if (random <= 3) {
                actionsComponent?.nextActions.push(new ParadeWithPause(template.fighterId, 500))
            }
            else if (random <= 5) {
                if (pangle > 180) {
                    actionsComponent?.nextActions.push(new StrafeRightWithPause(template.fighterId,200))
                }
                else {
                    actionsComponent?.nextActions.push(new StrafeLeftWithPause(template.fighterId,200))
                }
            }
            else if (random <= 6) {
                actionsComponent?.nextActions.push(new DoubleParadeWithPause(template.fighterId, 300))
            }
            else if (random <= 9 && isEntityInEnemyAngleRange) {
                if (pangle > 180) {
                    actionsComponent?.nextActions.push(new StrafeRightWithPause(template.fighterId, 500))
                }
                else {
                    actionsComponent?.nextActions.push(new StrafeLeftWithPause(template.fighterId, 500))
                }
            }
            else {
                actionsComponent?.nextActions.push(new WaitAction(template.fighterId, 200))
            }
        }

}