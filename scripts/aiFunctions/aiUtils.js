"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAttackable = exports.getCombatStateBasedAni = exports.setPlayerAngle = exports.isAniPlaying = exports.getPlayerAngle = exports.getDistanceToPoint = exports.getDistance = exports.getAngleToTarget = exports.getAngleToPoint = void 0;
const gl_matrix_1 = require("gl-matrix");
const THREE = require("three");
// https://stackoverflow.com/a/9614122/10637905
/**
 * Returns the angle from two points. Or in relationship with npc's it describes the angle the npc1 needs to look to npc2.
 * @param x1 x-value of the first 2D point
 * @param y1 y-value of the first 2D point
 * @param x2 x-value of the second 2D point
 * @param y2 y-value of the second 2D point
 */
function getAngleToPoint(x1, y1, x2, y2) {
    const dy = y2 - y1;
    const dx = x2 - x1;
    let theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) {
        theta = 360 + theta; // range [0, 360)
    }
    // Avoid minus range
    if (theta < 90) {
        theta += 360;
    }
    return theta - 90; // Idk why Gothic needs -90
}
exports.getAngleToPoint = getAngleToPoint;
/**
 * Returns the the angle that is necessary so that npc1 looks to npc2
 * @param entityId1 id of the first npc
 * @param entityId2 id of the second npc
 */
function getAngleToTarget(entityId1, entityId2) {
    const position1 = revmp.getPosition(entityId1).position;
    const position2 = revmp.getPosition(entityId2).position;
    return getAngleToPoint(position1[0], position1[2], position2[0], position2[2]);
}
exports.getAngleToTarget = getAngleToTarget;
/**
 * Returns the the distance between 2 npcs.
 * @param entityId1 id of the first npc
 * @param entityId2 id of the second npc
 */
function getDistance(entityId1, entityId2) {
    const position1 = revmp.getPosition(entityId1).position;
    const position2 = revmp.getPosition(entityId2).position;
    return gl_matrix_1.vec3.distance(position1, position2);
}
exports.getDistance = getDistance;
/**
   Returns the distance between a character and a waypoint/freepoint
 * @param entityId id of the first npc
 * @param point waypoint/freepoint
 */
function getDistanceToPoint(entityId, point) {
    const characterPosition = revmp.getPosition(entityId).position;
    return gl_matrix_1.vec3.distance(point, characterPosition);
}
exports.getDistanceToPoint = getDistanceToPoint;
/**
 * Get angle of the given entityId
 * @param entityId id of the entity for which the angle should be calculated.
 */
function getPlayerAngle(entityId) {
    const rotation = revmp.getRotation(entityId).rotation;
    const quaternion = new THREE.Quaternion(rotation[0], rotation[1], rotation[2], rotation[3]);
    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    let angle = euler.y * 180 / Math.PI;
    if (euler.x >= 0 && euler.y < 0) {
        angle = angle + 360;
    }
    else if (euler.x < 0 && euler.y < 0) {
        angle = 180 + (-1 * angle);
    }
    else if (euler.x >= 0 && euler.y > 0) {
        angle = angle;
    }
    else if (euler.x < 0 && euler.y > 0) {
        angle = 180 - angle;
    }
    return angle;
}
exports.getPlayerAngle = getPlayerAngle;
/**
 * Returns true if the given entity plays the given animation, otherwise false.
 * @param entity entity for which the animation should be checked.
 * @param ani name of the animation.
 */
function isAniPlaying(entity, ani) {
    return revmp.getAnimations(entity)
        .activeAnis.find(a => a.ani.name === ani && !a.isFadingOut) !== undefined;
}
exports.isAniPlaying = isAniPlaying;
/**
 * Sets the angle of the entity.
 * @param entityId id of the entity for which the angle should be set.
 * @param angle the angle to which the entity should be set.
 */
function setPlayerAngle(entityId, angle) {
    const rot = gl_matrix_1.quat.create();
    gl_matrix_1.quat.fromEuler(rot, 0, angle, 0);
    revmp.setRotation(entityId, rot);
}
exports.setPlayerAngle = setPlayerAngle;
/**
 * Returns the animation name.
 * @param entityId id of the entity for which the angle should be set.
 * @param angle the angle to which the entity should be set.
 */
function getCombatStateBasedAni(entity, ani) {
    const index = ani.indexOf('_');
    if (index == -1) {
        return ani;
    }
    let weaponMode = revmp.getCombatState(entity).weaponMode;
    if (weaponMode === revmp.WeaponMode.Fist || weaponMode === revmp.WeaponMode.None) {
        return ani.slice(0, index + 1) + 'FIST' + ani.slice(index + 1);
    }
    else if (weaponMode === revmp.WeaponMode.OneHand) {
        return ani.slice(0, index + 1) + '1H' + ani.slice(index + 1);
    }
    else if (weaponMode === revmp.WeaponMode.TwoHand) {
        return ani.slice(0, index + 1) + '2H' + ani.slice(index + 1);
    }
    else if (weaponMode === revmp.WeaponMode.Bow) {
        return ani.slice(0, index + 1) + 'BOW' + ani.slice(index + 1);
    }
    else if (weaponMode === revmp.WeaponMode.Crossbow) {
        return ani.slice(0, index + 1) + 'CBOW' + ani.slice(index + 1);
    }
    else {
        return ani;
    }
    return ani.slice(0, index + 1) + '2H' + ani.slice(index + 1);
}
exports.getCombatStateBasedAni = getCombatStateBasedAni;
function isAttackable(entityId) {
    return revmp.isCharacter(entityId) && revmp.getHealth(entityId).current > 0 && revmp.getCombatState(entityId).unconscious === false;
}
exports.isAttackable = isAttackable;
