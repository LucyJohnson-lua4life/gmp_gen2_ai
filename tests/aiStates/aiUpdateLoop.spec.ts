import {AiUpdateLoop} from "../../scripts/aiStates/aiUpdateLoop";
import {IAiNpc} from "../../scripts/aiEntities/iAiNpc";
import {IAiAction} from "../../scripts/aiEntities/iAiAction";
import {Heap} from 'heap-js';
import { AIState } from "../../scripts/aiStates/aiStates";
import { mock,verify, instance } from "ts-mockito";


class TestAiNpc implements IAiNpc{
    id:number;
    isDead:boolean;
    isUnconscious:boolean;
    enemyIds: Array<number>;
    friendIds: Array<number>;
    respawnTime: number;
    nextActions: Heap<IAiAction>;
    aiFlags: Map<string, number|string>;
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


test('Executes for the given id the executeNextAction() - method of the correct npc.', () => {
    let state:AIState = new AIState();
    const npc1Mock:IAiNpc = mock(TestAiNpc);
    const npc2Mock:IAiNpc = mock(TestAiNpc);

    state.botMap.set(1, instance(npc1Mock))
    state.botMap.set(2, instance(npc2Mock));
    let updateLoop = new AiUpdateLoop(state);

    updateLoop.updateAi(2);
    verify(npc2Mock.executeNextAction()).once()
})



