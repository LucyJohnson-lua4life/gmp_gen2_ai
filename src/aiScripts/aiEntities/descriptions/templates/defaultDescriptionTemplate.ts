import { RunToTargetAction, TurnToTargetAction, WaitAction} from "../../actions/commonActions"
import { ParadeWithPause, StrafeRightWithPause, StrafeLeftWithPause, DoubleParadeWithPause, TripleQuickAttack, ForwardAttackWithPause } from "../../actions/fightActions"
import { getNecessaryAngleToWatchTarget, getDistance, hasMeleeWeapon, isAlive, removeAllAnimations} from "../../../aiFunctions/aiUtils"
import { AiState } from "../../../aiStates/aiState"
import { NpcActionUtils } from "../../../aiFunctions/npcActionUtils"
import { IAiAction } from "../../../aiEntities/iAiAction"
import { clearAction, setActionWhenUndefined } from "./commonDefaultTemplateDescriptionFunctions"
import { isOpponentinAiAngleRange } from "../../../aiStates/aiStateFunctions/commonAiStateQueries"
import { deleteEnemyComponent, getActionHistoryComponent, getActionsComponent, getAttackEventComponent, getEnemyComponent, setActionHistoryComponent } from "../../../aiStates/aiStateFunctions/commonAiStateFunctions"

const DEFAULT_ATTACK_RANGE = 300
const DEFAULT_WARN_RANGE = 500
const DEFAULT_CHASE_RANGE = 800 
const DEFAULT_ATTACK_FREQUENCY = 2700 
export interface IDefaultDescriptionTemplateValues {
    aiId: number
    aiState: AiState
    attackRange?: number
    warnRange?: number
    chaseRange?: number
    attackFrequency?: number
    onAiAttacks(values: IDefaultDescriptionTemplateValues): void
    onAiEnemyDies(values: IDefaultDescriptionTemplateValues): void
    onIdle(values: IDefaultDescriptionTemplateValues): void
    onEnemyInWarnRange(template: IDefaultDescriptionTemplateValues, warnableEnemyId: number): void
    onEnemyOutOfRange(values: IDefaultDescriptionTemplateValues): void
    onEnemyDisconnected(values: IDefaultDescriptionTemplateValues): void
    onAiIsAttacked(values: IDefaultDescriptionTemplateValues): void
}

export function describeGeneralRoutine(values: IDefaultDescriptionTemplateValues): void {
    const npcActionUtils = new NpcActionUtils(values.aiState)
    const enemyId = getEnemyComponent(values.aiState, values.aiId)?.enemyId ?? -1
    const nearestChar = getNearestCharacterRangeMapping(values.aiId, npcActionUtils)
    const actionsComponent = getActionsComponent(values.aiState, values.aiId)
    const attackEvent = getAttackEventComponent(values.aiState, values.aiId) ?? {isUnderAttack: false, attackedBy: -1}

    if (attackEvent.isUnderAttack) {
        values.onAiIsAttacked(values)
    }

    if (!isAlive(values.aiId)) {
        clearAction(actionsComponent)
        removeAllAnimations(values.aiId)
    }
    else if(enemyId !== -1 && !isExisting(enemyId)){
        deleteEnemyComponent(values.aiState, values.aiId)
        clearAction(actionsComponent)
        values.onEnemyDisconnected(values)
    }
    else if (isExisting(enemyId)) {
        const range = getDistance(values.aiId, enemyId)
        const nextAction = actionsComponent?.nextAction

        //is triggered when npc is attacked and not fighting mode yet e.g when warning
        if (typeof nextAction !== 'undefined' && !isFightAction(nextAction)) {
            clearAction(actionsComponent)
        }

        if (range < (values.chaseRange ?? DEFAULT_CHASE_RANGE) && isAlive(enemyId)) {
            describeFightMode(values, enemyId, range)
        }
        else if (isAlive(enemyId) === false) {
            clearAction(actionsComponent)
            deleteEnemyComponent(values.aiState, values.aiId)
            values.onAiEnemyDies(values)
        }
    }
    else if (nearestChar.distance < (values.warnRange ?? DEFAULT_WARN_RANGE) && isAlive(nearestChar.id)) {
        //TODO: the world constant should only be fixed in later versions!
        //TODO: currently only player will get attacked/warned, should implement a proper enemy/friend mapping
        values.onEnemyInWarnRange(values, nearestChar.id)
    }
    else {
        values.onIdle(values)
    }
}

