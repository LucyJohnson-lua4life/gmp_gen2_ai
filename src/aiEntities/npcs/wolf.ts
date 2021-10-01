import { IActionDescription } from "../iActionDescription";
import { DefaultMonsterAttackDescription } from "../defaultMonsterAttackDescription";
import { IAiAction } from "../iAiAction";
import { IAiNpc } from "../iAiNpc";
import { getWolfInstance, INSTANCE_WOLF} from "./npcInits";

export class Wolf implements IAiNpc {
    enemyIds: number[];
    friendIds: number[];
    respawnTime: number;
    nextActions: Array<IAiAction>;
    actionDescriptions: Array<IActionDescription>;
    aiFlags: Map<string, string | number>;
    id: number;
    isDead: boolean;
    isUnconscious: boolean;
    lastPosUpdate: number;
    lastPosX: number;
    lastPosY: number;
    lastPosZ: number;
    currentPosX: number;
    currentPosY: number;
    currentPosZ: number;
    startPoint:string|undefined;
    startWorld:string|undefined;
    npcInstance:string;


    constructor() {
        this.id = revmp.createBot(getWolfInstance());
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.nextActions =  new Array<IAiAction>()
        this.actionDescriptions = [new DefaultMonsterAttackDescription(this.id)]
        this.aiFlags = new Map();

        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.npcInstance = INSTANCE_WOLF
    }
    addAction(action: IAiAction) {
        this.nextActions.push(action)
    }

}
