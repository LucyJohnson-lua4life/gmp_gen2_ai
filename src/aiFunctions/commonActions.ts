

import { IAiAction } from "../aiEntities/iAiAction";
import { setPlayerAngle, getCombatStateBasedAni, getAngleToPoint, getPlayerAngle, getAngleToTarget, getDistance, isAniPlaying } from "../aiFunctions/aiUtils";
import { gotoPosition, getDistance as getPointDistance } from "../waynet/positionFunctions";
import { IPositionComponent } from "../aiEntities/components/iPositionComponent";
import { AiState } from "../aiStates/aiState";
import { IWaynet, Waypoint } from "../waynet/iwaynet";
import { IEnemyComponent } from "../aiEntities/components/iEnemyComponent";
import { EntityManager } from "../aiStates/entityManager";

export class SForwardAttackAction implements IAiAction {
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
        if (revmp.valid(this.victimId)) {


            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_ATTACK"))
            setTimeout(() => {
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
            const dangle = getPlayerAngle(this.aiId) - getAngleToTarget(this.aiId, this.victimId)
            if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && dangle > -20 && dangle < 20) {
                revmp.attack(this.aiId, this.victimId);
            }
        }
    }

}

export class SLeftAttackAction implements IAiAction {
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
        if (revmp.valid(this.victimId)) {


            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_ATTACKL"))
            setTimeout(() => {
                if (revmp.valid(this.aiId)) {
                    revmp.fadeOutAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_ATTACKL"));
                }
            }, 900);

            const dangle = getPlayerAngle(this.aiId) - getAngleToTarget(this.aiId, this.victimId)
            if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && dangle > -20 && dangle < 20) {
                revmp.attack(this.aiId, this.victimId);
            }
        }
    }
}

export class SRightAttackAction implements IAiAction {
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
        if (revmp.valid(this.victimId)) {


            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_ATTACKR"))
            setTimeout(() => {
                if (revmp.valid(this.aiId)) {
                    revmp.fadeOutAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_ATTACKR"));
                }
            }, 900);

            const dangle = getPlayerAngle(this.aiId) - getAngleToTarget(this.aiId, this.victimId)
            if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && dangle > -20 && dangle < 20) {
                revmp.attack(this.aiId, this.victimId);
            }
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
        if (Date.now() > this.startTime + this.waitTime) {
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
        if (revmp.valid(this.targetId)) {

            const position = revmp.getPosition(this.aiId).position;
            const targetPosition = revmp.getPosition(this.targetId).position;
            const y = getAngleToTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)

        }
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
        if (revmp.valid(this.targetId)) {

            const position = revmp.getPosition(this.aiId).position;
            const targetPosition = revmp.getPosition(this.targetId).position;
            const y = getAngleToTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)
            if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }

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
    npcPosition: IPositionComponent
    targetX: number
    targetY: number
    targetZ: number

    constructor(npcPosition: IPositionComponent, x: number, y: number, z: number) {
        this.aiId = npcPosition.entityId
        this.npcPosition = npcPosition
        this.shouldLoop = true
        this.targetX = x
        this.targetY = y
        this.targetZ = z
    }


    public executeAction(): void {
        gotoPosition(this.npcPosition, this.targetX, this.targetY, this.targetZ)
        const pos: revmp.Vec3 = revmp.getPosition(this.aiId).position
        if (getPointDistance(pos[0], pos[1], pos[2], this.targetX, this.targetY, this.targetZ) < 100) {
            if (isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
            this.shouldLoop = false
        }
        else {
            const y = getAngleToPoint(pos[0], pos[2], this.targetX, this.targetZ)
            setPlayerAngle(this.aiId, y)
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
        }

    }
}

export class GotoPoint implements IAiAction {

    aiId: number
    shouldLoop: boolean
    aiState: AiState
    targetPoint: string | undefined
    startPoint: string
    routeIndex: number
    wayroute: Array<Waypoint> | undefined
    aiPos: IPositionComponent | undefined

