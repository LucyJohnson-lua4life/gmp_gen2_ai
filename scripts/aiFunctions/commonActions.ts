

import { IAiAction } from "../aiEntities/iAiAction";
import { setPlayerAngle, getCombatStateBasedAni, getAngleToPoint, getPlayerAngle, getAngleToTarget, getDistance, isAniPlaying } from "../aiFunctions/aiUtils";
import { gotoPosition, getDistance as getPointDistance} from "../waynet/positionFunctions";
import { IPositionComponent } from "../aiEntities/components/iPositionComponent";

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
        revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_ATTACK"))
        setTimeout(() => {
            // Attacker could be invalid in the meanwhile, so better check.
            if (revmp.valid(this.aiId)) {
                revmp.fadeOutAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_ATTACK"));
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
        let dangle = getPlayerAngle(this.aiId) - getAngleToTarget(this.aiId, this.victimId)
        if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && dangle > -20 && dangle < 20) {
            console.log("i hit")
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
        setPlayerAngle(this.aiId, y)
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
        setPlayerAngle(this.aiId, y)
        if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL") )) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
        }
    }
}

export class RunForward implements IAiAction {
    aiId: number
    shouldLoop: boolean
    actionName: string

    constructor(aiId: number) {
        this.aiId = aiId
        this.shouldLoop = false
        this.actionName = "run-forward"
    }

    public executeAction(): void {
        if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
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
        if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"))) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"))
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
        if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"))) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"))
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
        if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "T_PARADEJUMPB"))) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_PARADEJUMPB"))
        }
    }
}

export class GotoPosition implements IAiAction {
    aiId: number
    shouldLoop: boolean
    npcPosition:IPositionComponent
    targetX:number
    targetY:number
    targetZ:number

    constructor(npcPosition:IPositionComponent, x:number, y:number, z:number) {
        this.aiId = npcPosition.entityId
        this.npcPosition = npcPosition
        this.shouldLoop = true
        this.targetX = x
        this.targetY = y
        this.targetZ = z
    }


    public executeAction(): void {
        gotoPosition(this.npcPosition, this.targetX, this.targetY, this.targetZ)
        let pos:revmp.Vec3 = revmp.getPosition(this.aiId).position
        if(getPointDistance(pos[0], pos[1], pos[2], this.targetX, this.targetY, this.targetZ) < 100){
            if (isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
            this.shouldLoop = false
        }
        else{
            const y = getAngleToPoint(pos[0], pos[2], this.targetX, this.targetZ)
            setPlayerAngle(this.aiId, y)
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
        }

    }
}
