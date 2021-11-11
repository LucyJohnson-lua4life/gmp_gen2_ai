import { IPositionComponent } from "../aiEntities/components/iPositionComponent";

export function getDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
    if ([x1, y1, z1, x2, y2, z2].some((val) => (typeof val === 'undefined'))) {
        return 99999
    }
    const x = x1 - x2
    const y = y1 - y2
    const z = z1 - z2

    return Math.sqrt(x * x + y * y + z * z);
}

export function gotoPosition(npcPosition: IPositionComponent, x: number, y: number, z: number) {
    const MS_PER_TICK = 33 
    if ((typeof npcPosition.lastPosUpdate == 'undefined') || npcPosition.lastPosUpdate == 0) {
        npcPosition.lastPosUpdate = Date.now()
        npcPosition.lastPosX = npcPosition.currentPosX;
        npcPosition.lastPosY = npcPosition.currentPosY;
        npcPosition.lastPosZ = npcPosition.currentPosZ;
        //fixme fix magic numbers
    } else if (npcPosition.lastPosUpdate + 500 * (MS_PER_TICK - 5) < Date.now()) {
        const revPos = revmp.getPosition(npcPosition.entityId);
        if (npcPosition.currentPosX != revPos.position[0] || npcPosition.currentPosY != revPos.position[1] || npcPosition.currentPosZ != revPos.position[2]) {
            npcPosition.currentPosX = revPos.position[0];
            npcPosition.currentPosY = revPos.position[1];
            npcPosition.currentPosZ = revPos.position[2];
        }
        else if (getDistance(npcPosition.lastPosX, npcPosition.lastPosY, npcPosition.lastPosZ, npcPosition.currentPosX, npcPosition.currentPosY, npcPosition.currentPosZ) < 2) {
            const timeDiff = Date.now() - npcPosition.lastPosUpdate
            //meter per seconds
            const speed = (5 * 100) * (timeDiff / 1000.0)

            let dirX = x - npcPosition.currentPosX;
            let dirY = y - npcPosition.currentPosY;
            let dirZ = z - npcPosition.currentPosZ;

            const dirNorm = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ)
            dirX = dirX / dirNorm;
            dirY = dirY / dirNorm;
            dirZ = dirZ / dirNorm;

            const distance = getDistance(npcPosition.currentPosX, npcPosition.currentPosY, npcPosition.currentPosZ, x, y, z)

            if (speed > distance) {
                revmp.setPosition(npcPosition.entityId, [x, y, z])
                npcPosition.currentPosX = x
                npcPosition.currentPosY = y
                npcPosition.currentPosZ = z
            } else {
                npcPosition.currentPosX = npcPosition.currentPosX + (dirX * speed)
                npcPosition.currentPosY = npcPosition.currentPosY + (dirY * speed)
                npcPosition.currentPosZ = npcPosition.currentPosZ + (dirZ * speed)
                revmp.setPosition(npcPosition.entityId, [npcPosition.currentPosX, npcPosition.currentPosY, npcPosition.currentPosZ])
            }
        }

        npcPosition.lastPosUpdate = Date.now()
        npcPosition.lastPosX = npcPosition.currentPosX;
        npcPosition.lastPosY = npcPosition.currentPosY;
        npcPosition.lastPosZ = npcPosition.currentPosZ;
    }

}
