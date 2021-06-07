import Heap from "heap-js";
import { instance, mock, verify, when } from "ts-mockito";
import { StubAiNpc } from '../stubAiNpc';
import { IAiNpc } from "../../scripts/aiEntities/iAiNpc";
import { EntityManager } from "../../scripts/aiStates/entityManager";
import { SpawnNpc } from "../../scripts/aiStates/aiStateFunctions";


// all revmp API calls made in this unit test are mocked globally
Object.defineProperty(global, "revmp", {
    value: {
        setPosition: (entity, position)=>{console.log("entity!: " + entity)}
    },
});

test('SpawnNpc should register the created npc into the AIState.', () => {
    let entityManager:EntityManager = new EntityManager();
    const npcMock:IAiNpc = mock(StubAiNpc);
    let npcId = 1;
    when(npcMock.id).thenReturn(npcId)
    expect(entityManager.getAllBots.indexOf(npcId)).toEqual(-1)
    SpawnNpc(entityManager, instance(npcMock),0,0,0);
    expect(entityManager.getAllBots.indexOf(npcId)).toBeGreaterThan(-1)
})
