import { IAiNpc } from "../aiEntities/iAiNpc";
import { AIState } from "../aiStates/aiStates";







function getDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
    if ([x1, y1, z1, , x2, y2, z2].some((val) => (typeof val === 'undefined'))) {
        return 99999
    }
    let x = x1 - x2
    let y = y1 - y2
    let z = z1 - z2

    return Math.sqrt(x * x + y * y + z * z);
}

export function gotoPosition(npc: IAiNpc, x: number, y: number, z: number) {
    if ((typeof npc.lastPosUpdate == 'undefined') || npc.lastPosUpdate == 0) {
        npc.lastPosUpdate = Date.now()
        npc.lastPosX = npc.currentPosX;
        npc.lastPosY = npc.currentPosY;
        npc.lastPosZ = npc.currentPosZ;
        
    } else if (npc.lastPosUpdate + 500 < Date.now()) {
        if (getDistance(npc.lastPosX, npc.lastPosY, npc.lastPosZ, npc.currentPosX, npc.currentPosY, npc.currentPosZ) < 2) {
            let timeDiff = Date.now() - npc.lastPosUpdate
            let speed = (5*100)*(timeDiff/1000.0)

            let dirX = x-npc.currentPosX;
            let dirY = y-npc.currentPosY;
            let dirZ = z-npc.currentPosZ;

            let dirNorm = Math.sqrt(dirX*dirX + dirY*dirY + dirZ*dirZ)
            dirX = dirX / dirNorm;
            dirY = dirY / dirNorm;
            dirZ = dirZ / dirNorm;

            let distance = getDistance(npc.currentPosX, npc.currentPosY, npc.currentPosZ, x, y, z)

            if(speed > distance){
                revmp.setPosition(npc.id, { x: x, y: y, z: z})
                npc.currentPosX = x
                npc.currentPosY = y
                npc.currentPosZ = z
                console.log("1 set pos to "+ x + " ," + y + " ," + z)
            }else{
                npc.currentPosX = npc.currentPosX + (dirX*speed)
                npc.currentPosY = npc.currentPosY + (dirY*speed)
                npc.currentPosZ = npc.currentPosZ + (dirZ*speed)
                revmp.setPosition(npc.id,  { x: npc.currentPosX, y: npc.currentPosY, z: npc.currentPosZ})
                console.log("2 set pos to "+ npc.currentPosX + " ," + npc.currentPosY + " ," + npc.currentPosZ)
            }
        }

        npc.lastPosUpdate = Date.now()
        npc.lastPosX = npc.currentPosX;
        npc.lastPosY = npc.currentPosY;
        npc.lastPosZ = npc.currentPosZ;
    }

    //todo: play walk animation here, once revmp functions are available

}