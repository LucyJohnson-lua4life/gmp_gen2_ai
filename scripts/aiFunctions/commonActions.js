"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarnEnemy = exports.GotoPoint = exports.GotoPosition = exports.SRunParadeJump = exports.SRunStrafeRight = exports.SRunStrafeLeft = exports.RunForward = exports.RunToTargetAction = exports.TurnToTargetAction = exports.WaitAction = exports.SFistAttackAction = void 0;
const aiUtils_1 = require("../aiFunctions/aiUtils");
const positionFunctions_1 = require("../waynet/positionFunctions");
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
        if (Date.now() > this.startTime + this.waitTime) {
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
        aiUtils_1.setPlayerAngle(this.aiId, y);
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
        aiUtils_1.setPlayerAngle(this.aiId, y);
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
            aiUtils_1.setPlayerAngle(this.aiId, y);
            revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"));
        }
    }
}
exports.GotoPosition = GotoPosition;
class GotoPoint {
    constructor(aiId, aiState, targetWaypoint) {
        this.aiId = aiId;
        this.shouldLoop = true;
        this.aiState = aiState;
        let waynet = this.aiState.getWaynet();
        let newestPos = revmp.getPosition(this.aiId).position;
        this.aiPos = this.aiState.getEntityManager().getPositionsComponents(this.aiId);
        this.aiPos.currentPosX = newestPos[0];
        this.aiPos.currentPosY = newestPos[1];
        this.aiPos.currentPosZ = newestPos[2];
        this.startPoint = waynet.getNearestWaypoint(this.aiPos.currentPosX, this.aiPos.currentPosY, this.aiPos.currentPosZ).wpName;
        // if a freepoint is given, find nearest wp and calculate the route to the nearest wp
        // put freepoint to the wayroute as last destination
        if (Array.from(waynet.waypoints.keys()).includes(targetWaypoint)) {
            this.targetPoint = targetWaypoint;
            this.wayroute = waynet.getWayroute(this.startPoint, this.targetPoint);
        }
        else {
            let targetFp = waynet.freepoints.find(fp => fp.fpName === targetWaypoint);
            if (typeof targetFp !== 'undefined') {
                let nearestEndWp = waynet.getNearestWaypoint(targetFp.x, targetFp.y, targetFp.z);
                this.wayroute = waynet.getWayroute(this.startPoint, nearestEndWp.wpName);
                let fpToWp = { wpName: "TMP_WAYPOINT", x: targetFp.x, y: targetFp.y, z: targetFp.z, rotX: targetFp.rotX, rotY: targetFp.rotY, otherWps: [nearestEndWp.wpName] };
                this.wayroute.push(fpToWp);
            }
            else {
                this.shouldLoop = false;
            }
        }
        this.routeIndex = 0;
    }
    executeAction() {
        if (this.routeIndex < this.wayroute.length) {
            let wpToVisit = this.wayroute[this.routeIndex];
            positionFunctions_1.gotoPosition(this.aiPos, wpToVisit.x, wpToVisit.y, wpToVisit.z);
            let newPos = revmp.getPosition(this.aiId).position;
            if (positionFunctions_1.getDistance(newPos[0], newPos[1], newPos[2], wpToVisit.x, wpToVisit.y, wpToVisit.z) < 100) {
                this.routeIndex++;
            }
            else {
                const y = aiUtils_1.getAngleToPoint(newPos[0], newPos[2], wpToVisit.x, wpToVisit.z);
                aiUtils_1.setPlayerAngle(this.aiId, y);
                revmp.startAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"));
            }
        }
        else {
            if (aiUtils_1.isAniPlaying(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"))) {
                revmp.stopAnimation(this.aiId, aiUtils_1.getCombatStateBasedAni(this.aiId, "S_RUNL"));
            }
            this.shouldLoop = false;
        }
    }
}
exports.GotoPoint = GotoPoint;
class WarnEnemy {
    constructor(input) {
        this.aiId = input.aiId;
        this.enemyId = input.enemyId;
        this.shouldLoop = true;
        this.waitTime = input.waitTime;
        this.startTime = input.startTime;
        this.warnDistance = input.warnDistance;
        this.attackDistance = input.attackDistance;
        this.entityManager = input.entityManager;
    }
    executeAction() {
        const position = revmp.getPosition(this.aiId).position;
        const targetPosition = revmp.getPosition(this.enemyId).position;
        const y = aiUtils_1.getAngleToTarget(this.aiId, this.enemyId);
        aiUtils_1.setPlayerAngle(this.aiId, y);
        if (Date.now() > this.startTime + this.waitTime) {
            this.setEnemy();
        }
        let distance = aiUtils_1.getDistance(this.aiId, this.enemyId);
        if (distance < this.warnDistance) {
            revmp.startAnimation(this.aiId, "T_WARN");
        }
        else if (distance < this.attackDistance) {
            this.setEnemy();
        }
    }
    setEnemy() {
        this.shouldLoop = false;
        let enemyComponent = { entityId: this.aiId, enemyId: this.enemyId };
        this.entityManager.setEnemyComponent(this.aiId, enemyComponent);
    }
}
exports.WarnEnemy = WarnEnemy;
