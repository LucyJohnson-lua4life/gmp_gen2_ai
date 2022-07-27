import { IAiPosition } from "../../aiEntities/components/iAiPosition";
import { IAiNpc } from "../../aiEntities/iAiNpc";
import { AiState } from "../aiState";
import { getAiNpcStatus, getAiPosition, getWaynet, registerBot, setAiPosition, unregisterBot } from "./commonAiStateFunctions";
import { getNpcForInstance } from "../../aiEntities/npcs/npcEntityUtils";
import {Quaternion, Vector3} from "three";

export function spawnNpcByCoordinates(aiState: AiState, npc: IAiNpc, x: number, y: number, z: number, world: string): void {
    registerBot(aiState, npc)
    revmp.setPosition(npc.id, [x, y, z]);
    const position: IAiPosition | undefined = getAiPosition(aiState, npc.id)
    if (typeof position !== 'undefined') {
        position.currentPos = new Vector3(x, y, z);
        setAiPosition(aiState, position)
    }
}

export function spawnNpc(aiState: AiState, npc: IAiNpc, pointName: string, world: string): void {
    const npcPosition = getPointCoordinateValues(aiState, pointName)
    npc.startPoint = pointName
    npc.startWorld = world
    registerBot(aiState, npc)
    revmp.setPosition(npc.id, npcPosition.toArray());
    //const spawnAngle = getWaynetPointRadiansAngle(npcPosition.x, npcPosition.z, npcPosition.dirX, npcPosition.dirZ)
    //setPlayerAngle(npc.id, spawnAngle)

    revmp.setRotation(npc.id, getRotationForPointName(aiState, pointName).toArray() as revmp.Quat);

    const position: IAiPosition | undefined = getAiPosition(aiState, npc.id)
    if (typeof position !== 'undefined') {
        position.currentPos.copy(npcPosition);
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

export function getPointCoordinateValues(aiState: AiState, pointName: string): Vector3 {
    const waynet = getWaynet(aiState)
    const pos = waynet.freepoints.get(pointName)?.pos ?? waynet.waypoints.get(pointName)?.pos;
    if (pos === undefined) {
        console.error("Error: for the given point: ",pointName," no coordinates where found! Default coordinates will be provided")
        return new Vector3();
    }
    return pos;
}

export function getRotationForPointName(aiState: AiState, pointName: string): Quaternion {
    const waynet = getWaynet(aiState);
    const rot = waynet.freepoints.get(pointName)?.rotation ?? waynet.waypoints.get(pointName)?.rotation;
    if (rot === undefined) {
        console.error("Error: for the given point: ",pointName," no rotation where found! Default rotation will be provided");
        return new Quaternion();
    }
    return rot;
}