
import { IAttackEventComponent } from "../aiEntities/components/iAttackEventComponent";
import { AiState } from "./aiState";

export class AiEventHandler {
    private aiState: AiState

    constructor(aiState: AiState) {
        this.aiState = aiState
    }


    public initEventHandler(): void {
        const entityManager = this.aiState.getEntityManager();

        revmp.on("attacked", (attacker, target, userEvent) => {
            entityManager.setAttackEventComponent(target,{isUnderAttack: true, attackedBy: attacker})
        })
    }



}


