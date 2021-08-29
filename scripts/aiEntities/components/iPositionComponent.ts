
/**
 * @interface IPositionComponent
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
export interface IPositionComponent {
    entityId:number,
    lastPosUpdate:number,
    lastPosX:number,
    lastPosY:number,
    lastPosZ:number,
    currentPosX:number,
    currentPosY:number,
    currentPosZ:number,
    // start waypoint/freepoint
    startPoint:string,
    startWorld:string
}
