"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GotoPosition = exports.SRunParadeJump = exports.SRunStrafeRight = exports.SRunStrafeLeft = exports.RunForward = exports.RunToTargetAction = exports.TurnToTargetAction = exports.WaitAction = exports.SFistAttackAction = void 0;
const aiUtils_1 = require("../aiFunctions/aiUtils");
const positionFunctions_1 = require("../waynet/positionFunctions");
const gl_matrix_1 = require("gl-matrix");
class SFistAttackAction {
    constructor(aiId, victimId, necessaryDistance) {
        this.aiId = aiId;
        this.shouldLoop = false;
        this.victimId = victimId;
        this.necessaryDistance = necessaryDistance;
    }
    executeAction() {
        revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_ATTACK"));
        setTimeout(() => {
            // Attacker could be invalid in the meanwhile, so better check.
            if (revmp.valid(this.aiId)) {
                revmp.fadeOutAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_ATTACK"));
            }
        }, 900);
        /*
        let dangle = Math.abs(getPlayerAngle(this.aiId) - getAngleToTarget(this.aiId, this.victimId))

        if (dangle > 180) {
            dangle = Math.min(this.aiId, this.victimId)
        }
        console.log("dangle: " + dangle)
        */
        /*
        let pAngle = getPlayerAngle(this.aiId);
        let angleToTarget = getAngleToTarget(this.aiId, this.victimId)
        console.log("pAngle: " + pAngle)
        console.log("att: " + angleToTarget)
        console.log("distance: " + getDistance(this.aiId, this.victimId))
        */
        let dangle = aiUtils_1.getPlayerAngle(this.aiId) - aiUtils_1.getAngleToTarget(this.aiId, this.victimId);
        if (aiUtils_1.getDistance(this.aiId, this.victimId) < this.necessaryDistance && dangle > -20 && dangle < 20) {
            console.log("i hit");
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
    }
    executeAction() {
        const position = revmp.getPosition(this.aiId).position;
        const targetPosition = revmp.getPosition(this.targetId).position;
        const y = aiUtils_1.getAngleToTarget(this.aiId, this.targetId);
        const rot = gl_matrix_1.quat.create();
        gl_matrix_1.quat.fromEuler(rot, 0, y, 0);
        revmp.setRotation(this.aiId, rot);
        if (!aiUtils_1.isAniPlaying(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
            revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"));
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
        if (!aiUtils_1.isAniPlaying(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
            revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"));
        }
    }
}
exports.RunForward = RunForward;
class SRunStrafeLeft {
    constructor(aiId) {
        this.aiId = aiId;
        this.shouldLoop = false;
    }
    executeAction() {
        if (!aiUtils_1.isAniPlaying(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"))) {
            revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"));
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
        if (!aiUtils_1.isAniPlaying(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"))) {
            revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"));
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
        if (!aiUtils_1.isAniPlaying(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "T_PARADEJUMPB"))) {
            revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "T_PARADEJUMPB"));
        }
    }
}
exports.SRunParadeJump = SRunParadeJump;
class GotoPosition {
    constructor(npcPosition, x, y, z) {
        this.aiId = npcPosition.entityId;
        this.npcPosition = npcPosition;
        this.shouldLoop = true;
        this.targetX = x;
        this.targetY = y;
        this.targetZ = z;
    }
    executeAction() {
        positionFunctions_1.gotoPosition(this.npcPosition, this.targetX, this.targetY, this.targetZ);
        let pos = revmp.getPosition(this.aiId).position;
        if (positionFunctions_1.getDistance(pos[0], pos[1], pos[2], this.targetX, this.targetY, this.targetZ) < 100) {
            if (aiUtils_1.isAniPlaying(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
                revmp.stopAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"));
            }
            this.shouldLoop = false;
        }
        else {
            const y = aiUtils_1.getAngleToPoint(pos[0], pos[2], this.targetX, this.targetZ);
            const rot = gl_matrix_1.quat.create();
            gl_matrix_1.quat.fromEuler(rot, 0, y, 0);
            revmp.setRotation(this.aiId, rot);
            revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"));
        }
    }
}
exports.GotoPosition = GotoPosition;
