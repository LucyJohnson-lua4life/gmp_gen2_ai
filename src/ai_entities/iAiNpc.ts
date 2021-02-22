import {IPlayer} from './iPlayer';

export interface IAiNpc extends IPlayer{
    enemyIds: Array<number>,
    friendIds: Array<number>,
    respawnTime: number,
    executeNextAction(aiNpcId:number):void
    onNpcHitted(aiNpcId:number, attackerId:number):void
}