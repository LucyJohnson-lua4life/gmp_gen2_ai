
import { AiEventHandler } from "./aiStates/aiEventHandler";
import { AiState } from "./aiStates/aiState";
import { AiUpdateLoop } from "./aiStates/aiUpdateLoop";
import { AiWorldStateEventHandler } from "./aiStates/aiWorldStateEventHandler";
import { initNewWorldNpcs } from "./initNewWorldNpcs";



export function initAiState(): AiState {
    // fixme: the wp/fp files are not automatically copied into the dist folder 
    // this could confuse users
    const aiState = new AiState('./dist/aiScripts/newworld.wp', './dist/aiScripts/newworld.fp')
    const updateLoop = new AiUpdateLoop(aiState)
    const worldStateEventHandler = new AiWorldStateEventHandler(aiState)
    const aiEventHandler = new AiEventHandler(aiState, worldStateEventHandler)


    aiEventHandler.initEventHandler()
    setInterval(updateLoop.updateAll.bind(updateLoop), 50);
    /*const testMonster = new OrcElite()
    console.log("monster id: " + testMonster.id)
    aiStateFunctions.spawnNpc(testMonster, "HAFEN", "NEWWORLD\\NEWWORLD.ZEN")
    */
    initNewWorldNpcs(aiState)
    return aiState
}