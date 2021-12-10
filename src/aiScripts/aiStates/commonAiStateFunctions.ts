import { IActionComponent } from "../aiEntities/components/iActionsComponent"
import { IAiActionDescriptions } from "../aiEntities/components/iAiActionDescriptions"
import { IAiActionHistory } from "../aiEntities/components/iAiActionHistory"
import { IAiAttackEventInfo } from "../aiEntities/components/iAiAttackEventInfo"
import { iAiDailyRoutineInfo } from "../aiEntities/components/iAiDailyRoutineInfo"
import { IAiEnemyInfo } from "../aiEntities/components/iAiEnemyInfo"
import { IAiNpcStatus } from "../aiEntities/components/iAiNpcStatus"
import { IAiNpcTags } from "../aiEntities/components/iAiNpcTags"
import { IAiPosition } from "../aiEntities/components/iAiPosition"
import { IAiRespawnInfo } from "../aiEntities/components/iAiRespawnInfo"
import { IAiNpc } from "../aiEntities/iAiNpc"
import { AiState } from "./aiState"

function getDailyRoutineComponent(aiState: AiState, entityId: number): iAiDailyRoutineInfo | undefined {
    return aiState.dailyRoutineComponents.get(entityId);
}

function setDailyRoutineComponent(aiState: AiState, component: iAiDailyRoutineInfo) {
    aiState.dailyRoutineComponents.set(component.entityId, component)
}

function getActionsComponent(aiState: AiState, entityId: number): IActionComponent | undefined {
    return aiState.actionsComponents.get(entityId);
}

function setActionsComponent(aiState: AiState, component: IActionComponent) {
    aiState.actionsComponents.set(component.entityId, component)
}

function getActionDescriptionComponent(aiState: AiState, entityId: number): IAiActionDescriptions | undefined {
    return aiState.actionDescriptionComponents.get(entityId);
}

function setActionDescriptionComponent(aiState: AiState, component: IAiActionDescriptions) {
    aiState.actionDescriptionComponents.set(component.entityId, component)
}

function getPositionsComponents(aiState: AiState, entityId: number): IAiPosition | undefined {
    return aiState.positionsComponents.get(entityId);
}

function setPositionsComponent(aiState: AiState, component: IAiPosition) {
    aiState.positionsComponents.set(component.entityId, component)
}

function getNpcStateComponent(aiState: AiState, entityId: number): IAiNpcStatus | undefined {
    return aiState.npcStateComponents.get(entityId);
}
function setNpcStateComponent(aiState: AiState, component: IAiNpcStatus) {
    aiState.npcStateComponents.set(component.entityId, component)
}

function getRespawnComponent(aiState: AiState, entityId: number): IAiRespawnInfo | undefined {
    return aiState.respawnComponents.get(entityId);
}

function setRespawnComponent(aiState: AiState, component: IAiRespawnInfo) {
    aiState.respawnComponents.set(component.entityId, component)
}

function getEnemyComponent(aiState: AiState, entityId: number): IAiEnemyInfo | undefined {
    return aiState.enemyComponents.get(entityId);
}

function setEnemyComponent(aiState: AiState, component: IAiEnemyInfo) {
    aiState.enemyComponents.set(component.entityId, component)
}
function deleteEnemyComponent(aiState: AiState, entityId: number) {
    aiState.enemyComponents.delete(entityId)
}

function getActionHistoryComponent(aiState: AiState, entityId: number): IAiActionHistory | undefined {
    return aiState.actionHistoryComponents.get(entityId);
}
function setActionHistoryComponent(aiState: AiState, component: IAiActionHistory) {
    aiState.actionHistoryComponents.set(component.entityId, component)
}
function getAttackEventComponent(aiState: AiState, entityId: number): IAiAttackEventInfo | undefined {
    return aiState.attackEventComponents.get(entityId);
}
function setAttackEventComponent(aiState: AiState, component: IAiAttackEventInfo) {
    aiState.attackEventComponents.set(component.entityId, component)
}
function getNpcTagsComponent(aiState: AiState, entityId: number): IAiNpcTags | undefined {
    return aiState.npcTagsComponent.get(entityId);
}
function setNpcTagsComponent(aiState: AiState, component: IAiNpcTags) {
    aiState.npcTagsComponent.set(component.entityId, component)
}

function registerBot(aiState: AiState, npc: IAiNpc): void {
    const stateInfo: IAiNpcStatus = { entityId: npc.id, isDead: false, isUnconscious: false, npcInstance: npc.npcInstance }
    const respawnInfo: IAiRespawnInfo = { entityId: npc.id, respawnTime: npc.respawnTime, deathTime: -1 }
    const actionInfo: IActionComponent = { entityId: npc.id }
    const positionInfo: IAiPosition = { entityId: npc.id, currentPosX: 0, currentPosY: 0, currentPosZ: 0, lastPosX: 0, lastPosY: 0, lastPosZ: 0, lastPosUpdate: 0, startWorld: npc.startWorld, startPoint: npc.startPoint }
    const actionDescription: IAiActionDescriptions = { entityId: npc.id, descriptions: npc.actionDescriptions }
    const actionHistory: IAiActionHistory = { entityId: npc.id, lastAttackTime: 0 }
    const attackEvent: IAiAttackEventInfo = { entityId: npc.id, isUnderAttack: false, attackedBy: -1 }
    const npcTags: IAiNpcTags = { entityId: npc.id, tags: npc.aiTags }

    setNpcStateComponent(aiState, stateInfo)
    setRespawnComponent(aiState, respawnInfo)
    setActionsComponent(aiState, actionInfo)
    setPositionsComponent(aiState, positionInfo)
    setActionDescriptionComponent(aiState, actionDescription)
    setActionHistoryComponent(aiState, actionHistory)
    setAttackEventComponent(aiState, attackEvent)
    setNpcTagsComponent(aiState, npcTags)
}

function unregisterBot(aiState: AiState, npcId: number): void {
    aiState.npcStateComponents.delete(npcId)
    aiState.respawnComponents.delete(npcId)
    aiState.actionsComponents.delete(npcId)
    aiState.positionsComponents.delete(npcId)
    aiState.actionDescriptionComponents.delete(npcId)
    aiState.enemyComponents.delete(npcId)
}