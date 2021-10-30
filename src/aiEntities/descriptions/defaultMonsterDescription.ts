
import { IActionDescription } from './iActionDescription';
import { getDistanceToPoint } from "../../aiFunctions/aiUtils";
import {
    PlayAnimationForDuration, GotoPoint
} from "../actions/commonActions";
import { AiState } from '../../aiStates/aiState';
import { ForwardAttackWithPause } from '../actions/fightActions';
import { describeGeneralRoutine, IDefaultDescriptionTemplateValues } from './templates/fightDescriptionTemplates';

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
        const nextActions = aiState.getEntityManager().getActionsComponent(this.entityId)?.nextActions ?? []
        const actionListSize = nextActions?.length ?? 999999
        if (revmp.valid(this.entityId) && actionListSize < 1) {
            this.describeGeneralRoutine(aiState)
        }
    }

    private describeGeneralRoutine(aiState: AiState): void {
        const template: IDefaultDescriptionTemplateValues = {
            fighterId: this.entityId,
            aiState: aiState,
            necessaryRange: this.attackRange,
            onAiAttacks: this.describeAttackAction,
            onIdle: this.describeEatRoutine,
            onAiEnemyDied: this.gotoStartPointOnDistance
        }
        describeGeneralRoutine(template)
    }

    private gotoStartPointOnDistance(template: IDefaultDescriptionTemplateValues) {
        const entityManager = template.aiState.getEntityManager();
        const startPoint = entityManager.getPositionsComponents(this.entityId)?.startPoint
        const startWayPoint = typeof startPoint !== 'undefined' ? template.aiState.getWaynet().waypoints.get(startPoint) : undefined
        let pointVec: revmp.Vec3 | undefined = undefined;

        if (typeof startWayPoint === 'undefined') {
            const startFreepoint = template.aiState.getWaynet().freepoints.find(fp => fp.fpName === startPoint)
            if (typeof startFreepoint !== 'undefined') {
                pointVec = [startFreepoint.x, startFreepoint.y, startFreepoint.z]
            }
        }
        else {
            pointVec = [startWayPoint.x, startWayPoint.y, startWayPoint.z]
        }


        if (typeof pointVec !== 'undefined' && typeof startPoint !== 'undefined' && getDistanceToPoint(this.entityId, pointVec) > 500) {
            const actionsComponent = entityManager.getActionsComponent(this.entityId)
            if (typeof actionsComponent !== 'undefined') {
                actionsComponent.nextActions.push(new GotoPoint(this.entityId, template.aiState, startPoint, "S_RUNL"))
                revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.Fist })
            }
        }
    }

    private describeAttackAction(template: IDefaultDescriptionTemplateValues) {
        const pauseTime = 500
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.fighterId)
        const enemyId = template.aiState.getEntityManager().getEnemyComponent(template.fighterId)?.enemyId
        if (typeof enemyId !== 'undefined') {
            actionsComponent?.nextActions.push(new ForwardAttackWithPause(template.fighterId, enemyId, template.necessaryRange, pauseTime))
        }
    }
    private describeEatRoutine(template: IDefaultDescriptionTemplateValues): void {
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.fighterId)
        if (typeof actionsComponent !== 'undefined') {
            actionsComponent.nextActions.push(new PlayAnimationForDuration(template.fighterId, "S_EAT", 2000))
        }
    }

}

