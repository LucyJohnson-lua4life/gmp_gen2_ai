import Heap from 'heap-js';
import { IAiAction } from '../scripts/aiEntities/iAiAction';
import { IAiNpc } from '../scripts/aiEntities/iAiNpc';
export class StubAiNpc implements IAiNpc{
    
    id:number;
    isDead:boolean;
    isUnconscious:boolean;
    enemyIds: Array<number>;
    friendIds: Array<number>;
    respawnTime: number;
    nextActions: Heap<IAiAction>;
    aiFlags: Map<string, number|string>;
    lastPosUpdate: number;
    lastPosX: number;
    lastPosY: number;
    lastPosZ: number;
    currentPosX: number;
    currentPosY: number;
    currentPosZ: number;
    constructor(id:number){
        this.id = id;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = []
        this.friendIds = [];
        this.respawnTime = 100;
        this.nextActions = new Heap();
        this.aiFlags = new Map();
    }
    addAction(action: IAiAction, priority: number, shouldLoop: boolean) {
        //nothing
    }


    executeNextAction():void{
        //nothing
    }

    onNpcHitted():void{
        //nothing
    }

}