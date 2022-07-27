import { IAiPosition } from "../aiEntities/components/iAiPosition";
import {Vector3} from "three";

const MS_PER_TICK = 1000.0 / revmp.tickRate;

export function gotoPosition(npcPosition: IAiPosition, pos: Vector3) {
    if ((typeof npcPosition.lastPosUpdate === 'undefined') || npcPosition.lastPosUpdate === 0) {
        npcPosition.lastPosUpdate = Date.now();
        npcPosition.lastPos.copy(npcPosition.currentPos);
        //fixme fix magic numbers
    } else if (npcPosition.lastPosUpdate + 500 * (MS_PER_TICK - 5) < Date.now()) {
        const revPos = revmp.getPosition(npcPosition.entityId);
        if (npcPosition.currentPos.x != revPos.position[0] || npcPosition.currentPos.y != revPos.position[1] || npcPosition.currentPos.z != revPos.position[2]) {
            npcPosition.currentPos.x = revPos.position[0];
            npcPosition.currentPos.y = revPos.position[1];
            npcPosition.currentPos.z = revPos.position[2];
        } else if (npcPosition.lastPos.distanceTo(npcPosition.currentPos) < 2) {
            const timeDiff = Date.now() - npcPosition.lastPosUpdate
            //meter per seconds
            const speed = (5 * 100) * (timeDiff / 1000.0)
            const distance = npcPosition.currentPos.distanceTo(pos);
            if (speed > distance) {
                revmp.setPosition(npcPosition.entityId, [pos.x, pos.y, pos.z]);
                npcPosition.currentPos.copy(pos);
            } else {
                let dirX = pos.x - npcPosition.currentPos.x;
                let dirY = pos.y - npcPosition.currentPos.y;
                let dirZ = pos.z - npcPosition.currentPos.z;

                const dirNorm = Math.sqrt(dirX ** 2 + dirY ** 2 + dirZ ** 2);
                dirX = dirX / dirNorm;
                dirY = dirY / dirNorm;
                dirZ = dirZ / dirNorm;

                npcPosition.currentPos.x += (dirX * speed);
                npcPosition.currentPos.y += (dirY * speed);
                npcPosition.currentPos.z += (dirZ * speed);

                npcPosition.currentPos.toArray(revPos.position);
                revmp.setPosition(npcPosition.entityId, revPos);
            }
        }

        npcPosition.lastPosUpdate = Date.now()
        npcPosition.lastPos.copy(npcPosition.currentPos);
    }

}
