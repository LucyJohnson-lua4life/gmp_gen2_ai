

import { IActionDescription } from "../iActionDescription";
import { OrcMasterDescription} from "../descriptions/orcMasterDescription";
import { IAiNpc } from "../iAiNpc";
import { getOrcEliteInstance, INSTANCE_ORC_ELITE} from "./npcInits";
import { WeaponInstances } from "../equipment/weapons";

export class OrcElite implements IAiNpc {
    enemyIds: number[];
    friendIds: number[];
    respawnTime: number;
    actionDescriptions: Array<IActionDescription>;
    aiTags: Map<string, boolean>;
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
        this.id = revmp.createBot(getOrcEliteInstance());
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.actionDescriptions = [new OrcMasterDescription(this.id)]
        this.aiTags = new Map();

        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.npcInstance = INSTANCE_ORC_ELITE
        revmp.addItem(this.id, WeaponInstances.eliteOrcSword, 1);
        revmp.equipItem(this.id, WeaponInstances.eliteOrcSword)
        revmp.setAttributes(this.id, { twoHanded: 100 })
    }
}
