import { LIVES_IN_TOWN_TAG } from "../aiEntities/components/iNpcTagsComponent";
import { TownCitizenFemale } from "../aiEntities/npcs/townCitizenFemale";
import { TownCitizenMale } from "../aiEntities/npcs/townCitizenMale";
import { TownFarmerFemale } from "../aiEntities/npcs/townFarmerFemale";
import { TownFarmerMale } from "../aiEntities/npcs/townFarmerMale";
import { TownZombie } from "../aiEntities/npcs/townZombie";
import { AiState } from "./aiState";
import { AiStateFunctions } from "./aiStateFunctions";

const world = "NEWWORLD\\NEWWORLD.ZEN"
export function updateWorldAcordingToState(aiState: AiState, aiStateFunctions: AiStateFunctions) {
  const worldState = aiState.getWorldEventState()
  const entityManager = aiState.getEntityManager()

  if (worldState.khorinisState === 0) {
    const townLeaderId = getTownLeaderId()
    if (townHasNoLeader(townLeaderId)) {
      revmp.characters.forEach(characterId => {
        if (entityManager.getNpcTagsComponent(characterId)?.tags?.get(LIVES_IN_TOWN_TAG) === true ?? false) {
          aiState.unregisterBot(characterId)
          revmp.destroyCharacter(characterId)
          aiState.getWaynetRegistry().resetTownieRegistry()
        }
      })

      if (worldState.influenceOfTheGods >= 10) {
        spawnFarmersInKhorinis(aiState, aiStateFunctions)
        worldState.khorinisState = 1
      }

      else if (worldState.influenceOfTheGods < 10) {
        spawnZombiesInKhorinis(aiState, aiStateFunctions)
        worldState.khorinisState = 2
      }
    }
  }
  else if (worldState.khorinisState === 1) {

  }
}


function townHasNoLeader(townLeaderId: number): boolean {
  return townLeaderId === -1 || !revmp.valid(townLeaderId) || revmp.getHealth(townLeaderId).current <= 0
}

function getTownLeaderId(): number{
  return revmp.characters.find(id => revmp.getName(id).name === "Town Leader") ?? -1
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
function spawnZombiesInKhorinis(aiState: AiState, aiStateFunctions: AiStateFunctions){
  for (let i = 0; i < 20; i++) {
    const citizen = new TownZombie()
    const spawnPoint = aiState.getWaynetRegistry().registerTownieAndGetPoint(citizen.id)
    aiStateFunctions.spawnNpc(citizen, spawnPoint, world);
  }

}