"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunToTargetAction = exports.TurnToTargetAction = exports.WaitAction = exports.SFistAttackAction = void 0;
const aiUtils_1 = require("../aiFunctions/aiUtils");
const gl_matrix_1 = require("gl-matrix");
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
class TurnToTargetAction {
    constructor(priority, aiId, targetId) {
        this.priority = priority;
        this.aiId = aiId;
        this.shouldLoop = false;
        this.targetId = targetId;
    }
    executeAction() {
        const position = revmp.getPosition(this.aiId).position;
        const targetPosition = revmp.getPosition(this.targetId).position;
        const y = aiUtils_1.getAngle(position[0], position[2], targetPosition[0], targetPosition[2]);
        const rot = gl_matrix_1.quat.create();
        gl_matrix_1.quat.fromEuler(rot, 0, y, 0);
        revmp.setRotation(this.aiId, rot);
    }
}
exports.TurnToTargetAction = TurnToTargetAction;
class RunToTargetAction {
    constructor(priority, aiId, targetId, targetDistance) {
        this.priority = priority;
        this.aiId = aiId;
        this.shouldLoop = false;
        this.targetId = targetId;
        this.targetDistance = targetDistance;
    }
    executeAction() {
        console.log("action added");
        const position = revmp.getPosition(this.aiId).position;
        const targetPosition = revmp.getPosition(this.targetId).position;
        const y = aiUtils_1.getAngle(position[0], position[2], targetPosition[0], targetPosition[2]);
        const rot = gl_matrix_1.quat.create();
        gl_matrix_1.quat.fromEuler(rot, 0, y, 0);
        revmp.setRotation(this.aiId, rot);
        if (!aiUtils_1.isAniPlaying(this.aiId, "S_FISTRUNL")) {
            revmp.startAnimation(this.aiId, "S_FISTRUNL");
        }
    }
}
exports.RunToTargetAction = RunToTargetAction;
