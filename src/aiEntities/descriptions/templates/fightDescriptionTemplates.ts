import { RunToTargetAction, TurnToTargetAction, WaitAction, WarnEnemy, WarnEnemyActionInput } from "../../../aiEntities/actions/commonActions"
import { ParadeWithPause, StrafeRightWithPause, StrafeLeftWithPause, DoubleParadeWithPause } from "../../..//aiEntities/actions/fightActions"
import { getAngleToTarget, getDistance } from "../../../aiFunctions/aiUtils"
import { AiState } from "../../../aiStates/aiState"
import { NpcActionUtils } from "../../../aiFunctions/npcActionUtils"
import { IActionsComponent } from "../../../aiEntities/components/iActionsComponent"

//TODO: make range constants dynamic 
export interface IDefaultDescriptionTemplateValues {
    fighterId: number
    aiState: AiState
    necessaryRange: number
    onAiAttacks(template: IDefaultDescriptionTemplateValues): void
    onAiEnemyDied(template: IDefaultDescriptionTemplateValues): void
    onIdle(template: IDefaultDescriptionTemplateValues): void
}

export function describeFightMovements(template: IDefaultDescriptionTemplateValues, enemyId:number, rangeToEnemy:number): void {
    const entityManager = template.aiState.getEntityManager()
    const actionsComponent = entityManager.getActionsComponent(template.fighterId)

    const lastAttackTime = entityManager.getEnemyComponent(template.fighterId)?.lastAttackTime ?? 0

    const currentTime = Date.now()
    const angleRange = Math.abs(getAngleToTarget(template.fighterId, enemyId) - getAngleToTarget(enemyId, template.fighterId))
    const isEntityInEnemyAngleRange = (angleRange < 180 + 20 || angleRange > 180 - 20)
    if (isEntityInEnemyAngleRange && currentTime - lastAttackTime > 2700) {
        //this.describeAttackAction(actionsComponent, enemyId)
        template.onAiAttacks(template)
        entityManager.setEnemyComponent(template.fighterId, { entityId: template.fighterId, enemyId: enemyId, lastAttackTime: currentTime })
    }
    else if (rangeToEnemy < template.necessaryRange - 150) {
        actionsComponent?.nextActions.push(new ParadeWithPause(template.fighterId, 200))
    }
    else {
        const random = Math.floor(Math.random() * 10);
        const pangle = getAngleToTarget(template.fighterId, enemyId)
        if (random <= 3) {
            actionsComponent?.nextActions.push(new ParadeWithPause(template.fighterId, 500))
        }
        else if (random <= 5) {
            if (pangle > 180) {
                actionsComponent?.nextActions.push(new StrafeRightWithPause(template.fighterId, 200))
            }
            else {
                actionsComponent?.nextActions.push(new StrafeLeftWithPause(template.fighterId, 200))
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

export function describeFightAction(template: IDefaultDescriptionTemplateValues, enemyId:number, rangeToEnemy:number): void {
    const entityManager = template.aiState.getEntityManager();
    const actionsComponent = entityManager?.getActionsComponent(template.fighterId);

    if (revmp.getCombatState(template.fighterId).weaponMode === revmp.WeaponMode.None) {
        revmp.setCombatState(template.fighterId, { weaponMode: revmp.WeaponMode.Fist })
    }

    if (typeof actionsComponent !== 'undefined' && rangeToEnemy > template.necessaryRange) {
        actionsComponent.nextActions.push(new RunToTargetAction(template.fighterId, enemyId))
    }
    else if (rangeToEnemy > 800) {
        entityManager.deleteEnemyComponent(template.fighterId)
    }
    else if (typeof actionsComponent !== 'undefined') {
        describeFightMovements(template,enemyId, rangeToEnemy)
        //this.describeWhenInRange(actionsComponent, template.enemyId, range)
    }
    if (typeof actionsComponent !== 'undefined') {
        actionsComponent.nextActions.push(new TurnToTargetAction(template.fighterId, enemyId))
    }
}

export function describeGeneralRoutine(template: IDefaultDescriptionTemplateValues): void {
    const npcActionUtils = new NpcActionUtils(template.aiState)
    const entityManager = template.aiState.getEntityManager()
    const enemyId = entityManager.getEnemyComponent(template.fighterId)?.enemyId ?? -1
    const nextActions = entityManager.getActionsComponent(template.fighterId)?.nextActions ?? []
    const actionListSize = nextActions?.length ?? 999999
    const nearestChar = getNearestCharacterRangeMapping(template.fighterId, npcActionUtils)
    const actionsComponent = entityManager.getActionsComponent(template.fighterId)


    if (isExisting(enemyId)) {
        const range = getDistance(template.fighterId, enemyId)
        if (range < 800 && isAlive(enemyId)) {
            describeFightAction(template, enemyId, range)
        }
        else if (isAlive(enemyId) === false) {
            clearActionList(actionsComponent)
            entityManager.deleteEnemyComponent(template.fighterId)
        }
    }
    else if (nearestChar.distance < 500 && isAlive(nearestChar.id)) {
        //TODO: the world constant should only be fixed in later versions!
        //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
        const warnInput: WarnEnemyActionInput = {
            aiId: template.fighterId,
            enemyId: nearestChar.id,
            waitTime: 3000,
            warnDistance: 400,
            attackDistance: 0,
            entityManager: entityManager
        }

        if (typeof actionsComponent !== 'undefined') {
            clearActionList(actionsComponent)
            actionsComponent.nextActions.push(new WarnEnemy(warnInput))
            revmp.drawMeleeWeapon(template.fighterId)
        }
    }
    else if (actionListSize < 1) {
        //this.describeEatRoutine(entityManager)
        //this.gotoStartPointOnDistance(aiState, 500)
        template.onIdle(template)
    }
}

interface INearestCharacter {
    id: number,
    distance: number
}

function getNearestCharacterRangeMapping(entityId: number, npcActionUtils: NpcActionUtils): INearestCharacter {
    const charId = npcActionUtils.getNearestCharacter(entityId, "NEWWORLD\\NEWWORLD.ZEN")
    let range = 99999999
    if (charId !== entityId && charId !== -1 && revmp.isPlayer(charId)) {
        range = getDistance(entityId, charId)
    }
    return { id: charId, distance: range }
}

function isExisting(id: number): boolean {
    return id >= 0 && revmp.valid(id) && revmp.isPlayer(id)
}

function isAlive(id: number): boolean {
    return revmp.getHealth(id).current > 0
}

function clearActionList(actionsComponent: IActionsComponent| undefined): void {
    if (typeof actionsComponent !== 'undefined') {
        actionsComponent.nextActions = []
    }
}