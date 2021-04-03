import {AiUpdateLoop} from "../../scripts/aiStates/aiUpdateLoop";
import {IAiNpc} from "../../scripts/aiEntities/iAiNpc";
import { AIState } from "../../scripts/aiStates/aiStates";
import { mock,verify, instance } from "ts-mockito";
import { StubAiNpc } from '../stubAiNpc';



test('Executes for the given id the executeNextAction() - method of the correct npc.', () => {
    let state:AIState = new AIState();
    const npc1Mock:IAiNpc = mock(StubAiNpc);
    const npc2Mock:IAiNpc = mock(StubAiNpc);

    state.botMap.set(1, instance(npc1Mock))
    state.botMap.set(2, instance(npc2Mock));
    let updateLoop = new AiUpdateLoop(state);

    updateLoop.updateAi(2);
    verify(npc2Mock.executeNextAction()).once()
})



