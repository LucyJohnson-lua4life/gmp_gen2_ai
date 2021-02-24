import {IPlayer} from './iPlayer';
import {Heap} from 'heap-js';
import {IAiAction} from './iAiAction';
import { NumberKeyMap } from '../utils/mapStructs';

export interface IAiNpc extends IPlayer{
    enemyIds: Array<number>,
    friendIds: Array<number>,
    respawnTime: number,
    nextActions: Heap<IAiAction>,
    aiFlags: NumberKeyMap<number|string>,
    executeNextAction():void
    onNpcHitted(aiNpcId:number, attackerId:number):void
}