import { IAiNpc } from '../aiEntities/iAiNpc';
import { IPlayer } from '../aiEntities/iPlayer';
import { NumberKeyMap } from '../utils/mapStructs';

export class AIState {
    private _allPlayers:NumberKeyMap<IPlayer>;
    private _allBots:NumberKeyMap<IAiNpc>;
    
    constructor() {
        this._allPlayers = []
        this._allBots = []
    }

    get allBots():NumberKeyMap<IAiNpc>{
        return this._allBots
    }


}