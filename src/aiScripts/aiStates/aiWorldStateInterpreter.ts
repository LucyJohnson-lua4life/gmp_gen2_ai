import { LIVES_IN_TOWN_TAG } from "../aiEntities/components/iAiNpcTags";
import { CitizenFemale } from "../aiEntities/npcs/citizenFemale";
import { CitizenMale } from "../aiEntities/npcs/citizenMale";
import { FarmerFemale } from "../aiEntities/npcs/farmerFemale";
import { FarmerMale } from "../aiEntities/npcs/farmerMale";
import { Zombie } from "../aiEntities/npcs/zombie";
import { AiState } from "./aiState";
import { spawnNpc } from "./aiStateFunctions/spawnFunctions";
import { getAiNpcTags, getWaynetRegistry, getWorldEventState, unregisterBot } from "./aiStateFunctions/commonAiStateFunctions";
import { IWorldEventState, KHORINIS_FRACTION as KHORINIS_FRACTION } from "./waynetRegistries/iWorldEventState";

const world = "NEWWORLD\\NEWWORLD.ZEN"

export function updateWorldAcordingToState(aiState: AiState) {
  updateCity(aiState)
}

function updateCity(aiState: AiState): void {
  const worldState = getWorldEventState(aiState)
  removeCharactersByTag(aiState, LIVES_IN_TOWN_TAG)
  getWaynetRegistry(aiState).resetTownieRegistry()
  const dominantFraction:KHORINIS_FRACTION = getKhorinisFractionWithHighestInfluence(worldState)

  if (dominantFraction === KHORINIS_FRACTION.MERCENARY) {
    spawnFarmersInKhorinis(aiState)
    worldState.khorinisState.set(KHORINIS_FRACTION.PALADIN,0)
    worldState.khorinisState.set(KHORINIS_FRACTION.BELIAR,0)

  }
  else if (dominantFraction === KHORINIS_FRACTION.PALADIN) {
    spawnCitizensInKhorinis(aiState)
    worldState.khorinisState.set(KHORINIS_FRACTION.BELIAR,0)
    worldState.khorinisState.set(KHORINIS_FRACTION.MERCENARY,0)
  }

  else if (dominantFraction === KHORINIS_FRACTION.BELIAR) {
    spawnZombiesInKhorinis(aiState)
    worldState.khorinisState.set(KHORINIS_FRACTION.PALADIN,0)
    worldState.khorinisState.set(KHORINIS_FRACTION.MERCENARY,0)
  }

}

function getKhorinisFractionWithHighestInfluence(worldState:IWorldEventState): KHORINIS_FRACTION{
  return Array.from(worldState.khorinisState.keys()).reduce((previousKey:KHORINIS_FRACTION, currentKey:KHORINIS_FRACTION) => {
    const previousValue = worldState.khorinisState.get(previousKey) ?? 0 
    const currentValue = worldState.khorinisState.get(currentKey) ?? 0
    return previousValue >= currentValue ? previousKey : currentKey 
  }, KHORINIS_FRACTION.MERCENARY)
}


function removeCharactersByTag(aiState: AiState, tag: string) {
  revmp.characters.forEach(characterId => {
    if (getAiNpcTags(aiState, characterId)?.tags?.get(tag) === true ?? false) {
      unregisterBot(aiState, characterId)
      revmp.destroyCharacter(characterId)
    }
  })
}

function spawnCitizensInKhorinis(aiState: AiState) {
  for (let i = 0; i < 15; i++) {
    const citizen = new CitizenMale([LIVES_IN_TOWN_TAG])
    const spawnPoint = getWaynetRegistry(aiState).registerTownieAndGetPoint(citizen.id)
    spawnNpc(aiState, citizen, spawnPoint, world);
  }

  for (let i = 0; i < 15; i++) {
    const citizen = new CitizenFemale([LIVES_IN_TOWN_TAG])
    const spawnPoint = getWaynetRegistry(aiState).registerTownieAndGetPoint(citizen.id)
    spawnNpc(aiState, citizen, spawnPoint, world);
  }
}

function spawnFarmersInKhorinis(aiState: AiState) {
  for (let i = 0; i < 15; i++) {
    const citizen = new FarmerMale([LIVES_IN_TOWN_TAG])
    const spawnPoint = getWaynetRegistry(aiState).registerTownieAndGetPoint(citizen.id)
    spawnNpc(aiState, citizen, spawnPoint, world);
  }

  for (let i = 0; i < 15; i++) {
    const citizen = new FarmerFemale([LIVES_IN_TOWN_TAG])
    const spawnPoint = getWaynetRegistry(aiState).registerTownieAndGetPoint(citizen.id)
    spawnNpc(aiState, citizen, spawnPoint, world);
  }
}
function spawnZombiesInKhorinis(aiState: AiState) {
  for (let i = 0; i < 40; i++) {
    const citizen = new Zombie([LIVES_IN_TOWN_TAG])
    const spawnPoint = getWaynetRegistry(aiState).registerTownieAndGetPoint(citizen.id)
    spawnNpc(aiState, citizen, spawnPoint, world);
  }

}