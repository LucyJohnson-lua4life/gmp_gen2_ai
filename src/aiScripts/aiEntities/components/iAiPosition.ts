/**
 * @interface IAiPosition
 * Contains position information of an entity.
 *
 * @field lastPosUpdate last time when the position was checked in milliseconds
 * @field lastPosX x position before the current one was checked
 * @field lastPosY y position before the current one was checked
 * @field lastPosZ z position before the current one was checked
 * @field currentPosX current x position
 * @field currentPosY current y position
 * @field currentPosZ current z position
 * @field startPoint start waypoint/freepoint
 * @field startWorld start world
 * */
import {Vector3} from "three";

export interface IAiPosition {
    entityId:number,
    lastPosUpdate:number,
    lastPos:Vector3,
    currentPos:Vector3,
    // start waypoint/freepoint
    startPoint:string|undefined,
    startWorld:string|undefined,
}
