import { AIState } from './aiStates';
class AiUpdateLoop{
    private _state:AIState = new AIState();

    get state():AIState {
        return this._state;
    }

}