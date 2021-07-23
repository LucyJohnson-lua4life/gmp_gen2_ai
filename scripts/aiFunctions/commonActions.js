"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitAction = exports.SFistAttackAction = void 0;
class SFistAttackAction {
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
exports.SFistAttackAction = SFistAttackAction;
class WaitAction {
    constructor(priority, aiId, waitTime, startTime) {
        this.priority = priority;
        this.aiId = aiId;
        this.shouldLoop = true;
        this.waitTime = waitTime;
        this.startTime = startTime;
    }
    executeAction() {
        if (this.startTime + this.waitTime > new Date().getMilliseconds()) {
            this.shouldLoop = false;
        }
    }
}
exports.WaitAction = WaitAction;
