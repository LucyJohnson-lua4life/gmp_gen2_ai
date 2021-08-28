import { IPositionComponent } from "../aiEntities/components/iPositionComponent";
import { IAiNpc } from "../aiEntities/iAiNpc";
import { AiState } from "./aiState";
import { EntityManager } from "./entityManager";

// TODO: world has to be handled.
export function SpawnNpc(entityManager:EntityManager, npc:IAiNpc, x:number, y:number, z:number){
    entityManager.registerBot(npc)
    revmp.setPosition(npc.id, [x,y,z]);
    let position:IPositionComponent =  entityManager.getPositionsComponents(npc.id)
    position.currentPosX = x
    position.currentPosY = y
    position.currentPosZ = z
    entityManager.setPositionsComponent(npc.id, position)
}


const spawnTest = entityManager => (npc,x,y,z) => SpawnNpc(entityManager, npc,x,y,z)



export class AiStateFunctions{
    private aiState:AiState


    constructor(aiState: AiState) {
        this.aiState = aiState
    }

    public spawnNpc(npc:IAiNpc, x:number, y:number, z:number, world:string): void {
        let entityManager = this.aiState.getEntityManager()
        entityManager.registerBot(npc)
        revmp.setPosition(npc.id, [x, y, z]);
        let position: IPositionComponent = entityManager.getPositionsComponents(npc.id)
        position.currentPosX = x
        position.currentPosY = y
        position.currentPosZ = z
        entityManager.setPositionsComponent(npc.id, position)
    }

}
