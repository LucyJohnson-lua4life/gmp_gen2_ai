
import { quat, vec3 } from "gl-matrix";
import * as THREE from 'three';
import { Waypoint } from "../waynet/iwaynet";
// https://stackoverflow.com/a/9614122/10637905
/**
 * Returns the angle from two points. Or in relationship with npc's it describes the angle the npc1 needs to look to npc2.
 * @param x1 x-value of the first 2D point
 * @param y1 y-value of the first 2D point
 * @param x2 x-value of the second 2D point
 * @param y2 y-value of the second 2D point
 */
export function getAngleToPoint(x1: number, y1: number, x2: number, y2: number): number {
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


/**
 * Returns the the angle that is necessary so that npc1 looks to npc2
 * @param entityId1 id of the first npc
 * @param entityId2 id of the second npc
 */
export function getAngleToTarget(entityId1: number, entityId2: number): number {
    const position1 = revmp.getPosition(entityId1).position;
    const position2 = revmp.getPosition(entityId2).position;
    return getAngleToPoint(position1[0], position1[2], position2[0], position2[2])
}

/**
 * Returns the the distance between 2 npcs.
 * @param entityId1 id of the first npc
 * @param entityId2 id of the second npc
 */
export function getDistance(entityId1: number, entityId2: number) {
    const position1 = revmp.getPosition(entityId1).position;
    const position2 = revmp.getPosition(entityId2).position;
    return vec3.distance(position1, position2);
}

/**
   Returns the distance between a character and a waypoint/freepoint
 * @param entityId id of the first npc
 * @param point waypoint/freepoint
 */
export function getDistanceToPoint(entityId: number, point:revmp.Vec3) {
    const characterPosition = revmp.getPosition(entityId).position;
    return vec3.distance(point,characterPosition);
}

/**
 * Get angle of the given entityId
 * @param entityId id of the entity for which the angle should be calculated.
 */
export function getPlayerAngle(entityId: number) {
    const rotation = revmp.getRotation(entityId).rotation;
    const quaternion = new THREE.Quaternion(rotation[0], rotation[1], rotation[2], rotation[3]);
    const euler = new THREE.Euler().setFromQuaternion(quaternion);

    let angle = euler.y * 180 / Math.PI
    if (euler.x >= 0 && euler.y < 0) {
        angle = angle + 360
    }
    else if (euler.x < 0 && euler.y < 0) {
        angle = 180 + (-1 * angle)
    }
    else if (euler.x >= 0 && euler.y > 0) {
        angle = angle
    }
    else if (euler.x < 0 && euler.y > 0) {
        angle = 180 - angle
    }


    return angle
}

/**
 * Returns true if the given entity plays the given animation, otherwise false.
 * @param entity entity for which the animation should be checked.
 * @param ani name of the animation.
 */
export function isAniPlaying(entity: revmp.Entity, ani: string) {
    return revmp.getAnimations(entity)
        .activeAnis.find(a => a.ani.name === ani && !a.isFadingOut) !== undefined;
}
/**
 * Sets the angle of the entity.
 * @param entityId id of the entity for which the angle should be set.
 * @param angle the angle to which the entity should be set.
 */
export function setPlayerAngle(entityId: number, angle: number) {
    const rot = quat.create();
    quat.fromEuler(rot, 0, angle, 0);
    revmp.setRotation(entityId, rot);
}

/**
 * Returns the animation name.
 * @param entityId id of the entity for which the angle should be set.
 * @param angle the angle to which the entity should be set.
 */
export function getCombatStateBasedAni(entity: revmp.Entity, ani: string) {
    const index = ani.indexOf('_');
    if (index == -1) {
        return ani
    }

    const weaponMode = revmp.getCombatState(entity).weaponMode;

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
        return ani
    }
    return ani.slice(0, index + 1) + '2H' + ani.slice(index + 1);
}

export function isAttackable(entityId: number){
    return revmp.isCharacter(entityId) && revmp.getHealth(entityId).current > 0 && revmp.getCombatState(entityId).unconscious ===false
}
