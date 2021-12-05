import {IPlayer} from './iPlayer';
import { IActionDescription } from './iActionDescription';

export interface IAiNpc extends IPlayer{
    enemyIds: Array<number>,
    friendIds: Array<number>,
    respawnTime: number,
    actionDescriptions: Array<IActionDescription>,
    aiTags: Map<string, boolean>,
    lastPosUpdate:number,
    lastPosX:number,
    lastPosY:number,
    lastPosZ:number,
    currentPosX:number,
    currentPosY:number,
    currentPosZ:number,
    //initial waypoint/freepoint
    startPoint:string|undefined,
    startWorld:string|undefined,
    npcInstance:string,
}
