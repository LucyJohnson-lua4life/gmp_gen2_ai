import { IAiDialogue } from "src/aiScripts/aiEntities/components/iAiDialogue"
import { IAiAction } from "src/aiScripts/aiEntities/iAiAction"
import { IAiActionDescriptions } from "../../aiEntities/components/iAiActionDescriptions"
import { IAiActionHistory } from "../../aiEntities/components/iAiActionHistory"
import { IAiAttackEventInfo } from "../../aiEntities/components/iAiAttackEventInfo"
import { IAiDailyRoutineInfo } from "../../aiEntities/components/iAiDailyRoutineInfo"
import { IAiEnemyInfo } from "../../aiEntities/components/iAiEnemyInfo"
import { IAiNpcStatus } from "../../aiEntities/components/iAiNpcStatus"
import { IAiNpcTags } from "../../aiEntities/components/iAiNpcTags"
import { IAiPosition } from "../../aiEntities/components/iAiPosition"
import { IAiRespawnInfo } from "../../aiEntities/components/iAiRespawnInfo"
import { IAiNpc } from "../../aiEntities/iAiNpc"
import { IWaynet } from "../../waynet/iwaynet"
import { AiState } from "../aiState"
import { IWorldEventState } from "../waynetRegistries/iWorldEventState"
import { WaynetRegistry } from "../waynetRegistries/waynetRegistry"

export function getAiDailyRoutineInfo(aiState: AiState, entityId: number): IAiDailyRoutineInfo | undefined {
    return aiState.aiDailyRoutineInfos.get(entityId);
}

export function setAiDailyRoutineInfo(aiState: AiState, component: IAiDailyRoutineInfo) {
    aiState.aiDailyRoutineInfos.set(component.entityId, component)
}

export function getAiAction(aiState: AiState, entityId: number): IAiAction | undefined {
    return aiState.aiActions.get(entityId);
}

export function setAiActionIfUndefined(aiState: AiState, component: IAiAction) {
    if(typeof aiState.aiActions.get(component.aiId) === 'undefined'){
        aiState.aiActions.set(component.aiId, component)
    }
}

export function deleteAiAction(aiState: AiState, aiid: number) {
    aiState.aiActions.delete(aiid)
}

export function getAiActionDescriptions(aiState: AiState, entityId: number): IAiActionDescriptions | undefined {
    return aiState.aiActionsDescriptions.get(entityId);
}

export function setAiActionDescriptions(aiState: AiState, component: IAiActionDescriptions) {
    aiState.aiActionsDescriptions.set(component.entityId, component)
}

export function getAiPosition(aiState: AiState, entityId: number): IAiPosition | undefined {
    return aiState.aiPositions.get(entityId);
}

export function setAiPosition(aiState: AiState, component: IAiPosition) {
    aiState.aiPositions.set(component.entityId, component)
}

export function getAiNpcStatus(aiState: AiState, entityId: number): IAiNpcStatus | undefined {
    return aiState.aiNpcStatus.get(entityId);
}
export function setAiNpcStatus(aiState: AiState, component: IAiNpcStatus) {
    aiState.aiNpcStatus.set(component.entityId, component)
}

export function getAiRespawnInfo(aiState: AiState, entityId: number): IAiRespawnInfo | undefined {
    return aiState.aiRespawnInfos.get(entityId);
}

export function setAiRespawnInfo(aiState: AiState, component: IAiRespawnInfo) {
    aiState.aiRespawnInfos.set(component.entityId, component)
}

export function getAiEnemyInfo(aiState: AiState, entityId: number): IAiEnemyInfo | undefined {
    return aiState.aiEnemyInfos.get(entityId);
}

export function setAiEnemyInfo(aiState: AiState, component: IAiEnemyInfo) {
    aiState.aiEnemyInfos.set(component.entityId, component)
}
export function deleteAiEnemyInfo(aiState: AiState, entityId: number) {
    aiState.aiEnemyInfos.delete(entityId)
}

export function getAiActionHistory(aiState: AiState, entityId: number): IAiActionHistory | undefined {
    return aiState.aiActionsHistories.get(entityId);
}
export function setAiActionHistory(aiState: AiState, component: IAiActionHistory) {
    aiState.aiActionsHistories.set(component.entityId, component)
}
export function getAiAttackEventInfo(aiState: AiState, entityId: number): IAiAttackEventInfo | undefined {
    return aiState.aiAttackEventInfos.get(entityId);
}
export function setAiAttackEventInfo(aiState: AiState, component: IAiAttackEventInfo) {
    aiState.aiAttackEventInfos.set(component.entityId, component)
}
export function getAiNpcTags(aiState: AiState, entityId: number): IAiNpcTags | undefined {
    return aiState.aiNpcTags.get(entityId);
}
export function setAiNpcTags(aiState: AiState, component: IAiNpcTags) {
    aiState.aiNpcTags.set(component.entityId, component)
}

