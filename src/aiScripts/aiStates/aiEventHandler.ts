
import { AiState } from "./aiState";
import { AiWorldStateEventHandler } from "./aiWorldStateEventHandler";

export class AiEventHandler {
    private aiState: AiState
    private worldStateEventHandler: AiWorldStateEventHandler

    constructor(aiState: AiState, worldStateEventHandler: AiWorldStateEventHandler) {
        this.aiState = aiState
        this.worldStateEventHandler = worldStateEventHandler
    }


    public initEventHandler(): void {
        const entityManager = this.aiState.getEntityManager();

        revmp.on("attacked", (attacker, target, userEvent) => {
            entityManager.setAttackEventComponent(target,{entityId: target, isUnderAttack: true, attackedBy: attacker})
            this.worldStateEventHandler.onAttacked(attacker, target)

        })
    }



}


