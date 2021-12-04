import { TOWN_CITIZEN, TOWN_FARMER, TOWN_MERCENARY_LEADER, TOWN_PAL_LEADER } from "../aiEntities/npcs/semanticNpcNames";
import { TownCitizenFemale } from "../aiEntities/npcs/townCitizenFemale";
import { TownCitizenMale } from "../aiEntities/npcs/townCitizenMale";
import { TownFarmerFemale } from "../aiEntities/npcs/townFarmerFemale";
import { TownFarmerMale } from "../aiEntities/npcs/townFarmerMale";
import { AiState } from "./aiState";
import { AiStateFunctions } from "./aiStateFunctions";

const khorinisTownieNames = [TOWN_CITIZEN, TOWN_FARMER, TOWN_MERCENARY_LEADER, TOWN_PAL_LEADER]
const world = "NEWWORLD\\NEWWORLD.ZEN"
export function updateWorldAcordingToState(aiState: AiState, aiStateFunctions: AiStateFunctions) {
    const worldState = aiState.getWorldEventState()

    if (worldState.khorinisState === -1) {

        revmp.characters.forEach(characterId => {
            if (khorinisTownieNames.some(name => name === revmp.getName(characterId).name)) {
                aiState.unregisterBot(characterId)
                revmp.destroyCharacter(characterId)
                aiState.getWaynetRegistry().resetTownieRegistry()
            }
        })
        spawnFarmersInKhorinis(aiState, aiStateFunctions)
    }
}

function spawnCitizensInKhorinis(aiState: AiState, aiStateFunctions: AiStateFunctions){
  for (let i = 0; i < 15; i++) {
    const citizen = new TownCitizenMale()
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }

  for (let i = 0; i < 15; i++) {
    const citizen = new TownCitizenFemale()
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }
}

function spawnFarmersInKhorinis(aiState: AiState, aiStateFunctions: AiStateFunctions){
  for (let i = 0; i < 15; i++) {
    const citizen = new TownFarmerMale()
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }

  for (let i = 0; i < 15; i++) {
    const citizen = new TownFarmerFemale()
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }
}