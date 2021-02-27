import Heap from "heap-js";
import { StringKeyMap } from "../../utils/mapStructs";
import { IAiAction } from "../iAiAction";
import { IAiNpc } from "../iAiNpc";
import { INSTANCE_WOLF } from "./npcInits";

export class Wolf implements IAiNpc{
    enemyIds: number[];
    friendIds: number[];
    respawnTime: number;
    nextActions: Heap<IAiAction>;
    aiFlags: StringKeyMap<string | number>;
    id: number;
    isDead: boolean;
    isUnconscious: boolean;


    constructor(){
        this.id = revmp.createBot(INSTANCE_WOLF);;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 240;
        this.nextActions = new Heap((a:IAiAction, b:IAiAction) => a.priority - b.priority);
        this.aiFlags = {};
    }

    executeNextAction(): void {
        console.log("Nothing implemented yet.")
    }
    onNpcHitted(aiNpcId: number, attackerId: number): void {
        console.log("Nothing implemented yet.")
    }

}