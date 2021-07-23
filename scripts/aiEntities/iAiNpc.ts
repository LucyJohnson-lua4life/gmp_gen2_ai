import {IPlayer} from './iPlayer';
import {Heap} from 'heap-js';
import {IAiAction} from './iAiAction';
import { IActionDescription } from './IActionDescription';

export interface IAiNpc extends IPlayer{
    enemyIds: Array<number>,
    friendIds: Array<number>,
    respawnTime: number,
    nextActions: Heap<IAiAction>,
    actionDescriptions: Array<IActionDescription>,
    aiFlags: Map<string, number|string>,
    lastPosUpdate:number,
    lastPosX:number,
    lastPosY:number,
    lastPosZ:number,
    currentPosX:number,
    currentPosY:number,
    currentPosZ:number,
    addAction(action:IAiAction)
}
