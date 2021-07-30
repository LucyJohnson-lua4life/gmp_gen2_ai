
import { quat, vec3 } from "gl-matrix";
import * as THREE from 'three';
 // https://stackoverflow.com/a/9614122/10637905
export function getAngle(x1: number, y1: number, x2: number, y2: number): number {
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

export function getAngleToTarget(entityId1: number, entityId2: number): number {
    const position1 = revmp.getPosition(entityId1).position;
    const position2 = revmp.getPosition(entityId2).position;
    return getAngle(position1[0],position1[2],position2[0],position2[2])
}

export function getDistance(entity1:number, entity2: number){
    const position1 = revmp.getPosition(entity1).position;
    const position2 = revmp.getPosition(entity2).position;
    return vec3.distance(position1, position2);
}

export function getAngleDistance(entity1: number, entity2: number) {
    const rotation1 = revmp.getRotation(entity1).rotation;
    const rotation2 = revmp.getRotation(entity2).rotation;
    return quat.getAngle(rotation1, rotation2);
}

export function getPlayerAngle(entity1: number) {
    const rotation = revmp.getRotation(entity1).rotation;
    const quaternion = new THREE.Quaternion(rotation[0], rotation[1], rotation[2], rotation[3]);
    const euler =  new THREE.Euler().setFromQuaternion(quaternion);

    let angle = euler.y * 180 / Math.PI
    if(euler.x >= 0 && euler.y <0){
        angle = angle + 360
    }
    else if(euler.x < 0 && euler.y < 0){
        angle = 180 + (-1*angle)
    }
    else if(euler.x >= 0 && euler.y > 0){
        angle = angle
    }
    else if (euler.x < 0 && euler.y > 0) {
        angle = 180 - angle
    }


    return angle
}

export function isAniPlaying(entity: revmp.Entity, ani: string) {
    return revmp.getAnimations(entity)
        .activeAnis.find(a => a.ani.name === ani && !a.isFadingOut) !== undefined;
}
export function setAngle(entity: number, angle: number) {
    const rot = quat.create();
    quat.fromEuler(rot, 0, angle, 0);
    revmp.setRotation(entity, rot);
}
