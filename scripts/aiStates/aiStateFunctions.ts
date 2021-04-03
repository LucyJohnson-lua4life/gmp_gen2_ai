import { IAiNpc } from "../aiEntities/iAiNpc";
import { AIState } from "./aiStates";


export function SpawnNpc(state:AIState, npc:IAiNpc, x:number, y:number, z:number){
    state.registerBot(npc)
    revmp.setPosition(npc.id, { x: x, y: y, z: z});
}


