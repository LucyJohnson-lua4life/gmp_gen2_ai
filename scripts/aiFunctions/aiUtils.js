"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAngle = void 0;
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
