import { IAiNpc } from '../ai_entities/iAiNpc';
import { IPlayer } from '../ai_entities/iPlayer';
import { NumberKeyMap } from '../utils/mapStructs';

export class AIState {
    private allPlayers:NumberKeyMap<IPlayer>;
    private allBots:NumberKeyMap<IAiNpc>;

    constructor() {
        this.allPlayers = []
        this.allBots = []
    }

    /**
     * Puts bot in the bot map, using it's id as a key.
     * @param bot bot to put into the map. 
     */
    putBot(bot:IAiNpc){
        this.allBots[bot.id] = bot;
    }

}