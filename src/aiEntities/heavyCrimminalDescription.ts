
import { IActionDescription } from './iActionDescription';
import { getAngleToTarget, getDistance, getPlayerAngle, getDistanceToPoint } from "../aiFunctions/aiUtils";
import {
    SLeftAttackAction, SRightAttackAction,
    SRunParadeJump, SRunStrafeLeft, SRunStrafeRight,
    RunToTargetAction, WaitAction, TurnToTargetAction,
    WarnEnemy, WarnEnemyActionInput, GotoPoint, PlayAnimation
} from "../aiFunctions/commonActions";
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';
import { AiState } from '../aiStates/aiState';
import { IActionsComponent } from './components/iActionsComponent';
import { EntityManager } from 'src/aiStates/entityManager';

export class HeavyCrimminalDescription implements IActionDescription {
    entityId: number
    lastAttackTime: number
    attackRange: number

    constructor(id: number) {
        this.entityId = id
        this.lastAttackTime = 0
        this.attackRange = 200
    }

    describeAction(aiState: AiState): void {
        if (revmp.valid(this.entityId)) {
            this.describeGeneralRoutine(aiState)
        }
    }

    private describeGeneralRoutine(aiState: AiState): void {
        const entityManager = aiState.getEntityManager()

        const enemyId = entityManager.getEnemyComponent(this.entityId)?.enemyId
        const actionsComponent = entityManager.getActionsComponent(this.entityId)

        const actionListSize = entityManager.getActionsComponent(this.entityId)?.nextActions.length ?? 99999
        if (typeof enemyId !== 'undefined' && this.enemyExists(enemyId)) {
            const range = getDistance(this.entityId, enemyId)
            if (range < 800 && typeof actionsComponent !== 'undefined' && typeof actionListSize !== 'undefined' && actionListSize < 5) {
                this.describeFightAction(aiState, enemyId, range)
            }
        }
        else if (typeof actionsComponent !== 'undefined' && actionListSize < 1) {
            this.describeRoamingRoutine(actionsComponent, aiState)
            //this.gotoStartPointOnDistance(aiState, 500)
        }
    }
    private describeFightAction(aiState: AiState, enemyId: number, range: number): void {
        const entityManager = aiState.getEntityManager();
        const actionsComponent = entityManager?.getActionsComponent(this.entityId);
        if (revmp.getCombatState(this.entityId).weaponMode === revmp.WeaponMode.None) {
            revmp.drawMeleeWeapon(this.entityId)
        }
        if (typeof actionsComponent !== 'undefined' && range > this.attackRange) {
            actionsComponent.nextActions.push(new RunToTargetAction(this.entityId, enemyId, 300))
        }
        else if (typeof actionsComponent !== 'undefined' && range > 800) {
            entityManager.deleteEnemyComponent(this.entityId)
        }
        else if (typeof actionsComponent !== 'undefined') {
            this.describeWhenInRange(actionsComponent, enemyId, range)
        }

        if (typeof actionsComponent !== 'undefined') {
            actionsComponent.nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
        }
    }

    private describeWhenInRange(actionsComponent: IActionsComponent, enemyId: number, range: number): void {
        const dangle = getPlayerAngle(this.entityId) - getAngleToTarget(this.entityId, enemyId)
        const currentTime = Date.now()
        if (dangle > -20 && dangle < 20 && currentTime - this.lastAttackTime > 2700) {
            this.describeAttackAction(actionsComponent, enemyId)
            this.lastAttackTime = currentTime
        }
        else if (range < this.attackRange - 150) {
            actionsComponent.nextActions.push(new WaitAction(this.entityId, 200))
            actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
        }
        else {
            const random = Math.floor(Math.random() * 10);
            const pangle = getAngleToTarget(this.entityId, enemyId)
            if (random <= 2) {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 500))
                actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 6) {
                if (pangle > 180) {
                    actionsComponent.nextActions.push(new WaitAction(this.entityId, 200))
                    actionsComponent.nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextActions.push(new WaitAction(this.entityId, 200))
                    actionsComponent.nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else if (random <= 7) {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 300))
                actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 500))
                actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 9 && dangle > -20 && dangle < 20) {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 500))
                if (pangle > 180) {
                    actionsComponent.nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 200))
            }
        }
    }

    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.valid(id) && revmp.isPlayer(id)
    }

    private describeAttackAction(actionsComponent: IActionsComponent, enemyId: number) {
        actionsComponent.nextActions.push(new WaitAction(this.entityId, 500))
        actionsComponent.nextActions.push(new SLeftAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextActions.push(new WaitAction(this.entityId, 150))
        actionsComponent.nextActions.push(new SRightAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextActions.push(new WaitAction(this.entityId, 150))
        actionsComponent.nextActions.push(new SLeftAttackAction(this.entityId, enemyId, this.attackRange))
    }

    private gotoStartPointOnDistance(aiState: AiState, distance: number) {
        const entityManager = aiState.getEntityManager();
        const startPoint = entityManager.getPositionsComponents(this.entityId)?.startPoint
        const startWayPoint = typeof startPoint !== 'undefined' ? aiState.getWaynet().waypoints.get(startPoint) : undefined
        let pointVec: revmp.Vec3 | undefined = undefined;

        if (typeof startWayPoint === 'undefined') {
            const startFreepoint = aiState.getWaynet().freepoints.find(fp => fp.fpName === startPoint)
            if (typeof startFreepoint !== 'undefined') {
                pointVec = [startFreepoint.x, startFreepoint.y, startFreepoint.z]
            }
        }
        else {
            pointVec = [startWayPoint.x, startWayPoint.y, startWayPoint.z]
        }


        if (typeof pointVec !== 'undefined' && typeof startPoint !== 'undefined' && getDistanceToPoint(this.entityId, pointVec) > distance) {
            const actionsComponent = entityManager.getActionsComponent(this.entityId)
            if (typeof actionsComponent !== 'undefined') {
                actionsComponent.nextActions.push(new GotoPoint(this.entityId, aiState, startPoint))
            }
        }
    }


    private describeRoamingRoutine(actionsComponent: IActionsComponent, aiState: AiState): void {
        //const random = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        aiState.getWaynetRegistry().unregisterCrimminal(this.entityId)
        actionsComponent.nextActions.push(new WaitAction(this.entityId, 60000))
        actionsComponent.nextActions.push(new PlayAnimation(this.entityId, "S_LGUARD"))
        const targetPoint = aiState.getWaynetRegistry().registerCrimminalAndGetPoint(this.entityId)
        console.log(targetPoint)
        revmp.addOverlay(this.entityId, "HumanS_Relaxed.mds")
        actionsComponent.nextActions.push(new GotoPoint(this.entityId, aiState, targetPoint))
    }

}
