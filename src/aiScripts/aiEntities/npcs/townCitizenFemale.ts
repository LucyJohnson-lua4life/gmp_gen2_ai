
import { IActionDescription } from "../iActionDescription";
import { WeaponInstances } from "../equipment/weapons";
import { IAiNpc } from "../iAiNpc";
import { getRoamingCitizenFemaleInstance, getRoamingCitizenMaleInstance, INSTANCE_HEAVY_CRIMMINAL} from "./npcInits";
import { CitizenDescription } from "../descriptions/citizenDescription";
import { ArmorInstances } from "../equipment/armors";
import { LIVES_IN_TOWN_TAG } from "../components/iNpcTagsComponent";

export class TownCitizenFemale implements IAiNpc {
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
        const instance = getRoamingCitizenFemaleInstance()
        instance.name = "Citizen"
        instance.guild = revmp.GuildType.Mil
        this.id = revmp.createBot(instance);
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.actionDescriptions = [new CitizenDescription(this.id)]
        this.aiTags = new Map();
        this.aiTags.set(LIVES_IN_TOWN_TAG, true)

        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.npcInstance = INSTANCE_HEAVY_CRIMMINAL

        revmp.addOverlay(this.id, "Humans_1hST1.MDS")
        //revmp.setAttributes(this.id, {oneHanded: 100})
        revmp.addItem(this.id, WeaponInstances.nobleSword, 1);
        revmp.addItem(this.id, ArmorInstances.vlkFemaleArmor, 1);
        revmp.equipItem(this.id, WeaponInstances.nobleSword)
        revmp.equipItem(this.id, ArmorInstances.vlkFemaleArmor)
    }
}