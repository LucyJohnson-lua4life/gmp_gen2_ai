"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRunParadeJump = exports.SRunStrafeRight = exports.SRunStrafeLeft = exports.RunForward = exports.RunToTargetAction = exports.TurnToTargetAction = exports.WaitAction = exports.SFistAttackAction = void 0;
const aiUtils_1 = require("../aiFunctions/aiUtils");
const gl_matrix_1 = require("gl-matrix");
class SFistAttackAction {
    constructor(aiId, victimId, necessaryDistance) {
        this.aiId = aiId;
        this.shouldLoop = false;
        this.victimId = victimId;
        this.necessaryDistance = necessaryDistance;
        this.actionName = "fist-attack";
    }
    executeAction() {
        revmp.startAnimation(this.aiId, "S_FISTATTACK");
        setTimeout(() => {
            // Attacker could be invalid in the meanwhile, so better check.
            if (revmp.valid(this.aiId)) {
                revmp.fadeOutAnimation(this.aiId, "S_FISTATTACK");
            }
        }, 900);
        /*
        let dangle = Math.abs(getPlayerAngle(this.aiId) - getAngleToTarget(this.aiId, this.victimId))

        if (dangle > 180) {
            dangle = Math.min(this.aiId, this.victimId)
        }
        console.log("dangle: " + dangle)
        */
        let dangle = aiUtils_1.getPlayerAngle(this.aiId) - aiUtils_1.getAngleToTarget(this.aiId, this.victimId);
        if (aiUtils_1.getDistance(this.aiId, this.victimId) < this.necessaryDistance && dangle > -20 && dangle < 20) {
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
        this.actionName = "wait";
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
        this.actionName = "turn-to-target";
    }
    executeAction() {
        const position = revmp.getPosition(this.aiId).position;
        const targetPosition = revmp.getPosition(this.targetId).position;
        const y = aiUtils_1.getAngleToTarget(this.aiId, this.targetId);
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
        this.actionName = "run-to-target";
    }
    executeAction() {
        const position = revmp.getPosition(this.aiId).position;
        const targetPosition = revmp.getPosition(this.targetId).position;
        const y = aiUtils_1.getAngleToTarget(this.aiId, this.targetId);
        const rot = gl_matrix_1.quat.create();
        gl_matrix_1.quat.fromEuler(rot, 0, y, 0);
        revmp.setRotation(this.aiId, rot);
        if (!aiUtils_1.isAniPlaying(this.aiId, "S_FISTRUNL")) {
            revmp.startAnimation(this.aiId, "S_FISTRUNL");
        }
    }
}
exports.RunToTargetAction = RunToTargetAction;
class RunForward {
    constructor(aiId) {
        this.aiId = aiId;
        this.shouldLoop = false;
        this.actionName = "run-forward";
    }
    executeAction() {
        if (!aiUtils_1.isAniPlaying(this.aiId, "S_FISTRUNL")) {
            revmp.startAnimation(this.aiId, "S_FISTRUNL");
        }
    }
}
exports.RunForward = RunForward;
class SRunStrafeLeft {
    constructor(aiId) {
        this.aiId = aiId;
        this.shouldLoop = false;
        this.actionName = "strafe-left";
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
        this.actionName = "strafe-right";
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
        this.actionName = "parade-jump";
    }
    executeAction() {
        if (!aiUtils_1.isAniPlaying(this.aiId, "T_FISTPARADEJUMPB")) {
            revmp.startAnimation(this.aiId, "T_FISTPARADEJUMPB");
        }
    }
}
exports.SRunParadeJump = SRunParadeJump;
