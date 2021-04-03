import Heap from "heap-js";
import { instance, mock, verify, when } from "ts-mockito";
import { IAiAction } from "../../scripts/aiEntities/iAiAction";
import { IAiNpc } from "../../scripts/aiEntities/iAiNpc";
import { AIState } from "../../scripts/aiStates/aiStates";
import { SpawnNpc } from "../../scripts/aiStates/aiStateFunctions";



class TestAiNpc implements IAiNpc{
    
    id:number;
    isDead:boolean;
    isUnconscious:boolean;
    enemyIds: Array<number>;
    friendIds: Array<number>;
    respawnTime: number;
    nextActions: Heap<IAiAction>;
    aiFlags: Map<string, number|string>;
    lastPosUpdate: number;
    lastPosX: number;
    lastPosY: number;
    lastPosZ: number;
    currentPosX: number;
    currentPosY: number;
    currentPosZ: number;
    constructor(id:number, actions:Heap<IAiAction>){
        this.id = id;
        this.isDead = false;
        this.isUnconscious = false;
        this.enemyIds = []
        this.friendIds = [];
        this.respawnTime = 100;
        this.nextActions = actions;
        this.aiFlags = new Map();
    }


    executeNextAction():void{
        //nothing
    }

    onNpcHitted():void{
        //nothing
    }
}

// all revmp API calls made in this unit test are mocked globally
Object.defineProperty(global, "revmp", {
    value: {
        setPosition: (entity, position)=>{console.log("entity!: " + entity)}
    },
});

test('SpawnNpc should register the created npc into the AIState.', () => {
    let state:AIState = new AIState();
    const npcMock:IAiNpc = mock(TestAiNpc);
    let npcId = 1;
    when(npcMock.id).thenReturn(npcId)
    expect(state.botMap[npcId]).toBeUndefined();
    SpawnNpc(state, instance(npcMock),0,0,0);
    expect(state.botMap[npcId].id).toStrictEqual(npcId);    
})