function describeFightMode(values: IDefaultDescriptionTemplateValues, enemyId: number, rangeToEnemy: number): void {
    const actionsComponent = getActionsComponent(values.aiState, values.aiId);
    if (hasMeleeWeapon(values.aiId)) {
        revmp.drawMeleeWeapon(values.aiId)
    }

    if (typeof actionsComponent !== 'undefined' && rangeToEnemy > (values.attackRange ?? DEFAULT_ATTACK_RANGE)) {
        setActionWhenUndefined(actionsComponent, new RunToTargetAction(values.aiId, enemyId))
    }
    else if (rangeToEnemy > (values.chaseRange ?? DEFAULT_CHASE_RANGE)) {
        deleteEnemyComponent(values.aiState, values.aiId)
        clearAction(actionsComponent)
        values.onEnemyOutOfRange(values)
    }
    else if (typeof actionsComponent !== 'undefined') {
        describeFightMovements(values, enemyId, rangeToEnemy)
    }

    setActionWhenUndefined(actionsComponent, new TurnToTargetAction(values.aiId, enemyId))
   
}
function describeFightMovements(values: IDefaultDescriptionTemplateValues, enemyId: number, rangeToEnemy: number): void {
    const actionsComponent = getActionsComponent(values.aiState, values.aiId)
    const historyComponent = getActionHistoryComponent(values.aiState, values.aiId) ?? { entityId: values.aiId }
    const lastAttackTime = historyComponent.lastAttackTime ?? 0
    const currentTime = Date.now()
    const isOpponentInFrontOfAi = isOpponentinAiAngleRange(values.aiId, enemyId)

    if (isOpponentInFrontOfAi && currentTime - lastAttackTime > (values.attackFrequency ?? DEFAULT_ATTACK_FREQUENCY)) {
        values.onAiAttacks(values)
        historyComponent.lastAttackTime = currentTime
        setActionHistoryComponent(values.aiState, historyComponent)
    }
    else if (rangeToEnemy < 150) {
        setActionWhenUndefined(actionsComponent, new ParadeWithPause(values.aiId, 200))
    }
    else {
        const random = Math.floor(Math.random() * 10);
        if (random <= 1 && isOpponentInFrontOfAi) {
            setActionWhenUndefined(actionsComponent, new ParadeWithPause(values.aiId, 200))
        }
        else if (random <= 7 && isOpponentInFrontOfAi) {
            if (getNecessaryAngleToWatchTarget(values.aiId, enemyId) > 180) {
                setActionWhenUndefined(actionsComponent, new StrafeRightWithPause(values.aiId, 400))
            }
            else {
                setActionWhenUndefined(actionsComponent, new StrafeLeftWithPause(values.aiId, 400))
            }
        }
        else if (random <= 10 && isOpponentInFrontOfAi) {
            setActionWhenUndefined(actionsComponent, new WaitAction(values.aiId, 200))
        }
        else {
            setActionWhenUndefined(actionsComponent, new TurnToTargetAction(values.aiId, enemyId))
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

function isFightAction(action: IAiAction | undefined) {
    return typeof action !== 'undefined' && (action instanceof StrafeLeftWithPause
        || action instanceof StrafeRightWithPause
        || action instanceof ParadeWithPause
        || action instanceof DoubleParadeWithPause
        || action instanceof ForwardAttackWithPause
        || action instanceof TripleQuickAttack)
}
