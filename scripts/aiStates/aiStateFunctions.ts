import { IPositionComponent } from "../aiEntities/components/iPositionComponent";
import { IAiNpc } from "../aiEntities/iAiNpc";
import { EntityManager } from "./entityManager";


export function SpawnNpc(entityManager:EntityManager, npc:IAiNpc, x:number, y:number, z:number){
    entityManager.registerBot(npc)
    revmp.setPosition(npc.id, [x,y,z]);
    let position:IPositionComponent =  entityManager.getPositionsComponents(npc.id)
    position.currentPosX = x
    position.currentPosY = y
    position.currentPosZ = z
    entityManager.setPositionsComponent(npc.id, position)
}


