"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gotoPosition = void 0;
function getDistance(x1, y1, z1, x2, y2, z2) {
    if ([x1, y1, z1, , x2, y2, z2].some((val) => (typeof val === 'undefined'))) {
        return 99999;
    }
    let x = x1 - x2;
    let y = y1 - y2;
    let z = z1 - z2;
    return Math.sqrt(x * x + y * y + z * z);
}
function gotoPosition(npc, x, y, z) {
    console.log("a: " + Date.now);
    console.log("b: " + npc.lastPosUpdate);
    if ((typeof npc.lastPosUpdate == 'undefined') || npc.lastPosUpdate == 0) {
        npc.lastPosUpdate = Date.now();
        npc.lastPosX = npc.currentPosX;
        npc.lastPosY = npc.currentPosY;
        npc.lastPosZ = npc.currentPosZ;
    }
    else if (npc.lastPosUpdate + 500 < Date.now()) {
        console.log("got in here");
        if (getDistance(npc.lastPosX, npc.lastPosY, npc.lastPosZ, npc.currentPosX, npc.currentPosY, npc.currentPosZ) < 2) {
            let timeDiff = Date.now() - npc.lastPosUpdate;
            let speed = (5 * 100) * (timeDiff / 1000.0);
            let dirX = x - npc.currentPosX;
            let dirY = y - npc.currentPosY;
            let dirZ = z - npc.currentPosZ;
            let distance = getDistance(npc.currentPosX, npc.currentPosY, npc.currentPosZ, x, y, z);
            if (speed > distance) {
                revmp.setPosition(npc.id, { x: x, y: y, z: z });
                npc.currentPosX = x;
                npc.currentPosY = y;
                npc.currentPosZ = z;
                console.log("set pos to " + x + " ," + y + " ," + z);
            }
            else {
                npc.currentPosX = npc.currentPosX + (dirX * speed);
                npc.currentPosY = npc.currentPosY + (dirY * speed);
                npc.currentPosZ = npc.currentPosZ + (dirZ * speed);
                revmp.setPosition(npc.id, { x: npc.currentPosX, y: npc.currentPosY, z: npc.currentPosZ });
                console.log("set pos to " + npc.currentPosX + " ," + npc.currentPosY + " ," + npc.currentPosZ);
            }
        }
        npc.lastPosUpdate = Date.now();
        npc.lastPosX = npc.currentPosX;
        npc.lastPosY = npc.currentPosY;
        npc.lastPosZ = npc.currentPosZ;
    }
    //todo: play walk animation here, once revmp functions are available
}
exports.gotoPosition = gotoPosition;
