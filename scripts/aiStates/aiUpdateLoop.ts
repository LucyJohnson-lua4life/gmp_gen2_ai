import { AIState } from './aiStates';
export class AiUpdateLoop{
    private _state:AIState;

    constructor(state:AIState){
        this._state = state;
    }

    get state():AIState {
        return this._state;
    }

    public updateAi(aiId:number){
        let npc = this._state.botMap.get(aiId);
        if(typeof npc !== 'undefined'){
            npc.executeNextAction();
        }
    }

}