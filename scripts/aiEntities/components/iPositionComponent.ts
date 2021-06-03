
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
 * */
export interface IPositionComponent {
    entityId:number,
    lastPosUpdate:number,
    lastPosX:number,
    lastPosY:number,
    lastPosZ:number,
    currentPosX:number,
    currentPosY:number,
    currentPosZ:number
}