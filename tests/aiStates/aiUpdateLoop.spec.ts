import {AiUpdateLoop} from "../../scripts/aiStates/aiUpdateLoop";
import {IAiNpc} from "../../scripts/aiEntities/iAiNpc";
import { EntityManager } from "../../scripts/aiStates/entityManager";
import { mock,verify, instance, when } from "ts-mockito";
import { StubAiNpc } from '../stubAiNpc';
import { IAiAction } from "../../scripts/aiEntities/iAiAction";


class StubAiAction implements IAiAction{
    priority: number;
    aiId: number;
    shouldLoop: boolean;
    executeAction(): void {
        console.log("test action")
    }
}

test('Executes for the given id the executeAction() - method of the correct npc.', () => {
    let entityManager:EntityManager = new EntityManager();
    let aiNpc = new StubAiNpc(1)
    let aiNpc2 = new StubAiNpc(2)
    const action:IAiAction = mock(StubAiAction)
    aiNpc.addAction(instance(action))
    entityManager.registerBot(aiNpc)
    entityManager.registerBot(aiNpc2)
    let updateLoop = new AiUpdateLoop(entityManager);
    updateLoop.updateAi(1);
    verify(action.executeAction()).once()
})


test('Executes for the given id the executeAction() - non loopable action should be removed after execution.', () => {
    let entityManager:EntityManager = new EntityManager();
    let aiNpc = new StubAiNpc(1)

    const nonLoopableAction:IAiAction = mock(StubAiAction)
    when(nonLoopableAction.shouldLoop).thenReturn(false)

    aiNpc.addAction(instance(nonLoopableAction))
    entityManager.registerBot(aiNpc)

    let updateLoop = new AiUpdateLoop(entityManager);
    updateLoop.updateAi(1)
    updateLoop.updateAi(1)

    verify(nonLoopableAction.executeAction()).atMost(1)
})


test('Executes for the given id the executeAction() - loopable action should NOT be removed after execution.', () => {
    let entityManager:EntityManager = new EntityManager();
    let aiNpc = new StubAiNpc(1)

    const nonLoopableAction:IAiAction = mock(StubAiAction)
    when(nonLoopableAction.shouldLoop).thenReturn(true)

    aiNpc.addAction(instance(nonLoopableAction))
    entityManager.registerBot(aiNpc)

    let updateLoop = new AiUpdateLoop(entityManager)
    updateLoop.updateAi(1)
    updateLoop.updateAi(1)

    verify(nonLoopableAction.executeAction()).twice()
})



