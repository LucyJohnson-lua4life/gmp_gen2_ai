import { getAngleToTarget, getDistance } from "../../aiFunctions/aiUtils";
import { NpcActionUtils } from "../../aiFunctions/npcActionUtils";
import { AiState } from "../aiState";

export function playerEnemyExists(aiId: number, aiState: AiState): boolean {
    const enemyId = aiState.getEntityManager().getEnemyComponent(aiId)?.enemyId ?? -1
    return enemyId >= 0 && revmp.valid(enemyId) && revmp.isPlayer(enemyId)
}


export function livingEnemyIsInRange(aiId: number, enemyId: number, rangeLimit: number): boolean {
    const isEnemyAlive = revmp.getHealth(enemyId).current > 0
    const currentRange = getDistance(aiId, enemyId)
    return currentRange < rangeLimit && isEnemyAlive
}

export function enemyIsAlive(enemyId: number): boolean {
     return revmp.getHealth(enemyId).current > 0
}


export function warnablePlayerIsNearby(aiId: number, utils: NpcActionUtils): boolean {
    const characterRangeMap = utils.getNearestCharacterRangeMapping(aiId, "NEWWORLD\\NEWWORLD.ZEN")
    return characterRangeMap[1] < 500 && revmp.getHealth(characterRangeMap[0]).current > 0
}

export function isAiInOpponentAngleRange(aiId: number, enemyId: number) {
    const angleRange = Math.abs(getAngleToTarget(aiId, enemyId) - getAngleToTarget(enemyId, aiId))
    return (angleRange < 180 + 20 || angleRange > 180 - 20)
}