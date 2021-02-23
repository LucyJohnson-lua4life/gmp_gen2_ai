import { IAiNpc } from '../ai_entities/iAiNpc';
import { IPlayer } from '../ai_entities/iPlayer';

export class AIState {
    private allPlayers:Array<IPlayer>;
    private allBots:Array<IAiNpc>;

    constructor() {
        this.allPlayers = []
        this.allBots = []
    }


    addBot(bot:IAiNpc){
        this.allBots.push(bot);
    }

}