export function getAiDialogue(aiState: AiState, entityId: number): IAiDialogue | undefined {
    return aiState.aiDialogues.get(entityId);
}
export function setAiDialouge(aiState: AiState, component: IAiDialogue) {
    aiState.aiDialogues.set(component.entityId, component)
}

export function insertBot(aiState: AiState, npc: IAiNpc): void {
    const stateInfo: IAiNpcStatus = { entityId: npc.id, isDead: false, isUnconscious: false, npcInstance: npc.npcInstance }
    const respawnInfo: IAiRespawnInfo = { entityId: npc.id, respawnTime: npc.respawnTime, deathTime: -1 }
    const positionInfo: IAiPosition = { entityId: npc.id, currentPosX: 0, currentPosY: 0, currentPosZ: 0, lastPosX: 0, lastPosY: 0, lastPosZ: 0, lastPosUpdate: 0, startWorld: npc.startWorld, startPoint: npc.startPoint }
    const actionDescription: IAiActionDescriptions = { entityId: npc.id, descriptions: npc.actionDescriptions }
    const actionHistory: IAiActionHistory = { entityId: npc.id, lastAttackTime: 0 }
    const attackEvent: IAiAttackEventInfo = { entityId: npc.id, isUnderAttack: false, attackedBy: -1 }
    const npcTags: IAiNpcTags = { entityId: npc.id, tags: npc.aiTags }
    const npcDialogue: IAiDialogue = {entityId: npc.id, dialogues: npc.dialogues}

    setAiNpcStatus(aiState, stateInfo)
    setAiRespawnInfo(aiState, respawnInfo)
    setAiPosition(aiState, positionInfo)
    setAiActionDescriptions(aiState, actionDescription)
    setAiActionHistory(aiState, actionHistory)
    setAiAttackEventInfo(aiState, attackEvent)
    setAiNpcTags(aiState, npcTags)
    setAiDialouge(aiState, npcDialogue)
}

export function deleteBot(aiState: AiState, npcId: number): void {
    aiState.aiDailyRoutineInfos.delete(npcId)
    aiState.aiActions.delete(npcId)
    aiState.aiActionsDescriptions.delete(npcId)
    aiState.aiPositions.delete(npcId)
    aiState.aiNpcStatus.delete(npcId)
    aiState.aiRespawnInfos.delete(npcId)
    aiState.aiEnemyInfos.delete(npcId)
    aiState.aiNpcTags.delete(npcId)
    aiState.aiDialogues.delete(npcId)
    aiState.aiAttackEventInfos.delete(npcId)
    aiState.aiActionsHistories.delete(npcId)
}

export function getWaynet(aiState: AiState): IWaynet {
    return aiState.waynet
}

export function getWaynetRegistry(aiState: AiState): WaynetRegistry {
    return aiState.waynetRegistry
}

export function getCharacterInPositionAreas(aiState: AiState): Map<string, Map<number, Array<number>>> {
    return aiState.characterInPositionAreas
}
export function getAllBots(aiState: AiState): Array<number> {
    return aiState.allBots
}

export function registerBot(aiState: AiState, npc: IAiNpc): void {
    aiState.allBots.push(npc.id)
    insertBot(aiState, npc)
}

export function unregisterBot(aiState: AiState, npcId: number) {
    aiState.allBots = aiState.allBots.filter(id => id !== npcId)
    deleteBot(aiState, npcId)

    for (let worldName of aiState.characterInPositionAreas.keys()) {
        const areaHashes: Iterable<number> | undefined = aiState.characterInPositionAreas.get(worldName)?.keys()
        if (typeof areaHashes !== 'undefined') {
            for (let areaHash of areaHashes) {
                const nearbyNpcs = aiState.characterInPositionAreas.get(worldName)?.get(areaHash)
                if (typeof nearbyNpcs !== 'undefined') {
                    aiState.characterInPositionAreas.get(worldName)?.set(areaHash, nearbyNpcs.filter(nearbyId => nearbyId !== npcId))
                }
            }
        }
    }
}

export function getWorldEventState(aiState: AiState): IWorldEventState {
    return aiState.worldEventState
}