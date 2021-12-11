import { IAiPosition } from "../../aiEntities/components/iAiPosition";
import { IAiNpc } from "../../aiEntities/iAiNpc";
import { AiState } from "../aiState";
import { getWaynetPointAngle, setPlayerAngle } from "../../aiFunctions/aiUtils";
import { getPositionsComponents, getWaynet, registerBot, setPositionsComponent } from "./commonAiStateFunctions";

interface PointCoordinates {
    x: number,
    y: number,
    z: number,
    dirX: number,
    dirZ: number
}

export function spawnNpcByCoordinates(aiState: AiState, npc: IAiNpc, x: number, y: number, z: number, world: string): void {
    registerBot(aiState, npc)
    revmp.setPosition(npc.id, [x, y, z]);
    const position: IAiPosition | undefined = getPositionsComponents(aiState, npc.id)
    if (typeof position !== 'undefined') {
        position.currentPosX = x
        position.currentPosY = y
        position.currentPosZ = z
        setPositionsComponent(aiState, position)
    }
}

export function spawnNpc(aiState: AiState, npc: IAiNpc, pointName: string, world: string): void {
    const npcPosition = getPointCoordinateValues(aiState, pointName)
    npc.startPoint = pointName
    npc.startWorld = world
    registerBot(aiState, npc)
    revmp.setPosition(npc.id, [npcPosition.x, npcPosition.y, npcPosition.z]);
    const spawnAngle = getWaynetPointAngle(npcPosition.x, npcPosition.z, npcPosition.dirX, npcPosition.dirZ)
    setPlayerAngle(npc.id, spawnAngle)

    const position: IAiPosition | undefined = getPositionsComponents(aiState, npc.id)
    if (typeof position !== 'undefined') {
        position.currentPosX = npcPosition.x
        position.currentPosY = npcPosition.y
        position.currentPosZ = npcPosition.z
        setPositionsComponent(aiState, position)
    }
}

function getPointCoordinateValues(aiState: AiState, pointName: string): PointCoordinates {
    const waynet = getWaynet(aiState)
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