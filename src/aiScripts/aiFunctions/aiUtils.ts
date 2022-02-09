import * as THREE from 'three';
// https://stackoverflow.com/a/9614122/10637905
/**
 * Returns the angle from two points. Or in relationship with npc's it describes the angle the npc1 needs to look to npc2.
 * @param x1 x-value of the first 2D point
 * @param y1 y-value of the first 2D point
 * @param x2 x-value of the second 2D point
 * @param y2 y-value of the second 2D point
 */
export function getRadiansAngleToPoint(x1: number, y1: number, x2: number, y2: number): number {
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
    const angleInDegrees = theta - 90; // Idk why Gothic needs -90
    return angleInDegrees * (Math.PI / 180)
}

export function getWaynetPointRadiansAngle(playerX: number, playerZ: number, waynetPointDirX: number, waynetPointDirY: number): number {
    const x1 = playerX
    const x2 = playerX + waynetPointDirX
    const y1 = playerZ
    const y2 = playerZ + waynetPointDirY

    if (x1 == x2 && y1 == y2) {
        return 0;
    }
    const x = x2 - x1
    const y = y2 - y1

    let angle = Math.atan(Math.abs(y) / Math.abs(x)) * 180.0 / 3.14;

    if (x < 0 && y > 0) {
        angle = 180 - angle
    }
    else if (x < 0 && y < 0) {

        angle = angle + 180
    }
    else if (x > 0 && y < 0) {
        angle = 360 - angle
    }
    return angle * (Math.PI/180)
}


/**
 * Returns the the angle that is necessary so that npc1 looks to npc2 in radians.
 * @param entityId1 id of the first npc
 * @param entityId2 id of the second npc
 */
export function getNecessaryAngleToWatchTarget(entityId1: number, entityId2: number): number {
    const position1 = revmp.getPosition(entityId1).position;
    const position2 = revmp.getPosition(entityId2).position;
    return getRadiansAngleToPoint(position1[0], position1[2], position2[0], position2[2])
}

export function isTargetInFrontOfEntity(entityId: number, targetId: number): boolean {
    const entityRevRotation = revmp.getRotation(entityId).rotation
    const entityQuat = new THREE.Quaternion(entityRevRotation[0], entityRevRotation[1], entityRevRotation[2], entityRevRotation[3])

    const compareQuat = new THREE.Quaternion()
    compareQuat.setFromEuler(new THREE.Euler(0, getNecessaryAngleToWatchTarget(entityId, targetId),0, 'XYZ'))

    return entityQuat.angleTo(compareQuat) < 0.2
}


/**
 * Returns the the distance between 2 npcs.
 * @param entityId1 id of the first npc
 * @param entityId2 id of the second npc
 */
export function getDistance(entityId1: number, entityId2: number) {
    const position1 = revmp.getPosition(entityId1).position;
    const position2 = revmp.getPosition(entityId2).position;

    const x = position1[0] - position2[0]
    const y = position1[1] - position2[1]
    const z = position1[2] - position2[2]

    return Math.sqrt((x * x) + (y * y) + (z * z));
}

/**
   Returns the distance between a character and a waypoint/freepoint
 * @param entityId id of the first npc
 * @param point waypoint/freepoint
 */
export function getDistanceToPoint(entityId: number, point: revmp.Vec3) {
    const characterPosition = revmp.getPosition(entityId).position;
    const x = characterPosition[0] - point[0]
    const y = characterPosition[1] - point[1]
    const z = characterPosition[2] - point[2]
    return Math.sqrt((x * x) + (y * y) + (z * z));
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
    else if (euler.x < 0 && euler.y > 0) {
        angle = 180 - angle
    }


    return angle
}

/**
 * Sets the angle of the entity.
 * @param entityId id of the entity for which the angle should be set.
 * @param angle the angle to which the entity should be set.
 */
export function setPlayerAngle(entityId: number, angle: number) {
    let rot = new THREE.Quaternion()
    rot = rot.setFromEuler(new THREE.Euler(0,angle,0,'XYZ'))
    revmp.setRotation(entityId, [rot.x, rot.y, rot.z, rot.w]);
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

    if (weaponMode === revmp.WeaponMode.Fist) {
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
}

export function isAttackable(entityId: number) {
    return revmp.isCharacter(entityId) && revmp.getHealth(entityId).current > 0 && revmp.getCombatState(entityId).unconscious === false
}

export function removeAllAnimations(entityId: number): void {
    revmp.getModel(entityId).activeAnis
        .map(ani => ani?.ani.name)
        .filter(aniName => typeof aniName === typeof 'string')
        .forEach(aniName => revmp.stopAnimation(entityId, aniName!)) // ! is necessary because ts can't detect previous filter.
}


export function isAlive(id: number): boolean {
    return revmp.getHealth(id).current > 0
}

export function hasMeleeWeapon(entityId: number): boolean {
    return revmp.valid(revmp.getEquipment(entityId).meleeWeapon)
}

export function sendChatMessageInRange(aiId: number, range: number, msg: string): void {

    revmp.players.forEach(playerInRange => {
        if (getDistance(aiId, playerInRange) < range) {
            revmp.sendChatMessage(playerInRange, msg)
        }
    })


}