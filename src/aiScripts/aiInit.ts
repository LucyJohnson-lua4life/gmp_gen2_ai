
import { Wolf } from "./aiEntities/npcs/wolf"
import { AiState } from "./aiStates/aiState";
import { AiStateFunctions } from "./aiStates/aiStateFunctions";
import { AiUpdateLoop } from "./aiStates/aiUpdateLoop";
import { initNewWorldNpcs } from "./initNewWorldNpcs";



export function initAiState(): AiState {
    // fixme: the wp/fp files are not automatically copied into the dist folder 
    // this could confuse users
    const aiState = new AiState('./dist/aiScripts/newworld.wp', './dist/aiScripts/newworld.fp')
    const updateLoop = new AiUpdateLoop(aiState)
    const aiStateFunctions = new AiStateFunctions(aiState)

    setInterval(updateLoop.updateAll.bind(updateLoop), 50);

    const testMonster = new Wolf()
    console.log("monster id: " + testMonster.id)
    aiStateFunctions.spawnNpc(testMonster,"HAFEN","NEWWORLD\\NEWWORLD.ZEN")
    initNewWorldNpcs(aiState)
    return aiState
}