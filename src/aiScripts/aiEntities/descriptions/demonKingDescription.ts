

import { IActionDescription } from './iActionDescription';
import { getDistance, getPlayerAngle, getDistanceToPoint } from "../../aiFunctions/aiUtils";
import {
    SLeftAttackAction, SRightAttackAction, SForwardAttackAction,
    SRunParadeJump, SRunStrafeLeft, SRunStrafeRight,
    RunToTargetAction, WaitAction, TurnToTargetAction,
    WarnEnemy, WarnEnemyActionInput, GotoPoint, PlayAnimation, SimpleAction
} from "../actions/commonActions";
import { NpcActionUtils } from '../../aiFunctions/npcActionUtils';
import { AiState } from '../../aiStates/aiState';

export class DemonKingDescription implements IActionDescription {
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
            //this.describeGeneralRoutine(aiState)
        }
    }

    /*
    private describeGeneralRoutine(aiState: AiState): void {
        const npcActionUtils = new NpcActionUtils(aiState)
        const entityManager = aiState.getEntityManager()

        const enemyId = entityManager.getEnemyComponent(this.entityId)?.enemyId
        const actionsComponent = entityManager.getActionsComponent(this.entityId)

        const actionListSize = entityManager.getActionsComponent(this.entityId)?.nextAction.length ?? 99999
        if (typeof enemyId !== 'undefined' && this.enemyExists(enemyId)) {
            const range = getDistance(this.entityId, enemyId)
            const isEnemyAlive = revmp.getHealth(enemyId).current > 0
            if (range < 800 && typeof actionsComponent !== 'undefined' && actionListSize < 5 && isEnemyAlive) {
                this.describeFightAction(aiState, enemyId, range)
            }
            else if (isEnemyAlive === false && typeof actionsComponent !== 'undefined') {
                revmp.putWeaponAway(this.entityId)
                actionsComponent.nextAction = []
                entityManager.deleteEnemyComponent(this.entityId)
            }
        }
        else if (typeof actionListSize !== 'undefined' && actionListSize < 1) {
            //TODO: the world constant should only be fixed in later versions!
            const charId = npcActionUtils.getNearestCharacter(this.entityId, "NEWWORLD\\NEWWORLD.ZEN")
            let range = 99999999
            //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
            if (charId !== this.entityId && charId !== -1 && revmp.isPlayer(charId) && revmp.getHealth(charId).current > 0) {
                range = getDistance(this.entityId, charId)
            }
            if (range < 500 && typeof actionsComponent !== 'undefined') {
                const warnInput: WarnEnemyActionInput = { aiId: this.entityId, enemyId: charId, waitTime: 10000, warnDistance: 400, attackDistance: 0, entityManager: entityManager }
                actionsComponent.nextAction.push(new WarnEnemy(warnInput))
                revmp.drawMeleeWeapon(this.entityId)
            }
            else {
                revmp.putWeaponAway(this.entityId)
                this.gotoStartPointOnDistance(aiState, 500)
            }
        }
    }
    private describeFightAction(aiState: AiState, enemyId: number, range: number): void {
        const entityManager = aiState.getEntityManager();
        const actionsComponent = entityManager?.getActionsComponent(this.entityId);
        if (revmp.getCombatState(this.entityId).weaponMode === revmp.WeaponMode.None) {
            revmp.drawMeleeWeapon(this.entityId)
        }
        if (typeof actionsComponent !== 'undefined' && range > this.attackRange) {
            actionsComponent.nextAction.push(new RunToTargetAction(this.entityId, enemyId))
        }
        else if (typeof actionsComponent !== 'undefined' && range > 800) {
            entityManager.deleteEnemyComponent(this.entityId)
        }
        else if (typeof actionsComponent !== 'undefined') {
            this.describeWhenInRange(actionsComponent, enemyId, range)
        }

        if (typeof actionsComponent !== 'undefined') {
            actionsComponent.nextAction.push(new TurnToTargetAction(this.entityId, enemyId))
        }
    }

    private describeWhenInRange(actionsComponent: IActionComponent, enemyId: number, range: number): void {
        const angleRange = Math.abs(getAngleToTarget(this.entityId, enemyId) - getAngleToTarget(enemyId, this.entityId))
        const isEntityInEnemyAngleRange = (angleRange < 180 + 20 || angleRange > 180 + 20)
        const currentTime = Date.now()
        if (isEntityInEnemyAngleRange && currentTime - this.lastAttackTime > 2700) {
            this.describeAttackAction(actionsComponent, enemyId)
            this.lastAttackTime = currentTime
        }
        else if (range < this.attackRange - 150) {
            actionsComponent.nextAction.push(new WaitAction(this.entityId, 200))
            actionsComponent.nextAction.push(new SRunParadeJump(this.entityId))
        }
        else {
            const random = Math.floor(Math.random() * 10);
            const pangle = getAngleToTarget(this.entityId, enemyId)
            if (random <= 2) {
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
                actionsComponent.nextAction.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 6) {
                if (pangle > 180) {
                    actionsComponent.nextAction.push(new WaitAction(this.entityId, 200))
                    actionsComponent.nextAction.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextAction.push(new WaitAction(this.entityId, 200))
                    actionsComponent.nextAction.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else if (random <= 7) {
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 300))
                actionsComponent.nextAction.push(new SRunParadeJump(this.entityId))
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
                actionsComponent.nextAction.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 9 && isEntityInEnemyAngleRange) {
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
                if (pangle > 180) {
                    actionsComponent.nextAction.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextAction.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else {
                actionsComponent.nextAction.push(new WaitAction(this.entityId, 200))
            }
        }
    }

    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.valid(id) && revmp.isPlayer(id)
    }

    private describeAttackAction(actionsComponent: IActionComponent, enemyId: number) {
        const random = Math.floor(Math.random() * 10);
        if (random < 5) {
            this.describeDoubleAttack(actionsComponent, enemyId)
        }
        else if (random < 6) {
            this.describeTripleAttack(actionsComponent, enemyId)
        }
        else {
            this.describeRandomTeleport(actionsComponent, enemyId)
        }
    }

    private describeTripleAttack(actionsComponent: IActionComponent, enemyId: number) {
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 700))
        actionsComponent.nextAction.push(new SForwardAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 1250))
        actionsComponent.nextAction.push(new SForwardAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 1400))
        actionsComponent.nextAction.push(new SForwardAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
    }


    private describeDoubleAttack(actionsComponent: IActionComponent, enemyId: number) {
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
        actionsComponent.nextAction.push(new SRightAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 700))
        actionsComponent.nextAction.push(new SForwardAttackAction(this.entityId, enemyId, this.attackRange))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
    }

    private describeRandomTeleport(actionsComponent: IActionComponent, enemyId: number) {
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 500))
        actionsComponent.nextAction.push(new SimpleAction(this.entityId, () => { this.teleportCharRandomly(actionsComponent, enemyId) }))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 300))
        actionsComponent.nextAction.push(new PlayAnimation(this.entityId, "T_IGETYOU"))
        actionsComponent.nextAction.push(new WaitAction(this.entityId, 300))
    }


    private teleportCharRandomly(actionsComponent: IActionComponent, enemyId: number) {
        const enemyPos: revmp.Vec3 | undefined = revmp.getPosition(enemyId).position
        if (typeof enemyPos !== 'undefined') {
            const enemyAngle = getPlayerAngle(enemyId)
            if (enemyAngle < 180) {
                revmp.setPosition(this.entityId, [enemyPos[0] - 250, enemyPos[1], enemyPos[2]])
            }
            else {
                revmp.setPosition(this.entityId, [enemyPos[0] + 250, enemyPos[1], enemyPos[2]])
            }

        }
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
                actionsComponent.nextAction.push(new GotoPoint(this.entityId, aiState, startPoint, "S_RUNL"))
            }
        }
    }
    */

}