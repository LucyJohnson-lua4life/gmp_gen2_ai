"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttackAction = void 0;
class AttackAction {
    constructor(priority, aiId, victimId) {
        this.priority = priority;
        this.aiId = aiId;
        this.shouldLoop = false;
        this.victimId = victimId;
    }
    executeAction() {
        revmp.attack(this.aiId, this.victimId);
        revmp.startAnimation(this.aiId, "S_FISTATTACK");
        setTimeout(() => {
            // Attacker could be invalid in the meanwhile, so better check.
            if (revmp.valid(this.aiId)) {
                revmp.fadeOutAnimation(this.aiId, "S_FISTATTACK");
            }
        }, 900);
    }
}
exports.AttackAction = AttackAction;
