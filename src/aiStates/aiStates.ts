import { IAiNpc } from '../aiEntities/iAiNpc';
import { IPlayer } from '../aiEntities/iPlayer';
import { NumberKeyMap, StringKeyMap } from '../utils/mapStructs';

export class AIState {
    private allPlayers:NumberKeyMap<IPlayer>;
    private allBots:NumberKeyMap<IAiNpc>;
    private allPositions:StringKeyMap<NumberKeyMap<number>>;
    
    constructor() {
        this.allPlayers = []
        this.allBots = []
        this.allPositions = {}
    }

    get botMap():NumberKeyMap<IAiNpc>{
        return this.allBots
    }


}