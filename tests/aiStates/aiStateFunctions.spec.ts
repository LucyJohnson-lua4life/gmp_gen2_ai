import { instance, mock, when } from "ts-mockito";
import { StubAiNpc } from '../stubAiNpc';
import { IAiNpc } from "../../src/aiScripts/aiEntities/iAiNpc";
import { spawnNpc} from "../../src/aiScripts/aiStates/aiStateFunctions";
import { AiState } from "../../src/aiScripts/aiStates/aiState";
import { getAllBots } from "../../src/aiScripts/aiStates/commonAiStateFunctions";


// all revmp API calls made in this unit test are mocked globally
Object.defineProperty(global, "revmp", {
    value: {
        setPosition: (entity: number, position: [number, number, number])=>{console.log("setPosition " + entity)},
        setRotation: (entity: number, rotation: [number, number, number, number])=>{console.log("setRotation " + entity)}
    },
});

test('SpawnNpc should register the created npc into the AIState.', () => {
    const aiState: AiState = new AiState("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const npcMock:IAiNpc = mock(StubAiNpc);
    const npcId = 1;
    when(npcMock.id).thenReturn(npcId)

    const npc = instance(npcMock)
    expect(getAllBots(aiState).indexOf(npcId)).toEqual(-1)
    spawnNpc(aiState, npc,"WP_TEST","WORLD_TEST")
    expect(getAllBots(aiState).indexOf(npcId)).toBeGreaterThan(-1)
})
