


import { IActionDescription } from "../iActionDescription";
import { OnehandMasterAttackDescription } from "../onehandMasterAttackDescription";
import { IAiAction } from "../iAiAction";
import { IAiNpc } from "../iAiNpc";
import { getUndeadOrcInstance, INSTANCE_ORC_UNDEAD} from "./npcInits";
import { Instances } from "../../serverComponents/weapons";

export class UndeadOrc implements IAiNpc {
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
    startPoint:string;
    startWorld:string;
    npcInstance:string;


    constructor() {
        this.id = revmp.createBot(getUndeadOrcInstance());;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.nextActions =  new Array<IAiAction>()
        this.actionDescriptions = [new OnehandMasterAttackDescription(this.id)]
        this.aiFlags = new Map();

        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.npcInstance = INSTANCE_ORC_UNDEAD
        revmp.addItem(this.id, Instances.eliteOrcSword, 1);
        revmp.equipItem(this.id, Instances.eliteOrcSword)
        revmp.setAttributes(this.id, { twoHanded: 100 })
    }
    addAction(action: IAiAction) {
        this.nextActions.push(action)
    }

}
