import { IAiNpc } from "../aiEntities/iAiNpc";
import { EntityManager } from "./entityManager";


export function SpawnNpc(entityManager:EntityManager, npc:IAiNpc, x:number, y:number, z:number){
    entityManager.registerBot(npc)
    revmp.setPosition(npc.id, { x: x, y: y, z: z});
}


