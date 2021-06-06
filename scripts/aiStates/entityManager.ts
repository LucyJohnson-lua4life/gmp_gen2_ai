import { IActionsComponent } from "../aiEntities/components/iActionsComponent";
import { IDrInfoComponent } from "../aiEntities/components/iDrInfoComponent";
import { INpcStateComponent } from "../aiEntities/components/iNpcStateComponent";
import { IPositionComponent } from "../aiEntities/components/iPositionComponent";
import { IRespawnComponent } from "../aiEntities/components/iRespawnComponent";
import { IAiNpc } from "../aiEntities/iAiNpc";

const worldNames: Array<string> = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"]
/**
 * Central class that contains all lookups between the entity id and it's components.
 * TODO: document the different components and the interface.
 */
export class EntityManager {



    private allBots:Array<number>;
    private allPlayer:Array<number>;
    private allPositions: Map<string, Map<number, Array<number>>>;
    private dailyRoutineComponents:Map<number, IDrInfoComponent>;
    private actionsComponents:Map<number, IActionsComponent>;
    private positionsComponents:Map<number, IPositionComponent>;
    private npcStateComponents:Map<number, INpcStateComponent>;
    private respawnComponents:Map<number, IRespawnComponent>;

    constructor() {
        this.allPositions = new Map()
        worldNames.forEach(name =>this.allPositions.set(name, new Map()))
        this.allBots = new Array()
        this.allPlayer = new Array()
        this.dailyRoutineComponents = new Map()
        this.actionsComponents = new Map()
        this.positionsComponents = new Map()
        this.npcStateComponents = new Map()
        this.respawnComponents = new Map()
    }

    get positionMap(): Map<string, Map<number, Array<number>>> {
        return this.allPositions
    }

    get getAllBots(): Array<number>{
        return this.allBots
    }

    //todo: add more functionality once revmp functions are available
    registerBot(npc: IAiNpc): void{
        this.allBots.push(npc.id)
        let stateInfo:INpcStateComponent = {entityId: npc.id, isDead:false, isUnconscious: false}
        let respawnInfo:IRespawnComponent = {entityId: npc.id, respawnTime: npc.respawnTime}
        let actionInfo:IActionsComponent = {entityId: npc.id, nextActions: npc.nextActions}

        this.setNpcStateComponent(npc.id, stateInfo)
        this.setRespawnComponent(npc.id, respawnInfo)
        this.setActionsComponent(npc.id, actionInfo)

    }

    getDailyRoutineComponent(entityId: number): IDrInfoComponent{
        return this.dailyRoutineComponents.get(entityId);
    }

    setDailyRoutineComponent(entityId: number, component: IDrInfoComponent){
        this.dailyRoutineComponents.set(entityId, component)
    }

    getActionsComponent(entityId: number): IActionsComponent{
        return this.actionsComponents.get(entityId);
    }

    setActionsComponent(entityId: number, component: IActionsComponent){
        this.actionsComponents.set(entityId, component)
    }

    getPositionsComponents(entityId: number): IPositionComponent{
        return this.positionsComponents.get(entityId);
    }

    setPositionsComponent(entityId: number, component: IPositionComponent){
        this.positionsComponents.set(entityId, component)
    }

    getNpcStateComponent(entityId: number): INpcStateComponent{
        return this.npcStateComponents.get(entityId);
    }
    setNpcStateComponent(entityId: number, component: INpcStateComponent){
        this.npcStateComponents.set(entityId, component)
    }

    getRespawnComponent(entityId: number): IRespawnComponent{
        return this.respawnComponents.get(entityId);
    }

    setRespawnComponent(entityId: number, component: IRespawnComponent){
        this.respawnComponents.set(entityId, component)
    }

}