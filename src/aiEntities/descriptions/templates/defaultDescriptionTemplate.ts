import { RunToTargetAction, TurnToTargetAction, WaitAction, WarnEnemy, WarnEnemyActionInput } from "../../actions/commonActions"
import { ParadeWithPause, StrafeRightWithPause, StrafeLeftWithPause, DoubleParadeWithPause, TripleQuickAttack, ForwardAttackWithPause } from "../../actions/fightActions"
import { getAngleToTarget, getDistance, removeAllAnimations } from "../../../aiFunctions/aiUtils"
import { AiState } from "../../../aiStates/aiState"
import { NpcActionUtils } from "../../../aiFunctions/npcActionUtils"
import { IAiAction } from "src/aiEntities/iAiAction"
import { clearAction, setActionWhenUndefined } from "./commonDefaultTemplateDescriptionFunctions"

//TODO: make range constants dynamic 
export interface IDefaultDescriptionTemplateValues {
    aiId: number
    aiState: AiState
    necessaryRange: number
    onAiAttacks(template: IDefaultDescriptionTemplateValues): void
    onAiEnemyDies(template: IDefaultDescriptionTemplateValues): void
    onIdle(template: IDefaultDescriptionTemplateValues): void
    onEnemyInWarnRange(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number): void
}

export function describeGeneralRoutine(values: IDefaultDescriptionTemplateValues): void {
    const npcActionUtils = new NpcActionUtils(values.aiState)
    const entityManager = values.aiState.getEntityManager()
    const enemyId = entityManager.getEnemyComponent(values.aiId)?.enemyId ?? -1
    const nearestChar = getNearestCharacterRangeMapping(values.aiId, npcActionUtils)
    const actionsComponent = values.aiState.getEntityManager().getActionsComponent(values.aiId)

    if (!isAlive(values.aiId)) {
        clearAction(actionsComponent)
        removeAllAnimations(values.aiId)
    }
    else if (isExisting(enemyId)) {
        const range = getDistance(values.aiId, enemyId)
        const nextAction = actionsComponent?.nextAction

        //is triggered when npc is attacked and not fighting yet e.g when warning
        if (typeof nextAction !== 'undefined' && !isFightAction(nextAction)) {
            clearAction(actionsComponent)
        }

        if (range < 800 && isAlive(enemyId)) {
            describeFightMode(values, enemyId, range)
        }
        else if (isAlive(enemyId) === false) {
            clearAction(actionsComponent)
            entityManager.deleteEnemyComponent(values.aiId)
            values.onAiEnemyDies(values)
        }
    }
    else if (nearestChar.distance < 500 && isAlive(nearestChar.id)) {
        //TODO: the world constant should only be fixed in later versions!
        //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
        values.onEnemyInWarnRange(values, nearestChar.id)
    }
    else {
        values.onIdle(values)
    }
}

function describeFightMode(template: IDefaultDescriptionTemplateValues, enemyId: number, rangeToEnemy: number): void {
    const entityManager = template.aiState.getEntityManager();
    const actionsComponent = entityManager?.getActionsComponent(template.aiId);
    if (hasMeleeWeapon(template.aiId)) {
        revmp.drawMeleeWeapon(template.aiId)
    }

    if (typeof actionsComponent !== 'undefined' && rangeToEnemy > template.necessaryRange) {
        setActionWhenUndefined(actionsComponent, new RunToTargetAction(template.aiId, enemyId))
    }
    else if (rangeToEnemy > 800) {
        entityManager.deleteEnemyComponent(template.aiId)
    }
    else if (typeof actionsComponent !== 'undefined') {
        describeFightMovements(template, enemyId, rangeToEnemy)
    }
    if (typeof actionsComponent !== 'undefined') {
        setActionWhenUndefined(actionsComponent, new TurnToTargetAction(template.aiId, enemyId))
    }
}
function describeFightMovements(template: IDefaultDescriptionTemplateValues, enemyId: number, rangeToEnemy: number): void {
    const entityManager = template.aiState.getEntityManager()
    const actionsComponent = entityManager.getActionsComponent(template.aiId)
    const historyComponent = entityManager.getActionHistoryComponent(template.aiId) ?? { entityId: template.aiId }
    const lastAttackTime = historyComponent.lastAttackTime ?? 0
    const currentTime = Date.now()
    const angleRange = Math.abs(getAngleToTarget(template.aiId, enemyId) - getAngleToTarget(enemyId, template.aiId))
    const isEntityInEnemyAngleRange = (angleRange < 180 + 20 || angleRange > 180 - 20)

    if (isEntityInEnemyAngleRange && currentTime - lastAttackTime > 2700) {
        template.onAiAttacks(template)
        historyComponent.lastAttackTime = currentTime
        entityManager.setActionHistoryComponent(template.aiId, historyComponent)
    }
    else if (rangeToEnemy < 150) {
        setActionWhenUndefined(actionsComponent, new ParadeWithPause(template.aiId, 200))
    }
    else {
        const random = Math.floor(Math.random() * 10);
        const pangle = getAngleToTarget(template.aiId, enemyId)
        if (random <= 3) {
            setActionWhenUndefined(actionsComponent, new ParadeWithPause(template.aiId, 500))
        }
        else if (random <= 5) {
            if (pangle > 180) {
                setActionWhenUndefined(actionsComponent, new StrafeRightWithPause(template.aiId, 200))
            }
            else {
                setActionWhenUndefined(actionsComponent, new StrafeLeftWithPause(template.aiId, 200))
            }
        }
        else if (random <= 6) {
            setActionWhenUndefined(actionsComponent, new DoubleParadeWithPause(template.aiId, 300))
        }
        else if (random <= 9 && isEntityInEnemyAngleRange) {
            if (pangle > 180) {
                setActionWhenUndefined(actionsComponent, new StrafeRightWithPause(template.aiId, 500))
            }
            else {
                setActionWhenUndefined(actionsComponent, new StrafeLeftWithPause(template.aiId, 500))
            }
        }
        else {
            setActionWhenUndefined(actionsComponent, new WaitAction(template.aiId, 200))
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

function hasMeleeWeapon(entityId: number): boolean {
    return revmp.valid(revmp.getEquipment(entityId).meleeWeapon)
}

function isFightAction(action: IAiAction | undefined) {
    return typeof action !== 'undefined' && (action instanceof StrafeLeftWithPause
        || action instanceof StrafeRightWithPause
        || action instanceof ParadeWithPause
        || action instanceof DoubleParadeWithPause
        || action instanceof ForwardAttackWithPause
        || action instanceof TripleQuickAttack)
}