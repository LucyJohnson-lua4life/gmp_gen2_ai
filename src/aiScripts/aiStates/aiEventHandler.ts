
import { AiState } from "./aiState";
import { AiWorldStateEventHandler } from "./aiWorldStateEventHandler";
import { setAttackEventComponent } from "./aiStateFunctions";

export class AiEventHandler {
    private aiState: AiState
    private worldStateEventHandler: AiWorldStateEventHandler

    constructor(aiState: AiState, worldStateEventHandler: AiWorldStateEventHandler) {
        this.aiState = aiState
        this.worldStateEventHandler = worldStateEventHandler
    }


    public initEventHandler(): void {
        revmp.on("attacked", (attacker, target, userEvent) => {
            setAttackEventComponent(this.aiState,{entityId: target, isUnderAttack: true, attackedBy: attacker})
            this.worldStateEventHandler.onAttacked(attacker, target)
        })
    }



}


