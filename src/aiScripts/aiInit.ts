import { AiDialogueHandler } from "./aiStates/aiDialogueHandler";
import { AiEventHandler } from "./aiStates/aiEventHandler";
import { AiState } from "./aiStates/aiState";
import { AiUpdateLoop } from "./aiStates/aiUpdateLoop";
import { AiWorldStateEventHandler } from "./aiStates/aiWorldStateEventHandler";
import { initNewWorldNpcs } from "./initNewWorldNpcs";



export function initAiState(waynet?: revmp.Waynet): AiState {
    // fixme: the wp/fp files are not automatically copied into the dist folder 
    // this could confuse users
    const aiState = new AiState('./dist/aiScripts/newworld.wp', './dist/aiScripts/newworld.fp', waynet)
    const updateLoop = new AiUpdateLoop(aiState)
    const worldStateEventHandler = new AiWorldStateEventHandler(aiState)
    const dialogueHandler = new AiDialogueHandler(aiState)
    const aiEventHandler = new AiEventHandler(aiState, worldStateEventHandler, dialogueHandler)


    aiEventHandler.initEventHandler()
    revmp.on("update", () => updateLoop.updateAll())
    /*const testMonster = new OrcElite()
    console.log("monster id: " + testMonster.id)
    aiStateFunctions.spawnNpc(testMonster, "HAFEN", "NEWWORLD\\NEWWORLD.ZEN")
    */
    initNewWorldNpcs(aiState)
    return aiState
}