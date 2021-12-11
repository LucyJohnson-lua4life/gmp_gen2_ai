
import { IAiActionHistory } from "../aiEntities/components/iAiActionHistory";
import { IAiAttackEventInfo } from "../aiEntities/components/iAiAttackEventInfo";
import { IAiDailyRoutineInfo } from "../aiEntities/components/iAiDailyRoutineInfo";
import { IAiPosition } from "../aiEntities/components/iAiPosition";
import { IAiNpcStatus } from "../aiEntities/components/iAiNpcStatus";
import { IAiNpcTags } from "../aiEntities/components/iAiNpcTags";
import { IAiRespawnInfo } from "../aiEntities/components/iAiRespawnInfo";
import { IAiEnemyInfo } from "../aiEntities/components/iAiEnemyInfo";
import { IWaynet } from "../waynet/iwaynet";
import { Waynet } from "../waynet/waynet";
import { IWorldEventState } from "./waynetRegistries/iWorldEventState";
import { WaynetRegistry } from "./waynetRegistries/waynetRegistry";
import { IAiActionDescriptions } from "../aiEntities/components/iAiActionDescriptions";
import { IAiAction } from "../aiEntities/iAiAction";
const worldNames: Array<string> = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"]
/** Entry point to access the all ai related state.*/
export class AiState {
    waynet: IWaynet
    allBots: Array<number>;
    allPlayer: Array<number>;
    worldEventState: IWorldEventState

    /*
      map of all character positions,
      the first key is the world name
      the second key is a checksum that determines all players that are in the same area
      the check sum maps to a key of all playerids that are in the check sums area
      */
    characterInPositionAreas: Map<string, Map<number, Array<number>>>;
    waynetRegistry: WaynetRegistry;
    //entity based state
    aiDailyRoutineInfos: Map<number, IAiDailyRoutineInfo>;
    aiActions: Map<number, IAiAction>;
    aiActionsDescriptions: Map<number, IAiActionDescriptions>;
    aiPositions: Map<number, IAiPosition>;
    aiNpcStatus: Map<number, IAiNpcStatus>;
    aiRespawnInfos: Map<number, IAiRespawnInfo>;
    aiEnemyInfos: Map<number, IAiEnemyInfo>;
    aiActionsHistories: Map<number, IAiActionHistory>;
    aiAttackEventInfos: Map<number, IAiAttackEventInfo>;
    aiNpcTags: Map<number, IAiNpcTags>;

    constructor(wpPath: string, fpPath: string) {
        this.waynet = new Waynet(wpPath, fpPath)
        this.characterInPositionAreas = new Map()
        worldNames.forEach(name => this.characterInPositionAreas.set(name, new Map()))
        this.allBots = []
        this.allPlayer = []
        this.waynetRegistry = new WaynetRegistry()
        this.worldEventState = { influenceOfTheGods: 50, khorinisState: 0, bigFarmState: 0, lastStateUpdate: Date.now() }

        this.aiDailyRoutineInfos = new Map()
        this.aiActions = new Map()
        this.aiActionsDescriptions = new Map()
        this.aiPositions = new Map()
        this.aiNpcStatus = new Map()
        this.aiRespawnInfos = new Map()
        this.aiEnemyInfos = new Map()
        this.aiActionsHistories = new Map()
        this.aiAttackEventInfos = new Map()
        this.aiNpcTags = new Map()
    }

}
