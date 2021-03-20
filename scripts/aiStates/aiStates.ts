import { IAiNpc } from '../aiEntities/iAiNpc';
import { IPlayer } from '../aiEntities/iPlayer';
const worldNames: Array<string> = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"]
export class AIState {
    private allPlayers: Map<number, IPlayer>;
    private allBots: Map<number, IAiNpc>;
    private allPositions: Map<string, Map<number, Array<number>>>;

    constructor() {
        this.allPlayers = new Map()
        this.allBots = new Map()
        this.allPositions = new Map()
        worldNames.forEach(name =>this.allPositions.set(name, new Map()));
    }

    get botMap(): Map<number, IAiNpc> {
        return this.allBots
    }

    get positionMap(): Map<string, Map<number, Array<number>>> {
        return this.allPositions
    }

    public registerBot(bot:IAiNpc):void{
        this.allBots[bot.id] = bot;
    }

}