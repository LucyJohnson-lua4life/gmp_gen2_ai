import { IPositionComponent } from "../aiEntities/components/iPositionComponent";

function getDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
    if ([x1, y1, z1, , x2, y2, z2].some((val) => (typeof val === 'undefined'))) {
        return 99999
    }
    let x = x1 - x2
    let y = y1 - y2
    let z = z1 - z2

    return Math.sqrt(x * x + y * y + z * z);
}

export function gotoPosition(npcPosition:IPositionComponent, x: number, y: number, z: number) {
    if ((typeof npcPosition.lastPosUpdate == 'undefined') || npcPosition.lastPosUpdate == 0) {
        npcPosition.lastPosUpdate = Date.now()
        npcPosition.lastPosX = npcPosition.currentPosX;
        npcPosition.lastPosY = npcPosition.currentPosY;
        npcPosition.lastPosZ = npcPosition.currentPosZ;
    } else if (npcPosition.lastPosUpdate + 500 < Date.now()) {
        if (getDistance(npcPosition.lastPosX, npcPosition.lastPosY, npcPosition.lastPosZ, npcPosition.currentPosX, npcPosition.currentPosY, npcPosition.currentPosZ) < 2) {
            let timeDiff = Date.now() - npcPosition.lastPosUpdate
            let speed = (5*100)*(timeDiff/1000.0)

            let dirX = x-npcPosition.currentPosX;
            let dirY = y-npcPosition.currentPosY;
            let dirZ = z-npcPosition.currentPosZ;

            let dirNorm = Math.sqrt(dirX*dirX + dirY*dirY + dirZ*dirZ)
            dirX = dirX / dirNorm;
            dirY = dirY / dirNorm;
            dirZ = dirZ / dirNorm;

            let distance = getDistance(npcPosition.currentPosX, npcPosition.currentPosY, npcPosition.currentPosZ, x, y, z)

            if(speed > distance){
                revmp.setPosition(npcPosition.entityId,  [x, y, z])
                npcPosition.currentPosX = x
                npcPosition.currentPosY = y
                npcPosition.currentPosZ = z
                console.log("1 set pos to "+ x + " ," + y + " ," + z)
            }else{
                npcPosition.currentPosX = npcPosition.currentPosX + (dirX*speed)
                npcPosition.currentPosY = npcPosition.currentPosY + (dirY*speed)
                npcPosition.currentPosZ = npcPosition.currentPosZ + (dirZ*speed)
                revmp.setPosition(npcPosition.entityId,  [npcPosition.currentPosX, npcPosition.currentPosY, npcPosition.currentPosZ ])
                console.log("2 set pos to "+ npcPosition.currentPosX + " ," + npcPosition.currentPosY + " ," + npcPosition.currentPosZ)
            }
        }

        npcPosition.lastPosUpdate = Date.now()
        npcPosition.lastPosX = npcPosition.currentPosX;
        npcPosition.lastPosY = npcPosition.currentPosY;
        npcPosition.lastPosZ = npcPosition.currentPosZ;
    }

    //todo: play walk animation here, once revmp functions are available

}