    constructor(aiId: number, aiState: AiState, targetWaypoint: string) {
        this.aiId = aiId
        this.shouldLoop = true
        this.aiState = aiState

        const waynet: IWaynet = this.aiState.getWaynet()
        const newestPos: revmp.Vec3 = revmp.getPosition(this.aiId).position
        this.aiPos = this.aiState.getEntityManager().getPositionsComponents(this.aiId)

        let nearestWp: Waypoint | undefined; 
        if (typeof this.aiPos !== 'undefined') {
            this.aiPos.currentPosX = newestPos[0]
            this.aiPos.currentPosY = newestPos[1]
            this.aiPos.currentPosZ = newestPos[2]
            nearestWp = waynet.getNearestWaypoint(this.aiPos.currentPosX, this.aiPos.currentPosY, this.aiPos.currentPosZ)
        }

        this.startPoint = ""
        if (typeof nearestWp !== 'undefined') {
            this.startPoint = nearestWp.wpName
        }


        // if a freepoint is given, find nearest wp and calculate the route to the nearest wp
        // put freepoint to the wayroute as last destination
        if (Array.from(waynet.waypoints.keys()).includes(targetWaypoint)) {
            this.targetPoint = targetWaypoint
            this.wayroute = waynet.getWayroute(this.startPoint, this.targetPoint)
        } else {
            const targetFp = waynet.freepoints.find(fp => fp.fpName === targetWaypoint)
            if (typeof targetFp !== 'undefined') {
                const nearestEndWp: Waypoint | undefined = waynet.getNearestWaypoint(targetFp.x, targetFp.y, targetFp.z)
                let nearestEndWpName = ""
                if (typeof nearestEndWp !== 'undefined') {
                    nearestEndWpName = nearestEndWp.wpName
                }
                this.wayroute = waynet.getWayroute(this.startPoint, nearestEndWpName)
                const fpToWp: Waypoint = { wpName: "TMP_WAYPOINT", x: targetFp.x, y: targetFp.y, z: targetFp.z, rotX: targetFp.rotX, rotY: targetFp.rotY, otherWps: [nearestEndWpName] }
                this.wayroute.push(fpToWp)
            }
            else {
                this.shouldLoop = false
            }
        }
        this.routeIndex = 0
    }

    public executeAction(): void {
        if (typeof this.wayroute !== 'undefined' && typeof this.aiPos !== 'undefined' && this.routeIndex < this.wayroute.length) {
            const wpToVisit: Waypoint = this.wayroute[this.routeIndex]
            gotoPosition(this.aiPos, wpToVisit.x, wpToVisit.y, wpToVisit.z)

            const newPos: revmp.Vec3 = revmp.getPosition(this.aiId).position
            if (getPointDistance(newPos[0], newPos[1], newPos[2], wpToVisit.x, wpToVisit.y, wpToVisit.z) < 100) {
                this.routeIndex++
            }
            else {
                const y = getAngleToPoint(newPos[0], newPos[2], wpToVisit.x, wpToVisit.z)
                setPlayerAngle(this.aiId, y)
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
        }
        else {
            if (isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
            this.shouldLoop = false
        }
    }
}


export interface WarnEnemyActionInput {

    aiId: number,
    enemyId: number,
    waitTime: number,
    startTime: number,
    warnDistance: number,
    attackDistance: number,
    entityManager: EntityManager

}

export class WarnEnemy implements IAiAction {

    aiId: number
    shouldLoop: boolean
    enemyId: number
    waitTime: number
    startTime: number
    warnDistance: number
    attackDistance: number
    entityManager: EntityManager

    constructor(input: WarnEnemyActionInput) {
        this.aiId = input.aiId
        this.enemyId = input.enemyId
        this.shouldLoop = true
        this.waitTime = input.waitTime
        this.startTime = input.startTime
        this.warnDistance = input.warnDistance
        this.attackDistance = input.attackDistance
        this.entityManager = input.entityManager
    }

    public executeAction(): void {
        if (revmp.valid(this.enemyId)) {

            const position = revmp.getPosition(this.aiId).position;
            const targetPosition = revmp.getPosition(this.enemyId).position;
            const y = getAngleToTarget(this.aiId, this.enemyId)
            setPlayerAngle(this.aiId, y)

            if (Date.now() > this.startTime + this.waitTime) {
                this.setEnemy()
            }
            const distance = getDistance(this.aiId, this.enemyId)
            if (distance < this.warnDistance) {
                revmp.startAnimation(this.aiId, "T_WARN")
            }
            else if (distance < this.attackDistance) {
                this.setEnemy()
            }


        }
        else {
            this.shouldLoop = false
        }
    }

    private setEnemy(): void {
        this.shouldLoop = false
        const enemyComponent: IEnemyComponent = { entityId: this.aiId, enemyId: this.enemyId }
        this.entityManager.setEnemyComponent(this.aiId, enemyComponent)
    }
}

export class PlayAnimationForDuration implements IAiAction {
    aiId: number
    shouldLoop: boolean
    duration: number
    animationName: string
    startTime: number


    constructor(aiId: number, animationName: string, duration: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.duration = duration
        this.animationName = animationName
        this.startTime = Date.now()
    }

    public executeAction(): void {
        if (!isAniPlaying(this.aiId, this.animationName)) {
            revmp.startAnimation(this.aiId, this.animationName)
        }
        if (Date.now() > this.startTime + this.duration) {
            revmp.stopAnimation(this.aiId, this.animationName)
            this.shouldLoop = false
        }
    }
}

