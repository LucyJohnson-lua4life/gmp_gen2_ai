

import { IAiAction } from "../aiEntities/iAiAction";
import { getPlayerAngle, getAngleToTarget, getDistance, isAniPlaying } from "../aiFunctions/aiUtils";
import { quat } from "gl-matrix";

export class SFistAttackAction implements IAiAction {
    aiId: number
    shouldLoop: boolean
    victimId: number
    necessaryDistance: number

    constructor(aiId: number, victimId: number, necessaryDistance: number) {
        this.aiId = aiId
        this.shouldLoop = false
        this.victimId = victimId
        this.necessaryDistance = necessaryDistance
    }


    public executeAction(): void {
        revmp.startAnimation(this.aiId, "S_FISTATTACK")
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
        let dangle = getPlayerAngle(this.aiId) - getAngleToTarget(this.aiId, this.victimId)
        if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && dangle > -20 && dangle < 20) {
            revmp.attack(this.aiId, this.victimId);
        }
    }

}

export class WaitAction implements IAiAction {

    aiId: number
    shouldLoop: boolean
    waitTime: number
    startTime: number

    constructor(aiId: number, waitTime: number, startTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.waitTime = waitTime
        this.startTime = startTime

    }

    public executeAction(): void {
        if (this.startTime + this.waitTime > new Date().getMilliseconds()) {
            this.shouldLoop = false
        }

    }
}

export class TurnToTargetAction implements IAiAction {
    aiId: number
    shouldLoop: boolean
    targetId: number

    constructor(aiId: number, targetId: number) {
        this.aiId = aiId
        this.shouldLoop = false
        this.targetId = targetId

    }

    public executeAction(): void {
        const position = revmp.getPosition(this.aiId).position;
        const targetPosition = revmp.getPosition(this.targetId).position;
        const y = getAngleToTarget(this.aiId, this.targetId)
        const rot = quat.create();
        quat.fromEuler(rot, 0, y, 0);
        revmp.setRotation(this.aiId, rot);
    }
}

export class RunToTargetAction implements IAiAction {
    aiId: number
    shouldLoop: boolean
    targetId: number
    targetDistance: number

    constructor(aiId: number, targetId: number, targetDistance: number) {
        this.aiId = aiId
        this.shouldLoop = false
        this.targetId = targetId
        this.targetDistance = targetDistance
    }

    public executeAction(): void {
        const position = revmp.getPosition(this.aiId).position;
        const targetPosition = revmp.getPosition(this.targetId).position;
        const y = getAngleToTarget(this.aiId, this.targetId)
        const rot = quat.create();
        quat.fromEuler(rot, 0, y, 0);
        revmp.setRotation(this.aiId, rot);
        if (!isAniPlaying(this.aiId, "S_FISTRUNL")) {
            revmp.startAnimation(this.aiId, "S_FISTRUNL")
        }
    }
}

export class RunForward implements IAiAction {
    aiId: number
    shouldLoop: boolean

    constructor(aiId: number) {
        this.aiId = aiId
        this.shouldLoop = false
    }

    public executeAction(): void {
        if (!isAniPlaying(this.aiId, "S_FISTRUNL")) {
            revmp.startAnimation(this.aiId, "S_FISTRUNL")
        }
    }
}

export class SRunStrafeLeft implements IAiAction {
    aiId: number
    shouldLoop: boolean

    constructor(aiId: number) {
        this.aiId = aiId
        this.shouldLoop = false
    }

    public executeAction(): void {
        if (!isAniPlaying(this.aiId, "T_FISTRUNSTRAFEL")) {
            revmp.startAnimation(this.aiId, "T_FISTRUNSTRAFEL")
        }
    }
}

export class SRunStrafeRight implements IAiAction {
    aiId: number
    shouldLoop: boolean

    constructor(aiId: number) {
        this.aiId = aiId
        this.shouldLoop = false
    }

    public executeAction(): void {
        if (!isAniPlaying(this.aiId, "T_FISTRUNSTRAFER")) {
            revmp.startAnimation(this.aiId, "T_FISTRUNSTRAFER")
        }
    }
}

export class SRunParadeJump implements IAiAction {
    aiId: number
    shouldLoop: boolean

    constructor(aiId: number) {
        this.aiId = aiId
        this.shouldLoop = false
    }

    public executeAction(): void {
        if (!isAniPlaying(this.aiId, "T_FISTPARADEJUMPB")) {
            revmp.startAnimation(this.aiId, "T_FISTPARADEJUMPB")
            console.log("should i be doing this?")
        }
    }
}
