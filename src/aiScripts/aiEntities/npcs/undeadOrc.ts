


import { IActionDescription } from "../iActionDescription";
import { OrcMasterDescription } from "../descriptions/orcMasterDescription";
import { IAiNpc } from "../iAiNpc";
import { getUndeadOrcInstance, INSTANCE_ORC_UNDEAD} from "./npcInits";
import { WeaponInstances } from "../equipment/weapons";

export class UndeadOrc implements IAiNpc {
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
    dialogues: Map<string, string>;

    constructor() {
        this.id = revmp.createBot(getUndeadOrcInstance());
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
        this.npcInstance = INSTANCE_ORC_UNDEAD
        revmp.addItem(this.id, WeaponInstances.eliteOrcSword, 1);
        revmp.equipItem(this.id, WeaponInstances.eliteOrcSword)
        this.dialogues = new Map()
        //revmp.setAttributes(this.id, { twoHanded: 100 })
    }
}
