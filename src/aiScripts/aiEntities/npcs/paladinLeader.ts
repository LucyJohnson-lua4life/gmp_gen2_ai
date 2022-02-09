import { IActionDescription } from "../iActionDescription";
import { WeaponInstances } from "../equipment/weapons";
import { IAiNpc } from "../iAiNpc";
import { getWeaponMasterMaleInstance, INSTANCE_ROAMING_ROBBER} from "./npcInits";
import { ArmorInstances } from "../equipment/armors";
import { StaticTwoHandMaster } from "../descriptions/staticTwoHandMasterDescription";

export class PaladinLeader implements IAiNpc {
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


    constructor(tags: Array<string>) {
        const instance = getWeaponMasterMaleInstance()
        instance.name = "Town Leader"
        instance.guild = revmp.GuildType.Mil
        instance.maxHealth = 500
        this.id = revmp.createBot(instance);
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.actionDescriptions = [new StaticTwoHandMaster(this.id)]
        this.aiTags = new Map();
        tags.forEach(tag =>this.aiTags.set(tag, true))

        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.npcInstance = INSTANCE_ROAMING_ROBBER
        this.dialogues = new Map()
        revmp.addMdsOverlay(this.id, "Humans_2hST2.MDS")
        revmp.addMdsOverlay(this.id, "Humans_1hST2.MDS")
        //revmp.setAttributes(this.id, {oneHanded: 100})
        revmp.addItem(this.id, WeaponInstances.flamberge, 1);
        revmp.addItem(this.id, ArmorInstances.heavyPaladinArmor, 1);
        revmp.equipItem(this.id, WeaponInstances.flamberge)
        revmp.equipItem(this.id, ArmorInstances.heavyPaladinArmor)
    }

}