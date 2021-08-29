import { IPositionComponent } from "../aiEntities/components/iPositionComponent";
import { IAiNpc } from "../aiEntities/iAiNpc";
import { AiState } from "./aiState";

export class AiStateFunctions{
    private aiState:AiState


    constructor(aiState: AiState) {
        this.aiState = aiState
    }

    public spawnNpcByCoordinates(npc:IAiNpc, x:number, y:number, z:number, world:string): void {
        let entityManager = this.aiState.getEntityManager()
        this.aiState.registerBot(npc)
        revmp.setPosition(npc.id, [x, y, z]);
        let position: IPositionComponent = entityManager.getPositionsComponents(npc.id)
        position.currentPosX = x
        position.currentPosY = y
        position.currentPosZ = z
        entityManager.setPositionsComponent(npc.id, position)
    }

    public spawnNpc(npc: IAiNpc, pointName:string, world: string): void {
        let entityManager = this.aiState.getEntityManager()
        let npcPosition = this.getCoordinatesForPointName(pointName)
        npc.startPoint = pointName
        npc.startWorld = world
        this.aiState.registerBot(npc)
        revmp.setPosition(npc.id, [npcPosition[0], npcPosition[1], npcPosition[2]]);
        let position: IPositionComponent = entityManager.getPositionsComponents(npc.id)
        position.currentPosX = npcPosition[0]
        position.currentPosY = npcPosition[1]
        position.currentPosZ = npcPosition[2]
        entityManager.setPositionsComponent(npc.id, position)
    }

    private getCoordinatesForPointName(pointName: string): Array<number>{
        let waynet = this.aiState.getWaynet()
        let foundFreepoint = waynet.freepoints.find(x => x.fpName === pointName)
        if (typeof foundFreepoint !== 'undefined'){
            return [foundFreepoint.x, foundFreepoint.y, foundFreepoint.z]
        }
        let foundWaypoint = Array.from(waynet.waypoints.values()).find(wp => wp.wpName === pointName)
        if(typeof foundWaypoint !== 'undefined'){
            return [foundWaypoint.x, foundWaypoint.y, foundWaypoint.z]
        }
        console.log("Error: for the given point no coordinates where found! Default coordinates will be provided")
        return [0,0,0]
    }
}
