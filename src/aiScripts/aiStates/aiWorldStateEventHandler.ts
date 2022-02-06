
import { AiState } from "./aiState";

export class AiWorldStateEventHandler {
    private aiState: AiState

    constructor(aiState: AiState) {
        this.aiState = aiState
    }

    public onAttacked(attacker: number, target: number): void {

        if(revmp.getName(target).name === 'Town Leader'){
            if(revmp.getHealth(target).current <= 0){
                revmp.sendChatMessage(revmp.players, "The town leader was defeated.")
            }
        }
    }

}

