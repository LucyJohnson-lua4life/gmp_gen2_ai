
import { AiState } from "./aiState";

export class AiEventHandler {
    private aiState: AiState

    constructor(aiState: AiState) {
        this.aiState = aiState
    }


    public initEventHandler(): void {
        const entityManager = this.aiState.getEntityManager();

        revmp.on("attacked", (attacker, target, userEvent) => {
            const enemyId = entityManager.getEnemyComponent(target)?.enemyId ?? -1
            if (enemyId === -1) {
                entityManager.setEnemyComponent(target, { entityId: target, enemyId: attacker, lastAttackTime: 0 })
            }
        })
    }



}


