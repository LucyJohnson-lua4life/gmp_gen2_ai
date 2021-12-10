import { LIVES_IN_TOWN_TAG } from "../aiEntities/components/iAiNpcTags";
import { CitizenFemale } from "../aiEntities/npcs/citizenFemale";
import { CitizenMale } from "../aiEntities/npcs/citizenMale";
import { FarmerFemale } from "../aiEntities/npcs/farmerFemale";
import { FarmerMale } from "../aiEntities/npcs/farmerMale";
import { Zombie } from "../aiEntities/npcs/zombie";
import { AiState } from "./aiState";
import { AiStateFunctions } from "./aiStateFunctions";
import { getNpcTagsComponent } from "./commonAiStateFunctions";

const world = "NEWWORLD\\NEWWORLD.ZEN"
export function updateWorldAcordingToState(aiState: AiState, aiStateFunctions: AiStateFunctions) {
  updateCity(aiState, aiStateFunctions)
}

function updateCity(aiState: AiState, aiStateFunctions: AiStateFunctions): void {
  const worldState = aiState.getWorldEventState()
  removeCharactersByTag(aiState, LIVES_IN_TOWN_TAG)
  aiState.getWaynetRegistry().resetTownieRegistry()

  if (worldState.influenceOfTheGods >= 10) {

    if (worldState.khorinisState === 0) {
      spawnFarmersInKhorinis(aiState, aiStateFunctions)
      worldState.khorinisState = 1

    }
    else if (worldState.khorinisState !== 0) {
      spawnCitizensInKhorinis(aiState, aiStateFunctions)
      worldState.khorinisState = 0
    }
  }

  else if (worldState.influenceOfTheGods < 10) {
    spawnZombiesInKhorinis(aiState, aiStateFunctions)
    worldState.khorinisState = 2
  }

}

function removeCharactersByTag(aiState: AiState, tag: string) {
  revmp.characters.forEach(characterId => {
    if (getNpcTagsComponent(aiState, characterId)?.tags?.get(tag) === true ?? false) {
      aiState.unregisterBot(characterId)
      revmp.destroyCharacter(characterId)
    }
  })
}


function townHasNoLeader(townLeaderId: number): boolean {
  return townLeaderId === -1 || !revmp.valid(townLeaderId) || revmp.getHealth(townLeaderId).current <= 0
}

function getTownLeaderId(): number {
  return revmp.characters.find(id => revmp.getName(id).name === "Town Leader") ?? -1
}

function spawnCitizensInKhorinis(aiState: AiState, aiStateFunctions: AiStateFunctions) {
  for (let i = 0; i < 15; i++) {
    const citizen = new CitizenMale([LIVES_IN_TOWN_TAG])
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }

  for (let i = 0; i < 15; i++) {
    const citizen = new CitizenFemale([LIVES_IN_TOWN_TAG])
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }
}

function spawnFarmersInKhorinis(aiState: AiState, aiStateFunctions: AiStateFunctions) {
  for (let i = 0; i < 15; i++) {
    const citizen = new FarmerMale([LIVES_IN_TOWN_TAG])
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }

  for (let i = 0; i < 15; i++) {
    const citizen = new FarmerFemale([LIVES_IN_TOWN_TAG])
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }
}
function spawnZombiesInKhorinis(aiState: AiState, aiStateFunctions: AiStateFunctions) {
  for (let i = 0; i < 40; i++) {
    const citizen = new Zombie([LIVES_IN_TOWN_TAG])
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }

}