

import { IAiAction } from "../iAiAction";
import { setPlayerAngle, getCombatStateBasedAni, getAngleToPoint, getDistance, isAniPlaying, getWaynetPointAngle, getDistanceToPoint, isTargetInFrontOfEntity, getNecessaryAngleToWatchTarget } from "../../aiFunctions/aiUtils";
import { gotoPosition, getDistance as getPointDistance } from "../../waynet/positionFunctions";
import { IAiPosition } from "../components/iAiPosition";
import { AiState } from "../../aiStates/aiState";
import { IWaynet, Waypoint } from "../../waynet/iwaynet";
import { IAiEnemyInfo } from "../components/iAiEnemyInfo";
import { isOpponentinAiAngleRange } from "../../aiStates/aiStateFunctions/commonAiStateQueries";
import { getAiAction, getAiPosition, getWaynet, setAiActionIfUndefined, setAiEnemyInfo } from "../../aiStates/aiStateFunctions/commonAiStateFunctions";

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
            const isEntityInEnemyAngleRange = isOpponentinAiAngleRange(this.aiId, this.victimId)
            if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && isEntityInEnemyAngleRange) {
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


            const isEntityInEnemyAngleRange = isOpponentinAiAngleRange(this.aiId, this.victimId)
            if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && isEntityInEnemyAngleRange) {
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

            const isEntityInEnemyAngleRange = isOpponentinAiAngleRange(this.aiId, this.victimId)
            if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && isEntityInEnemyAngleRange) {
                revmp.attack(this.aiId, this.victimId);
            }
        }
    }
}
export class WaitAction implements IAiAction {

    aiId: number
    shouldLoop: boolean
    waitTime: number
    startTime: number | undefined

    constructor(aiId: number, waitTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.waitTime = waitTime

    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
        }

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
            const y = getNecessaryAngleToWatchTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)
        }
    }
}

export class RunToTargetAction implements IAiAction {
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
            const y = getNecessaryAngleToWatchTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)
            if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }

        }
    }
}


export class ThreatenPlayerAction implements IAiAction {
    aiId: number
    shouldLoop: boolean
    targetId: number
    chaseDistance: number
    waitTime: number
    startTime: number | undefined
    aiState: AiState 
    timesWarned: number
    aiName: string

    constructor(aiState: AiState, aiId: number, targetId: number, chaseDistance: number, waitTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.targetId = targetId
        this.chaseDistance = chaseDistance
        this.waitTime = waitTime
        this.aiState = aiState
        this.timesWarned = 0
        this.aiName = revmp.getName(this.aiId).name ?? "Enemy"
    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            this.sendMessageToNearbyPlayers(this.aiName + ": " + "Hey idiot! What was that stupid look of yours?")
            this.timesWarned++
        }
        if (revmp.valid(this.targetId) && Date.now() < this.startTime + this.waitTime) {
            const y = getNecessaryAngleToWatchTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)
            const distance = getDistance(this.aiId, this.targetId)

            if (Date.now() > this.startTime + this.waitTime / 2 && this.timesWarned === 1) {
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "EY fuck face! I'm talking to YOU!")
                this.timesWarned++
            }

            if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL")) && distance > this.chaseDistance) {
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
            else if (distance < this.chaseDistance) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }

        }
        else if (Date.now() > this.startTime + this.waitTime) {
            this.sendMessageToNearbyPlayers(this.aiName + ": " + "I've had enough. Let's teach you a lesson!")
            this.shouldLoop = false
            this.setEnemy()
        }
        else {
            this.shouldLoop = false
        }
    }

    private setEnemy(): void {
        this.shouldLoop = false
        const enemyComponent: IAiEnemyInfo = { entityId: this.aiId, enemyId: this.targetId, lastAttackTime: 0 }
        setAiEnemyInfo(this.aiState, enemyComponent)
    }

    private sendMessageToNearbyPlayers(message: string): void {
        revmp.players.forEach(player => {
            const distance = getDistance(this.aiId, player)
            if (distance < this.chaseDistance * 4) {
                revmp.sendChatMessage(player, message)
            }
        })

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
        if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "T_RUNSTRAFER"))) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_RUNSTRAFER"))
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
    npcPosition: IAiPosition
    targetX: number
    targetY: number
    targetZ: number

    constructor(npcPosition: IAiPosition, x: number, y: number, z: number) {
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
            //todo: this stuff is wrong, remove it or analyse it
            const y = getWaynetPointAngle(pos[0], pos[2], this.targetX, this.targetZ)
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
    aiPos: IAiPosition | undefined
    walkAni: string

    constructor(aiId: number, aiState: AiState, targetWaypoint: string, walkAni: string) {
        this.aiId = aiId
        this.shouldLoop = true
        this.aiState = aiState
        this.walkAni = walkAni

        const waynet: IWaynet = getWaynet(this.aiState)
        const newestPos: revmp.Vec3 = revmp.getPosition(this.aiId).position
        this.aiPos = getAiPosition(this.aiState, this.aiId)

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
                const fpToWp: Waypoint = { wpName: "TMP_WAYPOINT", x: targetFp.x, y: targetFp.y, z: targetFp.z, rotX: targetFp.rotX, rotZ: targetFp.rotZ, otherWps: [nearestEndWpName] }

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
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, this.walkAni))
            }
        }
        else {
            if (isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, this.walkAni))) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, this.walkAni))
            }
            this.shouldLoop = false
            //const y = getAngleToPoint(wpToVisit.x, wpToVisit.z, wpToVisit.x + wpToVisit.rotX, wpToVisit.z + wpToVisit.rotZ)
            if (typeof this.wayroute !== 'undefined' && this.routeIndex === this.wayroute.length) {
                const targetWp = this.wayroute[this.wayroute.length - 1]
                const playerPos = revmp.getPosition(this.aiId).position
                const spawnAngle = getWaynetPointAngle(playerPos[0], playerPos[2], targetWp.rotX, targetWp.rotZ)
                setPlayerAngle(this.aiId, spawnAngle)
            }

        }
    }
}


