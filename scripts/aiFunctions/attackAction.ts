import { IAiAction } from "../aiEntities/iAiAction";

export class AttackAction implements IAiAction {

    priority: number;
    aiId: number;
    shouldLoop: boolean;
    victimId: number;


    constructor(priority: number, aiId: number, victimId: number) {
        this.priority = priority
        this.aiId = aiId
        this.shouldLoop = false
        this.victimId = victimId

    }


    public executeAction(): void {
        revmp.attack(this.aiId, this.victimId);
        revmp.startAnimation(this.aiId, "S_FISTATTACK")
        setTimeout(() => {
            // Attacker could be invalid in the meanwhile, so better check.
            if (revmp.valid(this.aiId)) {
                revmp.fadeOutAnimation(this.aiId, "S_FISTATTACK");
            }
        }, 900);
    }

}
