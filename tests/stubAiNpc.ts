import { IActionDescription } from '../src/aiScripts/aiEntities/iActionDescription';
import { IAiAction } from '../src/aiScripts/aiEntities/iAiAction';
import { IAiNpc } from '../src/aiScripts/aiEntities/iAiNpc';
export class StubAiNpc implements IAiNpc {

    id: number;
    isDead: boolean;
    isUnconscious: boolean;
    enemyIds: Array<number>;
    friendIds: Array<number>;
    respawnTime: number;
    nextActions: Array<IAiAction>;
    aiFlags: Map<string, number | string>;
    actionDescriptions: IActionDescription[];
    dialogues: Map<string, string>;
    lastPosUpdate: number;
    lastPosX: number;
    lastPosY: number;
    lastPosZ: number;
    currentPosX: number;
    currentPosY: number;
    currentPosZ: number;
    startPoint: string | undefined;
    startWorld: string | undefined;
    npcInstance: string;
    aiTags: Map<string, boolean>;
    constructor(id: number) {
        this.id = id
        this.isDead = false
        this.isUnconscious = false
        this.enemyIds = []
        this.friendIds = []
        this.respawnTime = 100
        this.nextActions = new Array<IAiAction>()
        this.aiFlags = new Map()
        this.actionDescriptions = []
        this.dialogues = new Map()
        this.lastPosUpdate = 0
        this.lastPosX = 0
        this.lastPosY = 0
        this.lastPosZ = 0
        this.currentPosX = 0
        this.currentPosY = 0
        this.currentPosZ = 0
        this.startPoint = "HAFEN"
        this.startWorld = "NEWWORLD\\NEWWORLD.ZEN"
        this.npcInstance = ""
        this.aiTags = new Map()
    }
    addAction(action: IAiAction) {
        this.nextActions.push(action)
    }

}
