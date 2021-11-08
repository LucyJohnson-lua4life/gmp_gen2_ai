import { IPositionComponent } from "../aiEntities/components/iPositionComponent";
import { IAiNpc } from "../aiEntities/iAiNpc";
import { AiState } from "./aiState";
import { getWaynetPointAngle, setPlayerAngle } from "../aiFunctions/aiUtils";

interface PointCoordinates {
    x: number,
    y: number,
    z: number,
    dirX: number,
    dirZ: number
}
export class AiStateFunctions {
    private aiState: AiState

    constructor(aiState: AiState) {
        this.aiState = aiState
    }

    public spawnNpcByCoordinates(npc: IAiNpc, x: number, y: number, z: number, world: string): void {
        const entityManager = this.aiState.getEntityManager()
        this.aiState.registerBot(npc)
        revmp.setPosition(npc.id, [x, y, z]);
        const position: IPositionComponent | undefined = entityManager.getPositionsComponents(npc.id)
        if (typeof position !== 'undefined') {
            position.currentPosX = x
            position.currentPosY = y
            position.currentPosZ = z
            entityManager.setPositionsComponent(npc.id, position)
        }
    }

    public spawnNpc(npc: IAiNpc, pointName: string, world: string): void {
        const entityManager = this.aiState.getEntityManager()
        const npcPosition = this.getPointCoordinateValues(pointName)
        npc.startPoint = pointName
        npc.startWorld = world
        this.aiState.registerBot(npc)
        revmp.setPosition(npc.id, [npcPosition.x, npcPosition.y, npcPosition.z]);
        const spawnAngle = getWaynetPointAngle(npcPosition.x, npcPosition.z, npcPosition.dirX,  npcPosition.dirZ)
        setPlayerAngle(npc.id, spawnAngle)

        const position: IPositionComponent | undefined = entityManager.getPositionsComponents(npc.id)
        if (typeof position !== 'undefined') {
            position.currentPosX = npcPosition.x
            position.currentPosY = npcPosition.y
            position.currentPosZ = npcPosition.z
            entityManager.setPositionsComponent(npc.id, position)
        }
    }

    private getPointCoordinateValues(pointName: string): PointCoordinates {
        const waynet = this.aiState.getWaynet()
        const foundFreepoint = waynet.freepoints.find(x => x.fpName === pointName)
        if (typeof foundFreepoint !== 'undefined') {
            return { x: foundFreepoint.x, y: foundFreepoint.y, z: foundFreepoint.z, dirX: foundFreepoint.rotX, dirZ: foundFreepoint.rotZ }
        }
        const foundWaypoint = Array.from(waynet.waypoints.values()).find(wp => wp.wpName === pointName)
        if (typeof foundWaypoint !== 'undefined') {
            return { x: foundWaypoint.x, y: foundWaypoint.y, z: foundWaypoint.z, dirX: foundWaypoint.rotX, dirZ: foundWaypoint.rotZ }
        }
        console.log("Error: for the given point no coordinates where found! Default coordinates will be provided")
        return { x: 0, y: 0, z: 0, dirX: 0, dirZ: 0 }
    }
}