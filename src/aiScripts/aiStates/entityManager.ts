
import { IActionComponent } from "../aiEntities/components/iActionsComponent";
import { iAiDailyRoutineInfo } from "../aiEntities/components/iAiDailyRoutineInfo";
import { IAiNpcStatus } from "../aiEntities/components/iAiNpcStatus";
import { IAiPosition } from "../aiEntities/components/iAiPosition";
import { IAiRespawnInfo } from "../aiEntities/components/iAiRespawnInfo";
import { IAiActionDescriptions } from "../aiEntities/components/iAiActionDescriptions";
import { IAiEnemyInfo } from "../aiEntities/components/iAiEnemyInfo";
import { IAiNpc } from "../aiEntities/iAiNpc";
import { IAiActionHistory } from "../aiEntities/components/iAiActionHistory";
import { IAiAttackEventInfo } from "../aiEntities/components/iAiAttackEventInfo";
import { IAiNpcTags } from "../aiEntities/components/iAiNpcTags";

const worldNames: Array<string> = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"]
/**
 * Class that contains all lookups between the entity id and it's components.
 * TODO: document the different components and the interface.
 */
export class EntityManager {

    private dailyRoutineComponents:Map<number, iAiDailyRoutineInfo>;
    private actionsComponents:Map<number, IActionComponent>;
    private actionDescriptionComponents: Map<number, IAiActionDescriptions>;
    private positionsComponents:Map<number, IAiPosition>;
    private npcStateComponents:Map<number, IAiNpcStatus>;
    private respawnComponents:Map<number, IAiRespawnInfo>;
    private enemyComponents: Map<number, IAiEnemyInfo>;
    private actionHistoryComponents: Map<number, IAiActionHistory>;
    private attackEventComponents: Map<number, IAiAttackEventInfo>;
    private npcTagsComponent: Map<number, IAiNpcTags>;


    constructor() {
        this.dailyRoutineComponents = new Map()
        this.actionsComponents = new Map()
        this.actionDescriptionComponents = new Map()
        this.positionsComponents = new Map()
        this.npcStateComponents = new Map()
        this.respawnComponents = new Map()
        this.enemyComponents = new Map()
        this.actionHistoryComponents = new Map()
        this.attackEventComponents = new Map()
        this.npcTagsComponent = new Map()
    }

    //todo: add more functionality once revmp functions are available
    registerBot(npc: IAiNpc): void{
        const stateInfo:IAiNpcStatus = {entityId: npc.id, isDead:false, isUnconscious: false, npcInstance: npc.npcInstance}
        const respawnInfo:IAiRespawnInfo = {entityId: npc.id, respawnTime: npc.respawnTime, deathTime: -1}
        const actionInfo:IActionComponent = {entityId: npc.id}
        const positionInfo:IAiPosition = {entityId: npc.id, currentPosX:0, currentPosY:0, currentPosZ:0, lastPosX:0, lastPosY: 0, lastPosZ: 0, lastPosUpdate: 0, startWorld: npc.startWorld, startPoint: npc.startPoint}
        const actionDescription:IAiActionDescriptions = {entityId: npc.id, descriptions: npc.actionDescriptions}
        const actionHistory:IAiActionHistory = {entityId: npc.id, lastAttackTime: 0}
        const attackEvent:IAiAttackEventInfo = {entityId: npc.id, isUnderAttack: false, attackedBy: -1}
        const npcTags:IAiNpcTags = {entityId: npc.id, tags: npc.aiTags}

        this.setNpcStateComponent(npc.id, stateInfo)
        this.setRespawnComponent(npc.id, respawnInfo)
        this.setActionsComponent(npc.id, actionInfo)
        this.setPositionsComponent(npc.id, positionInfo)
        this.setActionDescriptionComponent(npc.id, actionDescription)
        this.setActionHistoryComponent(npc.id, actionHistory)
        this.setAttackEventComponent(npc.id,attackEvent)
        this.setNpcTagsComponent(npc.id, npcTags)
    }

    unregisterBot(npcId: number): void{
        this.npcStateComponents.delete(npcId)
        this.respawnComponents.delete(npcId)
        this.actionsComponents.delete(npcId)
        this.positionsComponents.delete(npcId)
        this.actionDescriptionComponents.delete(npcId)
        this.enemyComponents.delete(npcId)
    }

    getDailyRoutineComponent(entityId: number): iAiDailyRoutineInfo|undefined{
        return this.dailyRoutineComponents.get(entityId);
    }

    setDailyRoutineComponent(entityId: number, component: iAiDailyRoutineInfo){
        this.dailyRoutineComponents.set(entityId, component)
    }

    getActionsComponent(entityId: number): IActionComponent|undefined{
        return this.actionsComponents.get(entityId);
    }

    setActionsComponent(entityId: number, component: IActionComponent){
        this.actionsComponents.set(entityId, component)
    }

    getActionDescriptionComponent(entityId: number): IAiActionDescriptions | undefined {
        return this.actionDescriptionComponents.get(entityId);
    }

    setActionDescriptionComponent(entityId: number, component: IAiActionDescriptions) {
        this.actionDescriptionComponents.set(entityId, component)
    }

    getPositionsComponents(entityId: number): IAiPosition|undefined{
        return this.positionsComponents.get(entityId);
    }

    setPositionsComponent(entityId: number, component: IAiPosition){
        this.positionsComponents.set(entityId, component)
    }

    getNpcStateComponent(entityId: number): IAiNpcStatus|undefined{
        return this.npcStateComponents.get(entityId);
    }
    setNpcStateComponent(entityId: number, component: IAiNpcStatus){
        this.npcStateComponents.set(entityId, component)
    }

    getRespawnComponent(entityId: number): IAiRespawnInfo|undefined{
        return this.respawnComponents.get(entityId);
    }

    setRespawnComponent(entityId: number, component: IAiRespawnInfo){
        this.respawnComponents.set(entityId, component)
    }

    getEnemyComponent(entityId: number): IAiEnemyInfo | undefined {
        return this.enemyComponents.get(entityId);
    }

    setEnemyComponent(entityId: number, component: IAiEnemyInfo) {
        this.enemyComponents.set(entityId, component)
    }
    deleteEnemyComponent(entityId: number) {
        this.enemyComponents.delete(entityId)
    }

    getActionHistoryComponent(entityId: number): IAiActionHistory | undefined {
        return this.actionHistoryComponents.get(entityId);
    }
    setActionHistoryComponent(entityId: number, component: IAiActionHistory) {
        this.actionHistoryComponents.set(entityId, component)
    }
    getAttackEventComponent(entityId: number): IAiAttackEventInfo | undefined {
        return this.attackEventComponents.get(entityId);
    }
    setAttackEventComponent(entityId: number, component: IAiAttackEventInfo) {
        this.attackEventComponents.set(entityId, component)
    }
    getNpcTagsComponent(entityId: number): IAiNpcTags | undefined {
        return this.npcTagsComponent.get(entityId);
    }
    setNpcTagsComponent(entityId: number, component: IAiNpcTags) {
        this.npcTagsComponent.set(entityId, component)
    }
}
