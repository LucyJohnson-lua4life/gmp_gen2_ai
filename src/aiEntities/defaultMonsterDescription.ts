
import { IActionDescription } from './iActionDescription';
import { EntityManager } from '../aiStates/entityManager';
import { getAngleToTarget, getDistance, getPlayerAngle, getDistanceToPoint } from "../aiFunctions/aiUtils";
import {
    PlayAnimationForDuration, SForwardAttackAction,
    SRunParadeJump, SRunStrafeLeft, SRunStrafeRight,
    RunToTargetAction, WaitAction, TurnToTargetAction,
    WarnEnemy, WarnEnemyActionInput, GotoPoint, SimpleAction
} from "../aiFunctions/commonActions";
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';
import { AiState } from '../aiStates/aiState';
import { IActionsComponent } from './components/iActionsComponent';

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
        if (revmp.valid(this.entityId)) {
            this.describeGeneralRoutine(aiState)
        }
    }

    private describeGeneralRoutine(aiState: AiState): void {
        const npcActionUtils = new NpcActionUtils(aiState)
        const entityManager = aiState.getEntityManager()
        const enemyId = entityManager.getEnemyComponent(this.entityId)?.enemyId ?? -1
        const nextActions = entityManager.getActionsComponent(this.entityId)?.nextActions ?? []
        const actionListSize = nextActions?.length ?? 999999
        const characterRangeMap = this.getNearestCharacterRangeMapping(npcActionUtils)



        if (this.enemyExists(enemyId)) {
            const range = getDistance(this.entityId, enemyId)
            if (range < 800 && typeof actionListSize !== 'undefined' && actionListSize < 5) {
                this.describeFightAction(aiState, enemyId, range)
            }
        }

        else if (actionListSize <= 3 && characterRangeMap[1] < 500 && revmp.getHealth(characterRangeMap[0]).current > 0 && !nextActions.some(action => action instanceof WarnEnemy)) {
            //TODO: the world constant should only be fixed in later versions!
            //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
            const warnInput: WarnEnemyActionInput = { aiId: this.entityId, enemyId: characterRangeMap[0], waitTime: 3000, warnDistance: 400, attackDistance: 0, entityManager: entityManager }
            const actionsComponent = entityManager.getActionsComponent(this.entityId)
            if (typeof actionsComponent !== 'undefined') {
                this.clearActionList(actionsComponent)
                actionsComponent.nextActions.push(new WarnEnemy(warnInput))
                revmp.drawMeleeWeapon(this.entityId)
            }
        }
        else if (actionListSize < 1) {
            this.describeEatRoutine(entityManager)
            this.gotoStartPointOnDistance(aiState, 500)
        }
    }

    private getNearestCharacterRangeMapping(npcActionUtils: NpcActionUtils): [number, number] {
        const charId = npcActionUtils.getNearestCharacter(this.entityId, "NEWWORLD\\NEWWORLD.ZEN")
        let range = 99999999
        if (charId !== this.entityId && charId !== -1 && revmp.isPlayer(charId)) {
            range = getDistance(this.entityId, charId)
        }
        return [charId, range]
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
                actionsComponent.nextActions.push(new GotoPoint(this.entityId, aiState, startPoint, "S_RUNL"))
                actionsComponent.nextActions.push(new SimpleAction(this.entityId, () => {
                    revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.Fist })
                }))
            }
        }
    }

    private describeFightAction(aiState: AiState, enemyId: number, range: number): void {
        const entityManager = aiState.getEntityManager();
        const actionsComponent = entityManager?.getActionsComponent(this.entityId);

        if (revmp.getCombatState(this.entityId).weaponMode === revmp.WeaponMode.None) {
            revmp.setCombatState(this.entityId, { weaponMode: revmp.WeaponMode.Fist })
        }

        if (typeof actionsComponent !== 'undefined' && range > this.attackRange) {
            actionsComponent.nextActions.push(new RunToTargetAction(this.entityId, enemyId, this.attackRange))
        }
        else if (range > 800) {
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
            if (random <= 3) {
                actionsComponent.nextActions.push(new WaitAction(this.entityId, 500))
                actionsComponent.nextActions.push(new SRunParadeJump(this.entityId))
            }
            else if (random <= 5) {
                if (pangle > 180) {
                    actionsComponent.nextActions.push(new WaitAction(this.entityId, 200))
                    actionsComponent.nextActions.push(new SRunStrafeRight(this.entityId))
                }
                else {
                    actionsComponent.nextActions.push(new WaitAction(this.entityId, 200))
                    actionsComponent.nextActions.push(new SRunStrafeLeft(this.entityId))
                }
            }
            else if (random <= 6) {
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

    private describeAttackAction(actionsComponent: IActionsComponent, enemyId: number) {
        actionsComponent.nextActions.push(new WaitAction(this.entityId, 500))
        actionsComponent.nextActions.push(new SForwardAttackAction(this.entityId, enemyId, this.attackRange))
    }
    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.valid(id) && revmp.isPlayer(id)
    }

    private describeEatRoutine(entityManager: EntityManager): void {
        const actionsComponent = entityManager.getActionsComponent(this.entityId)
        if (typeof actionsComponent !== 'undefined') {
            const random = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

            actionsComponent.nextActions.push(new WaitAction(this.entityId, 4000))
            actionsComponent.nextActions.push(new PlayAnimationForDuration(this.entityId, "S_EAT", random * 1000))
            actionsComponent.nextActions.push(new PlayAnimationForDuration(this.entityId, "T_STAND_2_EAT", 2000))
        }
    }

    private clearActionList(actionsComponent: IActionsComponent): void {
        if (typeof actionsComponent !== 'undefined') {
            actionsComponent.nextActions = []
        }
    }
}

