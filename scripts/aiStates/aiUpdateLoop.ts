import { AIState } from './aiStates';
export class AiUpdateLoop {
    private _state: AIState;

    constructor(state: AIState) {
        this._state = state;
    }

    get state(): AIState {
        return this._state;
    }

    public updateAll() {
        console.log(Array.from(this._state.botMap.keys()).length)
        Array.from(this._state.botMap.keys()).forEach((aiId) => this.updateAi(aiId))
    }

    public updateAi(aiId: number) {
        console.log("hello?")
        let npc = this._state.botMap.get(aiId);
        if (typeof npc !== 'undefined') {
            npc.executeNextAction();
        }
    }

}