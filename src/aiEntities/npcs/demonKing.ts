
import { IActionDescription } from "../iActionDescription";
import { DemonKingDescription } from "../descriptions/demonKingDescription";
import { IAiAction } from "../iAiAction";
import { WeaponInstances } from "../../serverComponents/weapons";
import { ArmorInstances } from "../../serverComponents/armors";
import { IAiNpc } from "../iAiNpc";
import { getDemonKingInstance, INSTANCE_DEMON_KING} from "./npcInits";

export class DemonKing implements IAiNpc {
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
        this.id = revmp.createBot(getDemonKingInstance());
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.nextActions =  new Array<IAiAction>()
        this.actionDescriptions = [new DemonKingDescription(this.id)]
        this.aiFlags = new Map();

        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.npcInstance = INSTANCE_DEMON_KING

        revmp.addOverlay(this.id, "Humans_2hST2.MDS")
        //revmp.setAttributes(this.id, {oneHanded: 100})
        revmp.addItem(this.id, WeaponInstances.eliteOrcSword, 1);
        revmp.addItem(this.id, ArmorInstances.darkArmor, 1);
        revmp.equipItem(this.id, WeaponInstances.eliteOrcSword)
        revmp.equipItem(this.id, ArmorInstances.darkArmor)
    }
    addAction(action: IAiAction) {
        this.nextActions.push(action)
    }

}