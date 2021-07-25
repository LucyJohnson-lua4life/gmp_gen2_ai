"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRunParadeJump = exports.SRunStrafeRight = exports.SRunStrafeLeft = exports.RunToTargetAction = exports.TurnToTargetAction = exports.WaitAction = exports.SFistAttackAction = void 0;
const aiUtils_1 = require("../aiFunctions/aiUtils");
const gl_matrix_1 = require("gl-matrix");
class SFistAttackAction {
    constructor(aiId, victimId, necessaryDistance) {
        this.aiId = aiId;
        this.shouldLoop = false;
        this.victimId = victimId;
        this.necessaryDistance = necessaryDistance;
    }
    executeAction() {
        revmp.startAnimation(this.aiId, "S_FISTATTACK");
        setTimeout(() => {
            // Attacker could be invalid in the meanwhile, so better check.
            if (revmp.valid(this.aiId)) {
                revmp.fadeOutAnimation(this.aiId, "S_FISTATTACK");
            }
        }, 900);
        if (aiUtils_1.getDistance(this.aiId, this.victimId) < this.necessaryDistance) {
            revmp.attack(this.aiId, this.victimId);
        }
    }
}
exports.SFistAttackAction = SFistAttackAction;
class WaitAction {
    constructor(aiId, waitTime, startTime) {
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
    constructor(aiId, targetId) {
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
    constructor(aiId, targetId, targetDistance) {
        this.aiId = aiId;
        this.shouldLoop = false;
        this.targetId = targetId;
        this.targetDistance = targetDistance;
    }
    executeAction() {
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
class SRunStrafeLeft {
    constructor(aiId) {
        this.aiId = aiId;
        this.shouldLoop = false;
    }
    executeAction() {
        if (!aiUtils_1.isAniPlaying(this.aiId, "T_FISTRUNSTRAFEL")) {
            revmp.startAnimation(this.aiId, "T_FISTRUNSTRAFEL");
        }
    }
}
exports.SRunStrafeLeft = SRunStrafeLeft;
class SRunStrafeRight {
    constructor(aiId) {
        this.aiId = aiId;
        this.shouldLoop = false;
    }
    executeAction() {
        if (!aiUtils_1.isAniPlaying(this.aiId, "T_FISTRUNSTRAFER")) {
            revmp.startAnimation(this.aiId, "T_FISTRUNSTRAFER");
        }
    }
}
exports.SRunStrafeRight = SRunStrafeRight;
class SRunParadeJump {
    constructor(aiId) {
        this.aiId = aiId;
        this.shouldLoop = false;
    }
    executeAction() {
        if (!aiUtils_1.isAniPlaying(this.aiId, "T_FISTPARADEJUMPB")) {
            revmp.startAnimation(this.aiId, "T_FISTRUNSTRAFER");
        }
    }
}
exports.SRunParadeJump = SRunParadeJump;
