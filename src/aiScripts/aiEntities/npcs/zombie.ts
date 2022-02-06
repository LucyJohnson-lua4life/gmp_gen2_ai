import { IActionDescription } from "../iActionDescription";
import { IAiNpc } from "../iAiNpc";
import { getZombieInstance, INSTANCE_WOLF} from "./npcInits";
import { TownZombieDescription } from "../descriptions/townZombieDescription";

export class Zombie implements IAiNpc {
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
        this.id = revmp.createBot(getZombieInstance());
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = [];
        this.friendIds = [];
        this.respawnTime = 10;
        this.actionDescriptions = [new TownZombieDescription(this.id)]
        this.aiTags = new Map();
        tags.forEach(tag => this.aiTags.set(tag, true))

        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.npcInstance = INSTANCE_WOLF
        this.dialogues = new Map()
    }

}
