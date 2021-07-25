import Heap from 'heap-js';
import { IActionDescription } from '../scripts/aiEntities/IActionDescription';
import { IAiAction } from '../scripts/aiEntities/iAiAction';
import { IAiNpc } from '../scripts/aiEntities/iAiNpc';
export class StubAiNpc implements IAiNpc{
    
    id:number;
    isDead:boolean;
    isUnconscious:boolean;
    enemyIds: Array<number>;
    friendIds: Array<number>;
    respawnTime: number;
    nextActions: Array<IAiAction>;
    aiFlags: Map<string, number|string>;
    actionDescriptions: IActionDescription[];
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
        this.nextActions = new Array<IAiAction>()
        this.aiFlags = new Map();
        this.actionDescriptions = []
    }
    addAction(action: IAiAction) {
        this.nextActions.push(action)
    }

}
