"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAniPlaying = exports.getAngleDistance = exports.getDistance = exports.getAngle = void 0;
const gl_matrix_1 = require("gl-matrix");
// https://stackoverflow.com/a/9614122/10637905
function getAngle(x1, y1, x2, y2) {
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
exports.getAngle = getAngle;
function getDistance(entity1, entity2) {
    const position1 = revmp.getPosition(entity1).position;
    const position2 = revmp.getPosition(entity2).position;
    return gl_matrix_1.vec3.distance(position1, position2);
}
exports.getDistance = getDistance;
function getAngleDistance(entity1, entity2) {
    const rotation1 = revmp.getRotation(entity1).rotation;
    const rotation2 = revmp.getRotation(entity2).rotation;
    return gl_matrix_1.quat.getAngle(rotation1, rotation2);
}
exports.getAngleDistance = getAngleDistance;
function isAniPlaying(entity, ani) {
    return revmp.getAnimations(entity)
        .activeAnis.find(a => a.ani.name === ani && !a.isFadingOut) !== undefined;
}
exports.isAniPlaying = isAniPlaying;
