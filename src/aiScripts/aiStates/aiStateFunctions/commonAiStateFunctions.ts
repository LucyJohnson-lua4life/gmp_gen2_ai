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

export function getDailyRoutineComponent(aiState: AiState, entityId: number): IAiDailyRoutineInfo | undefined {
    return aiState.dailyRoutineComponents.get(entityId);
}

export function setDailyRoutineComponent(aiState: AiState, component: IAiDailyRoutineInfo) {
    aiState.dailyRoutineComponents.set(component.entityId, component)
}

export function getActionsComponent(aiState: AiState, entityId: number): IAiAction | undefined {
    return aiState.actionsComponents.get(entityId);
}

export function setActionsComponentIfUndefined(aiState: AiState, component: IAiAction) {
    if(typeof aiState.actionsComponents.get(component.aiId) === 'undefined'){
        aiState.actionsComponents.set(component.aiId, component)
    }
}

export function deleteActionsComponent(aiState: AiState, aiid: number) {
    aiState.actionsComponents.delete(aiid)
}

export function getActionDescriptionComponent(aiState: AiState, entityId: number): IAiActionDescriptions | undefined {
    return aiState.actionDescriptionComponents.get(entityId);
}

export function setActionDescriptionComponent(aiState: AiState, component: IAiActionDescriptions) {
    aiState.actionDescriptionComponents.set(component.entityId, component)
}

export function getPositionsComponents(aiState: AiState, entityId: number): IAiPosition | undefined {
    return aiState.positionsComponents.get(entityId);
}

export function setPositionsComponent(aiState: AiState, component: IAiPosition) {
    aiState.positionsComponents.set(component.entityId, component)
}

export function getNpcStateComponent(aiState: AiState, entityId: number): IAiNpcStatus | undefined {
    return aiState.npcStateComponents.get(entityId);
}
export function setNpcStateComponent(aiState: AiState, component: IAiNpcStatus) {
    aiState.npcStateComponents.set(component.entityId, component)
}

export function getRespawnComponent(aiState: AiState, entityId: number): IAiRespawnInfo | undefined {
    return aiState.respawnComponents.get(entityId);
}

export function setRespawnComponent(aiState: AiState, component: IAiRespawnInfo) {
    aiState.respawnComponents.set(component.entityId, component)
}

export function getEnemyComponent(aiState: AiState, entityId: number): IAiEnemyInfo | undefined {
    return aiState.enemyComponents.get(entityId);
}

export function setEnemyComponent(aiState: AiState, component: IAiEnemyInfo) {
    aiState.enemyComponents.set(component.entityId, component)
}
export function deleteEnemyComponent(aiState: AiState, entityId: number) {
    aiState.enemyComponents.delete(entityId)
}

export function getActionHistoryComponent(aiState: AiState, entityId: number): IAiActionHistory | undefined {
    return aiState.actionHistoryComponents.get(entityId);
}
export function setActionHistoryComponent(aiState: AiState, component: IAiActionHistory) {
    aiState.actionHistoryComponents.set(component.entityId, component)
}
export function getAttackEventComponent(aiState: AiState, entityId: number): IAiAttackEventInfo | undefined {
    return aiState.attackEventComponents.get(entityId);
}
export function setAttackEventComponent(aiState: AiState, component: IAiAttackEventInfo) {
    aiState.attackEventComponents.set(component.entityId, component)
}
export function getNpcTagsComponent(aiState: AiState, entityId: number): IAiNpcTags | undefined {
    return aiState.npcTagsComponent.get(entityId);
}
export function setNpcTagsComponent(aiState: AiState, component: IAiNpcTags) {
    aiState.npcTagsComponent.set(component.entityId, component)
}

export function insertBot(aiState: AiState, npc: IAiNpc): void {
    const stateInfo: IAiNpcStatus = { entityId: npc.id, isDead: false, isUnconscious: false, npcInstance: npc.npcInstance }
    const respawnInfo: IAiRespawnInfo = { entityId: npc.id, respawnTime: npc.respawnTime, deathTime: -1 }
    const positionInfo: IAiPosition = { entityId: npc.id, currentPosX: 0, currentPosY: 0, currentPosZ: 0, lastPosX: 0, lastPosY: 0, lastPosZ: 0, lastPosUpdate: 0, startWorld: npc.startWorld, startPoint: npc.startPoint }
    const actionDescription: IAiActionDescriptions = { entityId: npc.id, descriptions: npc.actionDescriptions }
    const actionHistory: IAiActionHistory = { entityId: npc.id, lastAttackTime: 0 }
    const attackEvent: IAiAttackEventInfo = { entityId: npc.id, isUnderAttack: false, attackedBy: -1 }
    const npcTags: IAiNpcTags = { entityId: npc.id, tags: npc.aiTags }

    setNpcStateComponent(aiState, stateInfo)
    setRespawnComponent(aiState, respawnInfo)
    setPositionsComponent(aiState, positionInfo)
    setActionDescriptionComponent(aiState, actionDescription)
    setActionHistoryComponent(aiState, actionHistory)
    setAttackEventComponent(aiState, attackEvent)
    setNpcTagsComponent(aiState, npcTags)
}

export function deleteBot(aiState: AiState, npcId: number): void {
    aiState.npcStateComponents.delete(npcId)
    aiState.respawnComponents.delete(npcId)
    aiState.actionsComponents.delete(npcId)
    aiState.positionsComponents.delete(npcId)
    aiState.actionDescriptionComponents.delete(npcId)
    aiState.enemyComponents.delete(npcId)
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