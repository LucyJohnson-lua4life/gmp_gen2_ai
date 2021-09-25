
import { IActionDescription } from './iActionDescription';
import { getAngleToTarget, getDistance, getPlayerAngle, getDistanceToPoint } from "../aiFunctions/aiUtils";
import {
    SLeftAttackAction, SRightAttackAction,
    SRunParadeJump, SRunStrafeLeft, SRunStrafeRight,
    RunToTargetAction, WaitAction, TurnToTargetAction,
    WarnEnemy, WarnEnemyActionInput, GotoPoint
} from "../aiFunctions/commonActions";
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';
import { AiState } from '../aiStates/aiState';
import { IActionsComponent } from './components/iActionsComponent';

export class OnehandMasterAttackDescription implements IActionDescription {
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
        const npcActionUtils = new NpcActionUtils(aiState)
        const entityManager = aiState.getEntityManager()

        const enemyId = entityManager.getEnemyComponent(this.entityId)?.enemyId
        const actionsComponent = entityManager.getActionsComponent(this.entityId)

        const actionListSize = entityManager.getActionsComponent(this.entityId)?.nextActions.length
        if (typeof enemyId !== 'undefined' && this.enemyExists(enemyId)) {
            const range = getDistance(this.entityId, enemyId)
            if (range < 800 && typeof actionsComponent !== 'undefined' && typeof actionListSize !== 'undefined' && actionListSize < 5) {
                this.describeFightAction(actionsComponent, enemyId, range)
            }
        }
        else if (typeof actionListSize !== 'undefined' && actionListSize < 1) {
            //TODO: the world constant should only be fixed in later versions!
            const charId = npcActionUtils.getNearestCharacter(this.entityId, "NEWWORLD\\NEWWORLD.ZEN")
            let range = 99999999
            //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
            if (charId !== this.entityId && charId !== -1 && revmp.isPlayer(charId)) {
                range = getDistance(this.entityId, charId)
            }
            if (range < 500 && typeof actionsComponent !== 'undefined') {
                const warnInput: WarnEnemyActionInput = { aiId: this.entityId, enemyId: charId, waitTime: 10000, startTime: Date.now(), warnDistance: 400, attackDistance: 0, entityManager: entityManager }
                actionsComponent.nextActions.push(new WarnEnemy(warnInput))
            }
            else {
                this.gotoStartPointOnDistance(aiState, 500)
            }
        }
    }

    private describeFightAction(actionsComponent: IActionsComponent, enemyId: number, range: number): void {
        if (range > 300) {
            actionsComponent.nextActions.push(new RunToTargetAction(this.entityId, enemyId, 300))
        }
        else {
            this.describeWhenInRange(actionsComponent, enemyId, range)
        }
        actionsComponent.nextActions.push(new TurnToTargetAction(this.entityId, enemyId))
    }

    private describeWhenInRange(actionsComponent: IActionsComponent, enemyId: number, range: number): void {
        const dangle = getPlayerAngle(this.entityId) - getAngleToTarget(this.entityId, enemyId)
        const currentTime = Date.now()
        //this.setWeaponMode(this.entityId)
        if (dangle > -20 && dangle < 20 && currentTime - this.lastAttackTime > 3000) {
            this.describeAttackAction(actionsComponent, enemyId, range)
            this.lastAttackTime = currentTime
        }
        else if (range < this.attackRange - 150) {
            actionsComponent.nextActions.push(new WaitAction(this.entityId, 400, Date.now()))
            actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
        }
        else {
            const random = Math.floor(Math.random() * 10);
            const pangle = getAngleToTarget(this.entityId, enemyId)
            if (random < 2) {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 3) {
                if (pangle > 180) {
                    actionsComponent.nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                    actionsComponent.nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                    actionsComponent.nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else if (random <= 4) {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 300, Date.now()))
                actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 7 && dangle > -20 && dangle < 20) {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
                if (getAngleToTarget(this.entityId, enemyId) > 180) {
                    actionsComponent.nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else if (random <= 9 && dangle > -20 && dangle < 20) {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 200, Date.now()))
                if (getAngleToTarget(this.entityId, enemyId) > 180) {
                    actionsComponent.nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 500, Date.now()))
            }
        }
    }
    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.valid(id) && revmp.isPlayer(id)
    }

    private describeAttackAction(actionsComponent: IActionsComponent, enemyId: number, range: number) {
        actionsComponent.nextActions.push(new WaitAction(this.entityId, 1000, Date.now()))
        actionsComponent.nextActions.push(new SLeftAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextActions.push(new WaitAction(this.entityId, 300, Date.now()))
        actionsComponent.nextActions.push(new SRightAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextActions.push(new WaitAction(this.entityId, 300, Date.now()))
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

}
