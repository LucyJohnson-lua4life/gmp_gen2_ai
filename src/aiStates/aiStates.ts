import { IAiNpc } from '../aiEntities/iAiNpc';
import { IPlayer } from '../aiEntities/iPlayer';
import { NumberKeyMap, StringKeyMap } from '../utils/mapStructs';
const worldNames: Array<string> = ["NEWWORLD\\NEWWORLD.ZEN", "OLDWORLD\\OLDWORLD.ZEN", "ADDON\\ADDONWORLD.ZEN"]
export class AIState {
    private allPlayers: NumberKeyMap<IPlayer>;
    private allBots: NumberKeyMap<IAiNpc>;
    private allPositions: StringKeyMap<NumberKeyMap<Array<number>>>;

    constructor() {
        this.allPlayers = []
        this.allBots = []
        this.allPositions = {}
        worldNames.forEach(name =>this.allPositions[name] = {});
    }

    get botMap(): NumberKeyMap<IAiNpc> {
        return this.allBots
    }

    get positionMap(): StringKeyMap<NumberKeyMap<Array<number>>> {
        return this.allPositions
    }

}