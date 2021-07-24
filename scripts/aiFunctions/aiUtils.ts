
import { quat, vec3 } from "gl-matrix";
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

export function isAniPlaying(entity: revmp.Entity, ani: string) {
    return revmp.getAnimations(entity)
        .activeAnis.find(a => a.ani.name === ani && !a.isFadingOut) !== undefined;
}