export interface WarnEnemyActionInput {

    aiId: number,
    enemyId: number,
    waitTime: number,
    warnDistance: number,
    attackDistance: number,
    aiState: AiState 

}

export class WarnEnemy implements IAiAction {

    aiId: number
    shouldLoop: boolean
    enemyId: number
    waitTime: number
    startTime: number | undefined
    warnDistance: number
    attackDistance: number
    aiState: AiState 

    constructor(input: WarnEnemyActionInput) {
        this.aiId = input.aiId
        this.enemyId = input.enemyId
        this.shouldLoop = true
        this.waitTime = input.waitTime
        this.warnDistance = input.warnDistance
        this.attackDistance = input.attackDistance
        this.aiState = input.aiState
    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
        }
        if (revmp.valid(this.enemyId)) {

            const y = getNecessaryAngleToWatchTarget(this.aiId, this.enemyId)
            setPlayerAngle(this.aiId, y)

            const distance = getDistance(this.aiId, this.enemyId)

            if (Date.now() > this.startTime + this.waitTime && distance < this.warnDistance) {
                this.setEnemy()
            }
            if (distance < this.warnDistance) {
                revmp.startAnimation(this.aiId, "T_WARN")
            }
            else if (distance < this.attackDistance) {
                this.setEnemy()
            }
            else {
                this.shouldLoop = false
            }


        }
        else {
            this.shouldLoop = false
        }
    }

    private setEnemy(): void {
        this.shouldLoop = false
        const enemyComponent: IAiEnemyInfo = { entityId: this.aiId, enemyId: this.enemyId, lastAttackTime: 0 }
        setAiEnemyInfo(this.aiState, enemyComponent)
    }
}

export class PlayAnimationForDuration implements IAiAction {
    aiId: number
    shouldLoop: boolean
    duration: number
    animationName: string
    startTime: number | undefined


    constructor(aiId: number, animationName: string, duration: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.duration = duration
        this.animationName = animationName
    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
        }
        if (!isAniPlaying(this.aiId, this.animationName)) {
            revmp.startAnimation(this.aiId, this.animationName)
        }
        if (Date.now() > this.startTime + this.duration) {
            revmp.stopAnimation(this.aiId, this.animationName)
            this.shouldLoop = false
        }
    }
}


export class PlayAnimation implements IAiAction {
    aiId: number
    shouldLoop: boolean
    animationName: string


    constructor(aiId: number, animationName: string) {
        this.aiId = aiId
        this.shouldLoop = false
        this.animationName = animationName
    }

    public executeAction(): void {
        revmp.startAnimation(this.aiId, this.animationName)
    }
}

export class StopAnimation implements IAiAction {
    aiId: number
    shouldLoop: boolean
    animationName: string


    constructor(aiId: number, animationName: string) {
        this.aiId = aiId
        this.shouldLoop = false
        this.animationName = animationName
    }

    public executeAction(): void {
        revmp.stopAnimation(this.aiId, this.animationName)
    }
}

export class SimpleAction implements IAiAction {

    aiId: number
    shouldLoop: boolean
    simpleAction: () => void

    constructor(aiId: number, simpleAction: () => void) {
        this.aiId = aiId
        this.shouldLoop = false
        this.simpleAction = simpleAction
    }

    public executeAction(): void {
        this.simpleAction()
    }
}

export class GotoStartPointOnDistanceAction implements IAiAction {

    aiId: number
    shouldLoop: boolean
    aiState: AiState
    distance: number

    constructor(aiId: number, aiState: AiState, distance: number) {
        this.aiId = aiId
        this.shouldLoop = false
        this.aiState = aiState
        this.distance = distance
    }
    executeAction(): void {
        const startPoint = getAiPosition(this.aiState, this.aiId)?.startPoint
        const startWayPoint = typeof startPoint !== 'undefined' ? getWaynet(this.aiState).waypoints.get(startPoint) : undefined
        let pointVec: revmp.Vec3 | undefined = undefined;

        if (typeof startWayPoint === 'undefined') {
            const startFreepoint = getWaynet(this.aiState).freepoints.find(fp => fp.fpName === startPoint)
            if (typeof startFreepoint !== 'undefined') {
                pointVec = [startFreepoint.x, startFreepoint.y, startFreepoint.z]
            }
        }
        else {
            pointVec = [startWayPoint.x, startWayPoint.y, startWayPoint.z]
        }

        if (typeof pointVec !== 'undefined' && typeof startPoint !== 'undefined' && getDistanceToPoint(this.aiId, pointVec) > this.distance) {
            setAiActionIfUndefined(this.aiState, new GotoPoint(this.aiId, this.aiState, startPoint, "S_RUNL"))
        }
    }

}
