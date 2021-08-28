import Heap from "heap-js";
import { instance, mock, when } from "ts-mockito";
import { StubAiNpc } from '../stubAiNpc';
import { IAiNpc } from "../../scripts/aiEntities/iAiNpc";
import { AiStateFunctions} from "../../scripts/aiStates/aiStateFunctions";
import { AiState } from "../../scripts/aiStates/aiState";


// all revmp API calls made in this unit test are mocked globally
Object.defineProperty(global, "revmp", {
    value: {
        setPosition: (entity, position)=>{console.log("entity!: " + entity)}
    },
});

test('SpawnNpc should register the created npc into the AIState.', () => {
    let aiState: AiState = new AiState("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    let aiStateFunctions = new AiStateFunctions(aiState)
    const npcMock:IAiNpc = mock(StubAiNpc);
    let npcId = 1;
    when(npcMock.id).thenReturn(npcId)

    let npc = instance(npcMock)
    expect(aiState.getAllBots().indexOf(npcId)).toEqual(-1)
    aiStateFunctions.spawnNpc(npc,0,0,0,"Newworld")
    expect(aiState.getAllBots().indexOf(npcId)).toBeGreaterThan(-1)
})
