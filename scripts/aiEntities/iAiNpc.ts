import {IPlayer} from './iPlayer';
import {IAiAction} from './iAiAction';
import { IActionDescription } from './IActionDescription';

export interface IAiNpc extends IPlayer{
    enemyIds: Array<number>,
    friendIds: Array<number>,
    respawnTime: number,
    nextActions: Array<IAiAction>,
    actionDescriptions: Array<IActionDescription>,
    aiFlags: Map<string, number|string>,
    lastPosUpdate:number,
    lastPosX:number,
    lastPosY:number,
    lastPosZ:number,
    currentPosX:number,
    currentPosY:number,
    currentPosZ:number,
    //initial waypoint/freepoint
    startPoint:string,
    startWorld:string,
    npcInstance:string,
    addAction(action:IAiAction)
}
