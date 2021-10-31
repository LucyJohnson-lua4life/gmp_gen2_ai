import { RunToTargetAction, TurnToTargetAction, WaitAction, WarnEnemy, WarnEnemyActionInput } from "../../../aiEntities/actions/commonActions"
import { ParadeWithPause, StrafeRightWithPause, StrafeLeftWithPause, DoubleParadeWithPause, TripleQuickAttack, ForwardAttackWithPause } from "../../..//aiEntities/actions/fightActions"
import { getAngleToTarget, getDistance } from "../../../aiFunctions/aiUtils"
import { AiState } from "../../../aiStates/aiState"
import { NpcActionUtils } from "../../../aiFunctions/npcActionUtils"
import { IActionComponent } from "../../../aiEntities/components/iActionsComponent"
import { IAiAction } from "src/aiEntities/iAiAction"

//TODO: make range constants dynamic 
export interface IDefaultDescriptionTemplateValues {
    fighterId: number
    aiState: AiState
    necessaryRange: number
    onAiAttacks(template: IDefaultDescriptionTemplateValues): void
    onAiEnemyDied(template: IDefaultDescriptionTemplateValues): void
    onIdle(template: IDefaultDescriptionTemplateValues): void
}

export function describeGeneralRoutine(template: IDefaultDescriptionTemplateValues): void {
    const npcActionUtils = new NpcActionUtils(template.aiState)
    const entityManager = template.aiState.getEntityManager()
    const enemyId = entityManager.getEnemyComponent(template.fighterId)?.enemyId ?? -1
    const nextAction = entityManager.getActionsComponent(template.fighterId)?.nextAction
    const nearestChar = getNearestCharacterRangeMapping(template.fighterId, npcActionUtils)
    const actionsComponent = entityManager.getActionsComponent(template.fighterId)


    if (isExisting(enemyId)) {
        const range = getDistance(template.fighterId, enemyId)
        const actionsComponent = template.aiState.getEntityManager().getActionsComponent(template.fighterId)
        const nextAction = actionsComponent?.nextAction

        //is triggered when npc is attacked and not fighting yet e.g when warning
        if (typeof nextAction !== 'undefined' && !isFightAction(nextAction)) {
            clearAction(actionsComponent)
        }

        if (range < 800 && isAlive(enemyId)) {
            describeFightMode(template, enemyId, range)
        }
        else if (isAlive(enemyId) === false) {
            clearAction(actionsComponent)
            entityManager.deleteEnemyComponent(template.fighterId)
            template.onAiEnemyDied(template)
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

        if (typeof actionsComponent !== 'undefined' && !(nextAction instanceof WarnEnemy)) {
            clearAction(actionsComponent)
            setActionWhenUndefined(actionsComponent, new WarnEnemy(warnInput))
            revmp.drawMeleeWeapon(template.fighterId)
        }
    }
    else {
        template.onIdle(template)
    }
}

function describeFightMode(template: IDefaultDescriptionTemplateValues, enemyId: number, rangeToEnemy: number): void {
    const entityManager = template.aiState.getEntityManager();
    const actionsComponent = entityManager?.getActionsComponent(template.fighterId);

    if (typeof actionsComponent !== 'undefined' && rangeToEnemy > template.necessaryRange) {
        setActionWhenUndefined(actionsComponent, new RunToTargetAction(template.fighterId, enemyId))
    }
    else if (rangeToEnemy > 800) {
        entityManager.deleteEnemyComponent(template.fighterId)
    }
    else if (typeof actionsComponent !== 'undefined') {
        describeFightMovements(template, enemyId, rangeToEnemy)
    }
    if (typeof actionsComponent !== 'undefined') {
        setActionWhenUndefined(actionsComponent, new TurnToTargetAction(template.fighterId, enemyId))
    }
}
function describeFightMovements(template: IDefaultDescriptionTemplateValues, enemyId: number, rangeToEnemy: number): void {
    const entityManager = template.aiState.getEntityManager()
    const actionsComponent = entityManager.getActionsComponent(template.fighterId)
    const lastAttackTime = entityManager.getEnemyComponent(template.fighterId)?.lastAttackTime ?? 0
    const currentTime = Date.now()
    const angleRange = Math.abs(getAngleToTarget(template.fighterId, enemyId) - getAngleToTarget(enemyId, template.fighterId))
    const isEntityInEnemyAngleRange = (angleRange < 180 + 20 || angleRange > 180 - 20)
    if (isEntityInEnemyAngleRange && currentTime - lastAttackTime > 2700) {
        template.onAiAttacks(template)
        entityManager.setEnemyComponent(template.fighterId, { entityId: template.fighterId, enemyId: enemyId, lastAttackTime: currentTime })
    }
    else if (rangeToEnemy < 150) {
        setActionWhenUndefined(actionsComponent, new ParadeWithPause(template.fighterId, 200))
    }
    else {
        const random = Math.floor(Math.random() * 10);
        const pangle = getAngleToTarget(template.fighterId, enemyId)
        if (random <= 3) {
            setActionWhenUndefined(actionsComponent, new ParadeWithPause(template.fighterId, 500))
        }
        else if (random <= 5) {
            if (pangle > 180) {
                setActionWhenUndefined(actionsComponent, new StrafeRightWithPause(template.fighterId, 200))
            }
            else {
                setActionWhenUndefined(actionsComponent, new StrafeLeftWithPause(template.fighterId, 200))
            }
        }
        else if (random <= 6) {
            setActionWhenUndefined(actionsComponent, new DoubleParadeWithPause(template.fighterId, 300))
        }
        else if (random <= 9 && isEntityInEnemyAngleRange) {
            if (pangle > 180) {
                setActionWhenUndefined(actionsComponent, new StrafeRightWithPause(template.fighterId, 500))
            }
            else {
                setActionWhenUndefined(actionsComponent, new StrafeLeftWithPause(template.fighterId, 500))
            }
        }
        else {
            setActionWhenUndefined(actionsComponent, new WaitAction(template.fighterId, 200))
        }
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

function clearAction(actionsComponent: IActionComponent | undefined): void {
    if (typeof actionsComponent !== 'undefined') {
        actionsComponent.nextAction = undefined
    }
}

function setActionWhenUndefined(actionComponent: IActionComponent | undefined, action: IAiAction | undefined) {
    if (typeof actionComponent !== 'undefined' && typeof action !== 'undefined' && typeof actionComponent.nextAction === 'undefined') {
        actionComponent.nextAction = action
    }
}

function isFightAction(action: IAiAction | undefined) {
    return typeof action !== 'undefined' && (action instanceof StrafeLeftWithPause
        || action instanceof StrafeRightWithPause
        || action instanceof ParadeWithPause
        || action instanceof DoubleParadeWithPause
        || action instanceof ForwardAttackWithPause
        || action instanceof TripleQuickAttack)

}