import {IPlayer} from './iPlayer';
import {Heap} from 'heap-js';
import {IAiAction} from './iAiAction';

export interface IAiNpc extends IPlayer{
    enemyIds: Array<number>,
    friendIds: Array<number>,
    respawnTime: number,
    nextActions: Heap<IAiAction>,
    aiFlags: Map<string, number|string>,
    lastPosUpdate:number,
    lastPosX:number,
    lastPosY:number,
    lastPosZ:number,
    currentPosX:number,
    currentPosY:number,
    currentPosZ:number,
    executeNextAction():void
    onNpcHitted(aiNpcId:number, attackerId:number):void
}