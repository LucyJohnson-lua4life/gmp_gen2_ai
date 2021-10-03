
import { IAiNpc } from "../aiEntities/iAiNpc";
import { IWaynet } from "../waynet/iwaynet";
import { Waynet } from "../waynet/waynet";
import { EntityManager } from "./entityManager";
import { WaynetRegistry } from "./waynetRegistries/waynetRegistry";
const worldNames: Array<string> = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"]
/** Entry point to access the all ai related state.*/
export class AiState {
    private entityManager:EntityManager
    private waynet: IWaynet
    private allBots: Array<number>;
    private allPlayer: Array<number>;
    /*
      map of all character positions,
      the first key is the world name
      the second key is a checksum that determines all players that are in the same area
      the check sum maps to a key of all playerids that are in the check sums area
      */
    private characterInPositionAreas: Map<string, Map<number, Array<number>>>;
    private waynetRegistry: WaynetRegistry;

    constructor(wpPath:string, fpPath:string) {
        this.entityManager = new EntityManager()
        this.waynet = new Waynet(wpPath, fpPath)
        this.characterInPositionAreas = new Map()
        worldNames.forEach(name => this.characterInPositionAreas.set(name, new Map()))
        this.allBots = []
        this.allPlayer = []
        this.waynetRegistry = new WaynetRegistry()
    }

    public getEntityManager(): EntityManager{
        return this.entityManager
    }
    public getWaynet(): IWaynet {
        return this.waynet
    }

    public getWaynetRegistry(): WaynetRegistry {
        return this.waynetRegistry
    }

    public getCharacterInPositionAreas(): Map<string, Map<number, Array<number>>>{
        return this.characterInPositionAreas
    }
    public getAllBots(): Array<number> {
        return this.allBots
    }

    registerBot(npc: IAiNpc): void{
        this.allBots.push(npc.id)
        this.entityManager.registerBot(npc)
    }

    unregisterBot(npcId: number){
        this.allBots = this.allBots.filter(id => id !== npcId)
        this.entityManager.unregisterBot(npcId)
    }

}
