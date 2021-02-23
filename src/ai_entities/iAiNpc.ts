import {IPlayer} from './iPlayer';
import {Heap} from 'heap-js';
import {IAiAction} from './iAiAction';

export interface IAiNpc extends IPlayer{
    enemyIds: Array<number>,
    friendIds: Array<number>,
    respawnTime: number,
    nextActions: Heap<IAiAction>,
    executeNextAction(aiNpcId:number):void
    onNpcHitted(aiNpcId:number, attackerId:number):void
}