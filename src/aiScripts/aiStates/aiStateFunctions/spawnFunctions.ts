import { IAiPosition } from "../../aiEntities/components/iAiPosition";
import { IAiNpc } from "../../aiEntities/iAiNpc";
import { AiState } from "../aiState";
import { getAiNpcStatus, getAiPosition, getWaynet, registerBot, setAiPosition, unregisterBot } from "./commonAiStateFunctions";
import { getNpcForInstance } from "../../../aiScripts/aiEntities/npcs/npcEntityUtils";

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
    const position: IAiPosition | undefined = getAiPosition(aiState, npc.id)
    if (typeof position !== 'undefined') {
        position.currentPosX = x
        position.currentPosY = y
        position.currentPosZ = z
        setAiPosition(aiState, position)
    }
}

export function spawnNpc(aiState: AiState, npc: IAiNpc, pointName: string, world: string): void {
    const npcPosition = getPointCoordinateValues(aiState, pointName)
    npc.startPoint = pointName
    npc.startWorld = world
    registerBot(aiState, npc)
    revmp.setPosition(npc.id, [npcPosition.x, npcPosition.y, npcPosition.z]);
    //const spawnAngle = getWaynetPointRadiansAngle(npcPosition.x, npcPosition.z, npcPosition.dirX, npcPosition.dirZ)
    //setPlayerAngle(npc.id, spawnAngle)

    revmp.setRotation(npc.id, getRotationForPointName(aiState, pointName));

    const position: IAiPosition | undefined = getAiPosition(aiState, npc.id)
    if (typeof position !== 'undefined') {
        position.currentPosX = npcPosition.x
        position.currentPosY = npcPosition.y
        position.currentPosZ = npcPosition.z
        setAiPosition(aiState, position)
    }
}

export function respawnNpc(aiState:AiState, aiId: number, world: string) {
    const lastPosition = getAiPosition(aiState, aiId)
    const lastNpcInstance = getAiNpcStatus(aiState, aiId)?.npcInstance
    unregisterBot(aiState, aiId)
    revmp.destroyCharacter(aiId)
    if (typeof lastNpcInstance !== 'undefined' && typeof lastPosition !== 'undefined') {
        //TODO: extend getNpc for state
        //todo: fix this
        const spawnPoint = typeof lastPosition.startPoint !== 'undefined' ? lastPosition.startPoint : "HAFEN"
        const spawnWorld = typeof lastPosition.startWorld !== 'undefined' ? lastPosition.startWorld : world
        spawnNpc(aiState, getNpcForInstance(lastNpcInstance), spawnPoint, spawnWorld)
    }
}

export function getPointCoordinateValues(aiState: AiState, pointName: string): PointCoordinates {
    const waynet = getWaynet(aiState)
    const foundFreepoint = waynet.freepoints.find(x => x.fpName === pointName)
    if (typeof foundFreepoint !== 'undefined') {
        return { x: foundFreepoint.x, y: foundFreepoint.y, z: foundFreepoint.z, dirX: foundFreepoint.rotX, dirZ: foundFreepoint.rotZ }
    }
    const foundWaypoint = Array.from(waynet.waypoints.values()).find(wp => wp.wpName === pointName)
    if (typeof foundWaypoint !== 'undefined') {
        return { x: foundWaypoint.x, y: foundWaypoint.y, z: foundWaypoint.z, dirX: foundWaypoint.rotX, dirZ: foundWaypoint.rotZ }
    }
    console.log("Error: for the given point: ",pointName," no coordinates where found! Default coordinates will be provided")
    return { x: 0, y: 0, z: 0, dirX: 0, dirZ: 0 }
}

export function getRotationForPointName(aiState: AiState, pointName: string): revmp.Quat {
    const waynet = getWaynet(aiState)
    const foundFreepoint = waynet.freepoints.find(x => x.fpName === pointName)
    if (typeof foundFreepoint !== 'undefined' && typeof foundFreepoint.rotation !== 'undefined') {
        return foundFreepoint.rotation 
    }
    const foundWaypoint = Array.from(waynet.waypoints.values()).find(wp => wp.wpName === pointName)
    if (typeof foundWaypoint !== 'undefined' && typeof foundWaypoint.rotation !== 'undefined') {
        return foundWaypoint.rotation
    }
    console.log("Error: for the given point: ",pointName," no rotation where found! Default rotation will be provided")
    return [0,0,0,0]
}