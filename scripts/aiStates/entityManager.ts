import { IActionsComponent } from "../aiEntities/components/iActionsComponent";
import { IDailyRoutineComponent } from "../aiEntities/components/iDailyRoutineComponent";
import { INpcStateComponent } from "../aiEntities/components/iNpcStateComponent";
import { IPositionComponent } from "../aiEntities/components/iPositionComponent";
import { IRespawnComponent } from "../aiEntities/components/iRespawnComponent";

const worldNames: Array<string> = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"]
export class EntityManager {

    private allPositions: Map<string, Map<number, Array<number>>>;
    private dailyRoutineComponents:Map<number, IDailyRoutineComponent>;
    private actionsComponents:Map<number, IActionsComponent>;
    private positionsComponents:Map<number, IPositionComponent>;
    private npcStateComponents:Map<number, INpcStateComponent>;
    private respawnComponents:Map<number, IRespawnComponent>;

    constructor() {
        this.allPositions = new Map()
        worldNames.forEach(name =>this.allPositions.set(name, new Map()));
    }

    get positionMap(): Map<string, Map<number, Array<number>>> {
        return this.allPositions
    }

    getDailyRoutineComponent(entityId: number): IDailyRoutineComponent{
        return this.dailyRoutineComponents.get(entityId);
    }

    getActionsComponent(entityId: number): IActionsComponent{
        return this.actionsComponents.get(entityId);
    }

    getPositionsComponents(entityId: number): IPositionComponent{
        return this.positionsComponents.get(entityId);
    }

    getNpcStateComponent(entityId: number): INpcStateComponent{
        return this.npcStateComponents.get(entityId);
    }

    getRespawnComponent(entityId: number): IRespawnComponent{
        return this.respawnComponents.get(entityId);
    }


}