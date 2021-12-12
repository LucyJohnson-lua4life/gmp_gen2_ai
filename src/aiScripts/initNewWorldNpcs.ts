
import { spawnNpc } from "./aiStates/aiStateFunctions/spawnFunctions"
import { Wolf } from "./aiEntities/npcs/wolf"
import { Scavenger } from "./aiEntities/npcs/scavenger"
import { Shadowbeast } from "./aiEntities/npcs/shadowbeast"
import { Keiler } from "./aiEntities/npcs/keiler"
import { Snapper } from "./aiEntities/npcs/snapper"
import { Troll } from "./aiEntities/npcs/troll"
import { OrcElite } from "./aiEntities/npcs/orcElite"
import { Lurker } from "./aiEntities/npcs/lurker"
import { Warg } from "./aiEntities/npcs/warg"
import { AiState } from "./aiStates/aiState"
import { HeavyCrimminal } from "./aiEntities/npcs/heavyCrimminal"
import { RoamingRobber } from "./aiEntities/npcs/roamingRobber"
import { PaladinLeader } from "./aiEntities/npcs/paladinLeader"
import { LIVES_IN_TOWN_TAG } from "./aiEntities/components/iAiNpcTags"
import { CitizenFemale } from "./aiEntities/npcs/citizenFemale"
import { CitizenMale } from "./aiEntities/npcs/citizenMale"
import { HolyEnforcer } from "./aiEntities/npcs/holyEnforcer"
import { getWaynetRegistry } from "./aiStates/aiStateFunctions/commonAiStateFunctions"
import { TrollDescription } from "./aiEntities/descriptions/trollDescriptions"

export function initNewWorldNpcs(aiState: AiState): void {

  const world = "NEWWORLD\\NEWWORLD.ZEN"


  /*
  spawnNpc(aiState,MinecrawlerWarrior(), "NW_FARM1_PATH_SPAWN_02", world);
  spawnNpc(aiState,MinecrawlerWarrior(),"NW_FARM1_PATH_SPAWN_07", world);
  spawnNpc(aiState,MinecrawlerWarrior(),"NW_FARM1_PATH_CITY_19_B", world);
  */
  //spawnNpc(aiState,new Wolf(), "NW_FARM1_PATH_CITY_10_B", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM1_PATH_CITY_05_B", world);
  //spawnNpc(aiState,new Scavenger(), "NW_FARM1_CITYWALL_RIGHT_02", world);
  spawnNpc(aiState,new Scavenger(), "NW_FARM1_OUT_13", world);
  //stone hedge
  spawnNpc(aiState,new OrcElite(), "NW_FARM1_OUT_15", world);
  // waldgraben
  spawnNpc(aiState,new Wolf(), "NW_FARM1_CITYWALL_02_B", world);
  spawnNpc(aiState,new Snapper(), "NW_FARM1_CITYWALL_05", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM1_CITYWALL_FOREST_03", world);
  spawnNpc(aiState,new Shadowbeast(), "NW_FARM1_CITYWALL_FOREST_04_B", world);
  spawnNpc(aiState,new Scavenger(), "NW_FARM1_CITYWALL_FOREST_06", world);
  spawnNpc(aiState,new OrcElite(), "NW_FARM1_CITYWALL_FOREST_08_B", world);
  spawnNpc(aiState,new Snapper(), "NW_FARM1_CITYWALL_FOREST_14", world);
  spawnNpc(aiState,new Snapper(), "NW_FARM1_CITYWALL_FOREST_15", world);
  spawnNpc(aiState,new Snapper(), "NW_FARM1_CITYWALL_FOREST_16", world);//3112
  // monster auf dem weg zu farm 1
  spawnNpc(aiState,new OrcElite(), "NW_XARDAS_TOWER_04", world);
  spawnNpc(aiState,new OrcElite(), "NW_XARDAS_PATH_FARM1_11", world);
  //spawnNpc(aiState,new OrcElite(), "NW_XARDAS_GOBBO_01", world);
  spawnNpc(aiState,new OrcElite(), "NW_XARDAS_GOBBO_02", world);
  //spawnNpc(aiState,OrcElite(), "NW_XARDAS_MONSTER_INSERT_01", world);
  //xardas secret
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_XARDAS_SECRET_15", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_XARDAS_SECRET_04", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_XARDAS_SECRET_27", world);
  //spawnNpc(aiState,new Meatbug(),"FP_ROAM_XARDAS_SECRET_01", world);

  //spawnNpc(aiState,new Meatbug(),"FP_ROAM_XARDAS_SECRET_01", world);
  // Hoehleneingang
  /*
  spawnNpc(aiState,OrcWarrior(),"NW_XARDAS_TOWER_WATERFALL_CAVE_03", world);
  spawnNpc(aiState,Wolf(),"NW_XARDAS_TOWER_WATERFALL_CAVE_ENTRANCE_02", world);
  spawnNpc(aiState,Wolf(),"NW_XARDAS_TOWER_WATERFALL_CAVE_ENTRANCE_05", world);
  spawnNpc(aiState,Wolf(),"NW_XARDAS_TOWER_WATERFALL_CAVE_ENTRANCE_05", world);
  spawnNpc(aiState,Wolf(),"NW_XARDAS_TOWER_WATERFALL_CAVE_ENTRANCE_GOBBO", world);
  spawnNpc(aiState,Wolf(), "NW_XARDAS_TOWER_WATERFALL_CAVE_SIDE_02", world); 
  spawnNpc(aiState,Wolf(), "NW_XARDAS_TOWER_WATERFALL_CAVE_SIDE_02", world);
  */
  ////-im Tal//-
  spawnNpc(aiState,new Wolf(), "NW_XARDAS_VALLEY_03", world);
  spawnNpc(aiState,new Wolf(), "NW_XARDAS_VALLEY_04", world);
  spawnNpc(aiState,new OrcElite(), "NW_XARDAS_VALLEY_06", world);
  //spawnNpc(aiState,OrcWarrior(), "NW_XARDAS_VALLEY_08", world); 
  //spawnNpc(aiState,OrcWarrior(), "NW_XARDAS_TOWER_VALLEY_RAT", world); 
  spawnNpc(aiState,new Wolf(), "NW_XARDAS_TOWER_VALLEY_WOLF", world);
  spawnNpc(aiState,new Wolf(), "NW_XARDAS_TOWER_VALLEY_08", world);
  // kleine hoehle im tal
  spawnNpc(aiState,new OrcElite(), "NW_XARDAS_TOWER_SECRET_CAVE_01", world);
  /*
  spawnNpc(aiState,OrcWarrior(), "NW_XARDAS_TOWER_SECRET_CAVE_01", world);
  spawnNpc(aiState,OrcWarrior(), "NW_XARDAS_TOWER_SECRET_CAVE_01", world);
  spawnNpc(aiState,OrcWarrior(), "NW_XARDAS_TOWER_SECRET_CAVE_03", world);//3223
  */
  //kloster
  /*
  spawnNpc(aiState,SkeletonSH(), "FP_ROAM_MONASTERY_01", world);//3277
  spawnNpc(aiState,SkeletonScout(), "FP_ROAM_MONASTERY_02", world);
  spawnNpc(aiState,SkeletonScout(), "FP_ROAM_MONASTERY_03", world);
  */
  spawnNpc(aiState,new Scavenger(), "NW_PATH_TO_MONASTER_AREA_11", world);
  spawnNpc(aiState,new Scavenger(), "NW_PATH_TO_MONASTER_MONSTER22", world);
  spawnNpc(aiState,new Scavenger(), "NW_PATH_TO_MONASTER_AREA_01", world);
  spawnNpc(aiState,new Scavenger(), "NW_PATH_TO_MONASTER_AREA_02", world);
  spawnNpc(aiState,new Scavenger(), "NW_PATH_TO_MONASTER_AREA_10", world);
  spawnNpc(aiState,new Scavenger(), "NW_PATH_TO_MONASTER_AREA_08", world);
  spawnNpc(aiState,new Scavenger(), "NW_SHRINE_MONSTER", world);
  spawnNpc(aiState,new Scavenger(), "NW_FOREST_CONNECT_MONSTER2", world);//3299

  //feldraeuber hoehle
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_FELDREUBER", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_FELDREUBER2", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_FELDREUBER4", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_MONSTERMILL_11", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_MONSTERMILL_13", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_MONSTERMILL_04", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_MONSTERMILL_03", world);

  // bigmill felder
  spawnNpc(aiState,new Lurker(), "NW_BIGMILL_FIELD_MONSTER_03", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGMILL_FIELD_MONSTER_01", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGMILL_FIELD_MONSTER_02", world);

  /*
  spawnNpc(aiState,Snapper(), "NW_FARM3_BIGWOOD_04", world);  //3470
  spawnNpc(aiState,Sheep(), "FP_ROAM_NW_FARM3_OUT_05_01", world);//3481
  spawnNpc(aiState,Sheep(), "FP_ROAM_NW_FARM3_OUT_05_02", world);
  spawnNpc(aiState,Sheep(), "FP_ROAM_NW_FARM3_OUT_05_03", world);
  spawnNpc(aiState,Sheep(), "FP_ROAM_NW_FARM3_OUT_05_04", world);//3484
  */

  // farm 4
  spawnNpc(aiState,new Scavenger(), "NW_TAVERNE_TROLLAREA_MONSTER_01_01", world);
  /*
  spawnNpc(aiState,Zombie2(),"NW_FARM2_TAVERNCAVE1_09", world); 
  spawnNpc(aiState,Zombie3(),"NW_FARM2_TAVERNCAVE1_10", world); 
  spawnNpc(aiState,Zombie4(),"NW_FARM2_TAVERNCAVE1_08", world); 
  spawnNpc(aiState,Gobbo_Skeleton(),"NW_FARM2_TAVERNCAVE1_02", world); 
  */
  spawnNpc(aiState,new Wolf(), "NW_TAVERNE_TROLLAREA_MONSTER_04_01", world);
  //spawnNpc(aiState,Gobbo_Black(),"NW_TAVERNE_TROLLAREA_MONSTER_05_01", world); 
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_LAKE_MONSTER_01_01", world);
  spawnNpc(aiState,new Lurker(), "NW_BIGFARM_LAKE_MONSTER_02_01", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_LAKE_MONSTER_03_01", world);
  spawnNpc(aiState,new Lurker(), "NW_LAKE_GREG_TREASURE_01", world); //3538

  spawnNpc(aiState,new OrcElite(), "NW_FARM4_WOOD_MONSTER_01", world);
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_01", world);
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_02", world);
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_03", world);
  //spawnNpc(aiState,new OrcWarrior(),"NW_FARM4_WOOD_MONSTER_04", world); 
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_05", world);
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_06", world);
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_06", world);
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_07", world);
  spawnNpc(aiState,new Shadowbeast(), "NW_FARM4_WOOD_MONSTER_08", world);
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_09", world);
  spawnNpc(aiState,new Warg(), "NW_FARM4_WOOD_MONSTER_10", world);

  //crypt
  /*
  spawnNpc(aiState,Skeleton(), "FP_CRYPT_ADDON_01", world)
  spawnNpc(aiState,Skeleton(), "FP_CRYPT_ADDON_02", world)
  spawnNpc(aiState,Skeleton(), "FP_CRYPT_ADDON_03", world)
  spawnNpc(aiState,Skeleton(), "FP_CRYPT_ADDON_04", world)
  spawnNpc(aiState,Skeleton(), "FP_CRYPT_ADDON_05", world)
  spawnNpc(aiState,Skeleton(), "FP_CRYPT_ADDON_06", world)
 
  spawnNpc(aiState,SkeletonLord(), "EVT_CRYPT_ROOM_01_SPAWNMAIN", world);
  spawnNpc(aiState,SkeletonLord(), "EVT_CRYPT_ROOM_02_SPAWNMAIN", world);
  spawnNpc(aiState,SkeletonLord(), "EVT_CRYPT_ROOM_03_SPAWNMAIN", world);//3584
 
*/
  spawnNpc(aiState,new Troll(), "NW_CASTLEMINE_TROLL_08", world);//3623
  spawnNpc(aiState,new Troll(), "NW_CASTLEMINE_TROLL_07", world);//3624

  /*
  spawnNpc(aiState,Skeleton(), "FP_ROAM_CASTLEMINE2_01", world);
  spawnNpc(aiState,Skeleton(), "FP_ROAM_CASTLEMINE2_02", world);
  spawnNpc(aiState,Skeleton(), "FP_ROAM_CASTLEMINE2_03", world);
  spawnNpc(aiState,Skeleton(), "FP_ROAM_CASTLEMINE2_04", world);
  spawnNpc(aiState,Skeleton(), "FP_ROAM_CASTLEMINE2_05", world);
  spawnNpc(aiState,Skeleton(), "FP_ROAM_CASTLEMINE2_06", world);
  spawnNpc(aiState,Skeleton(), "FP_ROAM_CASTLEMINE2_07", world);
  spawnNpc(aiState,SkeletonMage(), "FP_ROAM_CASTLEMINE2_08", world);
  spawnNpc(aiState,Zombie2(), "FP_ROAM_CASTLEMINE2_09", world);
  spawnNpc(aiState,Zombie2(), "FP_ROAM_CASTLEMINE2_10", world);
  spawnNpc(aiState,Zombie3(), "FP_ROAM_CASTLEMINE2_11", world);
  spawnNpc(aiState,Zombie4(), "FP_ROAM_CASTLEMINE2_12", world);
  spawnNpc(aiState,Zombie2(), "FP_ROAM_CASTLEMINE2_13", world);
  spawnNpc(aiState,Minecrawler(), "NW_CASTLEMINE_13", world);
  spawnNpc(aiState,MinecrawlerWarrior(), "NW_CASTLEMINE_10", world);
  spawnNpc(aiState,Minecrawler(), "NW_CASTLEMINE_12", world);
  spawnNpc(aiState,MinecrawlerWarrior(), "NW_CASTLEMINE_06", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_01", world);
  spawnNpc(aiState,Gobbo_Warrior(), "FP_ROAM_NW_BIGFARMFORESTCAVE_02", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_03", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_04", world);
  spawnNpc(aiState,Gobbo_Warrior(), "FP_ROAM_BIGFARM_LAKE_CAVE_02", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_07", world);
  spawnNpc(aiState,Gobbo_Warrior(), "FP_ROAM_BIGFARM_LAKE_CAVE_08", world);
  //spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_09", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_10", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_11", world);
  //spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_12", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_13", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_05", world);
  //spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_06", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_07", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_08", world);
  //spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_09", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_BIGFARMFORESTCAVE_10", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_01", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_02", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_03", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_04", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_05", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_BIGFARM_LAKE_CAVE_06", world);
  */
  //andere
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_LAKE_MONSTER_BLOODFLY", world);
  spawnNpc(aiState,new Wolf(), "NW_TAVERNE_TROLLAREA_MONSTER_03_01M1", world);
  spawnNpc(aiState,new Wolf(), "NW_SAGITTA_MOREMONSTER_01", world);
  spawnNpc(aiState,new Wolf(), "NW_SAGITTA_MOREMONSTER_03", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_NEARPEASANT7", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_NEARPEASANT2_14", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_NEARPEASANT2_10", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_NEARPEASANT2_8", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_NEARPEASANT2_7", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_NEARPEASANT2_12", world);
  //spawnNpc(aiState,Gobbo_Skeleton(), "NW_FARM4_WOOD_MONSTER_MORE_02", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_MONSTER_MORE_01", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_MONSTER_N_3", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM4_WOOD_MONSTER_N_2", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_FOREST_02", world);
  /*
  spawnNpc(aiState,Gobbo_Skeleton(), "NW_CRYPT_MONSTER08", world);
  spawnNpc(aiState,Gobbo_Skeleton(), "NW_CRYPT_MONSTER02", world);
  spawnNpc(aiState,Skeleton(), "NW_CRYPT_MONSTER04", world);
  spawnNpc(aiState,Lesser_Skeleton(), "NW_CRYPT_MONSTER06", world);
  */
  spawnNpc(aiState,new Keiler(), "NW_BIGFARM_FOREST_03_NAVIGATION", world);
  spawnNpc(aiState,new Keiler(), "NW_FARM4_WOOD_NAVIGATION_09", world);
  spawnNpc(aiState,new Wolf(), "NW_CASTLEMINE_TROLL_05", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_ALLEE_08_N", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_ALLEE_08_N_2", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_ALLEE_08_N_5", world);
  //spawnNpc(aiState,Scavenger(), "NW_BIGMILL_05", world);
  spawnNpc(aiState,new Scavenger(), "NW_BIGMILL_05", world);
  spawnNpc(aiState,new Scavenger(), "NW_BIGMILL_FARM3_03", world);
  spawnNpc(aiState,new Scavenger(), "NW_FARM3_BIGWOOD_02", world);
  //PATCH M.F. 
  //spawnNpc(aiState,Keiler(), "NW_FARM3_BIGWOOD_03", world);
  //spawnNpc(aiState,Keiler(), "NW_FARM3_BIGWOOD_03", world);
  spawnNpc(aiState,new Keiler(), "NW_FARM3_BIGWOOD_03", world);
  spawnNpc(aiState,new Lurker(), "NW_FARM3_PATH_11_SMALLRIVER_02", world);
  spawnNpc(aiState,new Lurker(), "NW_FARM3_PATH_11_SMALLRIVER_04", world);
  spawnNpc(aiState,new Scavenger(), "NW_FARM3_PATH_11_SMALLRIVER_08", world);
  spawnNpc(aiState,new Scavenger(), "NW_FARM3_PATH_11_SMALLRIVER_10", world);
  spawnNpc(aiState,new Lurker(), "NW_FARM3_PATH_11_SMALLRIVER_17", world);
  spawnNpc(aiState,new Lurker(), "NW_FARM3_PATH_11_SMALLRIVER_20", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM3_PATH_11_SMALLRIVER_24", world);
  spawnNpc(aiState,new Lurker(), "NW_FARM3_PATH_11_SMALLRIVERMID_03", world);
  spawnNpc(aiState,new Lurker(), "NW_FARM3_PATH_11_SMALLRIVERMID_02", world);
  spawnNpc(aiState,new Keiler(), "NW_FARM3_PATH_12_MONSTER_01", world);
  spawnNpc(aiState,new Keiler(), "NW_FARM3_PATH_12_MONSTER_03", world);
  spawnNpc(aiState,new Lurker(), "NW_FARM3_MOUNTAINLAKE_03", world);
  spawnNpc(aiState,new Lurker(), "NW_FARM3_MOUNTAINLAKE_MONSTER_01", world);
  spawnNpc(aiState,new Keiler(), "NW_BIGFARM_LAKE_03_MOVEMENT", world);
  spawnNpc(aiState,new Wolf(), "NW_BIGFARM_LAKE_03_MOVEMENT3", world);
  //spawnNpc(aiState,Gobbo_Skeleton(), "NW_BIGFARM_LAKE_03_MOVEMENT5", world);
  //3819

  //3936

  spawnNpc(aiState,new Wolf(), "NW_PASS_06", world);
  spawnNpc(aiState,new Wolf(), "NW_PASS_11", world);
  spawnNpc(aiState,new Wolf(), "NW_PASS_SECRET_15", world);
  spawnNpc(aiState,new Wolf(), "NW_PASS_SECRET_16", world);
  spawnNpc(aiState,new Wolf(), "NW_PASS_SECRET_17", world);
  spawnNpc(aiState,new Scavenger(), "NW_PASS_SECRET_05", world);
  spawnNpc(aiState,new Scavenger(), "NW_PASS_SECRET_06", world);
  spawnNpc(aiState,new Scavenger(), "NW_PASS_SECRET_07", world);
  spawnNpc(aiState,new Scavenger(), "NW_PASS_SECRET_08", world);
  /*
  spawnNpc(aiState,Gobbo_Black(),"NW_PASS_GRAT_04", world);
  spawnNpc(aiState,Gobbo_Black(),"NW_PASS_GRAT_05", world);
  spawnNpc(aiState,Gobbo_Black(),"NW_PASS_GRAT_06", world);
  */
  //spawnNpc(aiState,OrcShaman(),"NW_PASS_ORKS_07", world);
  //spawnNpc(aiState,OrcShaman(),"NW_PASS_ORKS_02", world);
  //spawnNpc(aiState,OrcShaman(),"NW_PASS_ORKS_02_B", world);
  //spawnNpc(aiState,OrcShaman(),"NW_PASS_ORKS_13", world);
  //spawnNpc(aiState,OrcShaman(),"NW_PASS_ORKS_04_B", world);
  spawnNpc(aiState,new OrcElite(), "NW_PASS_13", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_14", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_07", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_06", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_06", world);
  spawnNpc(aiState,new OrcElite(), "NW_PASS_ORKS_01", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_01", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_01", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_04", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_04", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_04", world);
  spawnNpc(aiState,new OrcElite(), "NW_PASS_ORKS_08", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_08", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_03", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_09", world);
  spawnNpc(aiState,new OrcElite(), "NW_PASS_ORKS_10", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_10", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_11", world);
  //spawnNpc(aiState,OrcWarrior(),"NW_PASS_ORKS_12", world);

  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP2_12", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP2_10", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP2_28", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP2_29", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP2_17", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP2_13", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP2_36", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP2_34", world);
  /*
  spawnNpc(aiState,Skeleton(), "FP_ROAM_MEDIUMFOREST_KAP3_04", world);
  spawnNpc(aiState,Skeleton(), "FP_ROAM_MEDIUMFOREST_KAP3_05", world);
  spawnNpc(aiState,Zombie2(), "FP_ROAM_MEDIUMFOREST_KAP3_01", world);
  spawnNpc(aiState,Zombie2(), "FP_ROAM_MEDIUMFOREST_KAP3_02", world);
  spawnNpc(aiState,Zombie3(), "FP_ROAM_MEDIUMFOREST_KAP3_03", world);
  */
  spawnNpc(aiState,new Warg(), "FP_ROAM_MEDIUMFOREST_KAP3_08", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_MEDIUMFOREST_KAP3_09", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_MEDIUMFOREST_KAP3_11", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_MEDIUMFOREST_KAP3_15", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_MEDIUMFOREST_KAP3_17", world);
  spawnNpc(aiState,new Keiler(), "FP_ROAM_MEDIUMFOREST_KAP3_21", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_MEDIUMFOREST_KAP3_23", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_MEDIUMFOREST_KAP3_28", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_MEDIUMFOREST_KAP3_29", world);
  spawnNpc(aiState,new Shadowbeast(), "FP_ROAM_MEDIUMFOREST_KAP3_20", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP3_27", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_MEDIUMFOREST_KAP3_26", world);
  spawnNpc(aiState,new OrcElite(), "FP_ROAM_MEDIUMFOREST_KAP3_32", world);
  // //////- vom Osttor zum Leuchtturm //////
  spawnNpc(aiState,new Wolf(), "NW_CITY_TO_LIGHTHOUSE_03", world);
  // //////- K�ste //////
  spawnNpc(aiState,new OrcElite(), "FP_ROAM_SHIPWRECK_04", world);
  //spawnNpc(aiState,OrcWarrior(), "FP_ROAM_SHIPWRECK_01", world); 
  //ADDON spawnNpc(aiState,Waran(),"FP_ROAM_FISHERCOAST_01", world);
  //ADDON spawnNpc(aiState,Waran(),"FP_ROAM_FISHERCOAST_02", world);
  //ADDON: spawnNpc(aiState,Scavenger(), "FP_ROAM_FISHERMAN_01", world);
  //spawnNpc(aiState,OrcWarrior(), "FP_ROAM_FISHERMAN_04", world);
  //4095

  spawnNpc(aiState,new Wolf(), "NW_CITY_TO_FOREST_05", world);
  spawnNpc(aiState,new Wolf(), "NW_CITY_TO_FOREST_07", world);
  spawnNpc(aiState,new Scavenger(), "NW_CITY_TO_FOREST_11", world);
  spawnNpc(aiState,new Scavenger(), "NW_CITY_TO_FOREST_12", world);
  spawnNpc(aiState,new Wolf(), "NW_CITY_TO_FOREST_15", world); //FPs fehlen
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITY_TO_FOREST_47", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_CITY_TO_FOREST_11", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_CITY_TO_FOREST_10", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_CITYFOREST_KAP3_22", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_CITYFOREST_KAP3_20", world);
  spawnNpc(aiState,new Scavenger(), "FP_ROAM_CITYFOREST_KAP3_21", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITYFOREST_KAP3_23", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITYFOREST_KAP3_27", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITYFOREST_KAP3_28", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITYFOREST_KAP3_29", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITYFOREST_KAP3_30", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITYFOREST_KAP3_38", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITY_TO_FOREST_32", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITY_TO_FOREST_29", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITY_TO_FOREST_31", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITY_TO_FOREST_42", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_CITY_TO_FOREST_41", world);
  spawnNpc(aiState,new Shadowbeast(), "FP_ROAM_CITYFOREST_KAP3_04", world);
  /*
  spawnNpc(aiState,Gobbo_Warrior(), "FP_ROAM_CITYFOREST_KAP3_07", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_CITYFOREST_KAP3_06", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_CITYFOREST_KAP3_08", world);
  */
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITYFOREST_KAP3_09", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITYFOREST_KAP3_10", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITYFOREST_KAP3_11", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITYFOREST_KAP3_12", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITYFOREST_KAP3_14", world);
  spawnNpc(aiState,new Warg(), "FP_ROAM_CITYFOREST_KAP3_15", world);
  spawnNpc(aiState,new OrcElite(), "FP_ROAM_CITYFOREST_KAP3_17", world);
  // VINOSKELLEREI
  spawnNpc(aiState,new Scavenger(), "NW_FOREST_VINOSKELLEREI_01", world);

  //4145

  // //////////- SMForestCave ////////////4154
  spawnNpc(aiState,new Scavenger(), "NW_CITY_SMFOREST_05", world);
  /*
  spawnNpc(aiState,Meatbug(), "NW_CITY_SMFOREST_05", world);
  spawnNpc(aiState,Meatbug(), "NW_CITY_SMFOREST_06", world);//4161
  */


  //4166
  //spawnNpc(aiState,Meatbug(), "NW_CITY_SMFOREST_08", world);
  //spawnNpc(aiState,Meatbug(), "NW_CITY_SMFOREST_09", world);
  spawnNpc(aiState,new Scavenger(), "NW_CITY_SMFOREST_09", world);
  spawnNpc(aiState,new Scavenger(), "NW_CITY_SMFOREST_03", world);
  spawnNpc(aiState,new Scavenger(), "NW_CITY_SMFOREST_03", world);
  //spawnNpc(aiState,Meatbug(), "NW_CITY_SMFOREST_01_01", world);
  // //////////- COASTCAVE ////////////
  spawnNpc(aiState,new Shadowbeast(), "NW_FOREST_PATH_35_06", world);
  // //////////- City2Cave ////////////
  //spawnNpc(aiState,OrcWarrior(), "NW_CITY_TO_FOREST_04_08", world);
  spawnNpc(aiState,new Wolf(), "NW_CITY_TO_FOREST_04_09", world);
  spawnNpc(aiState,new Wolf(), "NW_CITY_TO_FOREST_04_05", world);
  //spawnNpc(aiState,Meatbug(), "NW_CITY_TO_FOREST_04_05", world);
  //spawnNpc(aiState,Meatbug(), "NW_CITY_TO_FOREST_04_05_01", world);
  // //////////- BridgeCave ////////////
  spawnNpc(aiState,new Wolf(), "NW_TAVERN_TO_FOREST_05_05", world);
  spawnNpc(aiState,new Wolf(), "NW_TAVERN_TO_FOREST_05_06", world);
  // //////////- ShadowBeastCave ////////////
  //spawnNpc(aiState,Gobbo_Black(), "NW_CITYFOREST_CAVE_A01", world);
  //spawnNpc(aiState,Gobbo_Black(), "NW_CITYFOREST_CAVE_A02", world);
  spawnNpc(aiState,new Scavenger(), "NW_CITYFOREST_CAVE_04", world);
  spawnNpc(aiState,new Wolf(), "NW_CITYFOREST_CAVE_06", world);
  spawnNpc(aiState,new Shadowbeast(), "NW_CITYFOREST_CAVE_A06", world);
  // andere
  spawnNpc(aiState,new Scavenger(), "NW_FARM1_CITYWALL_RIGHT_04", world);
  spawnNpc(aiState,new Scavenger(), "NW_FOREST_PATH_38_MONSTER", world);
  spawnNpc(aiState,new Keiler(), "NW_CITY_TO_LIGHTHOUSE_13_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_35_01", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_31_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_21_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM2_TO_TAVERN_09_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM2_TO_TAVERN_09_MONSTER2", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM2_TO_TAVERN_09_MONSTER3", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM2_TO_TAVERN_09_MONSTER4", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM2_TO_TAVERN_09_MONSTER4", world);
  spawnNpc(aiState,new Wolf(), "NW_FARM2_TO_TAVERN_09_MONSTER5", world);
  spawnNpc(aiState,new Wolf(), "NW_CITY_TO_FOREST_04", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_CAVE1_01", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_75_2_MONSTER", world);
  spawnNpc(aiState,new Keiler(), "NW_FOREST_PATH_79", world);
  spawnNpc(aiState,new Keiler(), "NW_FOREST_PATH_80_1", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_82", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_82_M", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_66_M", world);
  //spawnNpc(aiState,Gobbo_Skeleton(), "NW_FOREST_PATH_62_M", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_57", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_35_01_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_80_1_MOVEMENT8_M", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_80_1_MOVEMENTF", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_31_NAVIGATION3", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_31_NAVIGATION10", world);
  spawnNpc(aiState,new Scavenger(), "NW_FOREST_PATH_31_NAVIGATION11", world);
  spawnNpc(aiState,new Snapper(), "NW_FOREST_PATH_80_1_MOVEMENT6", world);
  spawnNpc(aiState,new Snapper(), "NW_FOREST_PATH_80_1_MOVEMENT15", world);
  spawnNpc(aiState,new Snapper(), "NW_FOREST_PATH_80_1_MOVEMENT8_M5", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_31_NAVIGATION16", world);
  spawnNpc(aiState,new Snapper(), "NW_FOREST_PATH_80_1_MOVEMENT8_M3", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_04_16_MONSTER", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_04_16_MONSTER2", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_04_13", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_04_3", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_04_4", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_72_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_62_06", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_56_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_27_03", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_27_02", world);
  spawnNpc(aiState,new Scavenger(), "NW_CITY_TO_LIGHTHOUSE_13_MONSTER7", world);
  spawnNpc(aiState,new Wolf(), "NW_CITY_TO_LIGHTHOUSE_13_MONSTER8", world);
  spawnNpc(aiState,new Keiler(), "NW_FOREST_PATH_35_MONSTER", world);
  spawnNpc(aiState,new OrcElite(), "NW_FOREST_PATH_31_NAVIGATION_M", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_31_NAVIGATION_M", world);
  spawnNpc(aiState,new OrcElite(), "NW_FOREST_PATH_31_NAVIGATION19", world);
  spawnNpc(aiState,new OrcElite(), "NW_FOREST_PATH_18_MONSTER", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_18_MONSTER", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_72_MONSTER23", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_76", world);
  spawnNpc(aiState,new Warg(), "NW_FOREST_PATH_66_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_04_5", world);
  //Egill/Enim-FIX
  //spawnNpc(aiState,Wolf(), "NW_CITY_TO_FARM2_05_MOV5", world);
  //spawnNpc(aiState,Wolf(), "NW_CITY_TO_FARM2_05_MOV5", world);
  spawnNpc(aiState,new Keiler(), "NW_FOREST_PATH_04_14_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_CITY_SMFOREST_03_M", world);
  spawnNpc(aiState,new Wolf(), "NW_FOREST_PATH_25_01_M", world);
  //4376

  //4423
  //Magierhoehle
  ///*
  //spawnNpc(aiState,Skeleton(), "NW_MAGECAVE_SKELETON", world);
  //spawnNpc(aiState,Lesser_Skeleton(), "NW_MAGECAVE_15", world);
  //spawnNpc(aiState,Lesser_Skeleton(), "NW_MAGECAVE_16", world);
  //spawnNpc(aiState,Lesser_Skeleton(), "NW_MAGECAVE_GUARD_02", world);
  //spawnNpc(aiState,Lesser_Skeleton(), "NW_MAGECAVE_GUARD_01", world);
  //spawnNpc(aiState,Lesser_Skeleton(), "NW_MAGECAVE_CROSSING", world);
  //spawnNpc(aiState,Lesser_Skeleton(), "NW_MAGECAVE_CROSSING", world);
  //*/
  /*
  spawnNpc(aiState,Meatbug(), "NW_MAGECAVE_20", world);
  spawnNpc(aiState,Minecrawler(), "NW_MAGECAVE_23", world);
  spawnNpc(aiState,MinecrawlerWarrior(), "NW_MAGECAVE_27", world);
  //////- Schwarzer Troll ////-
  spawnNpc(aiState,Troll_Black(), "NW_TROLLAREA_PATH_84", world);
  */



  //4450
  //////- Der Weg ////-
  //spawnNpc(aiState,Gobbo_Black(), "NW_TROLLAREA_PATH_56", world);
  //////- Der gro�e See ////-
  spawnNpc(aiState,new Wolf(), "FP_ROAM_TROLLAREA_SEA_01", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_TROLLAREA_SEA_02", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_TROLLAREA_SEA_03", world);
  spawnNpc(aiState,new Wolf(), "FP_ROAM_TROLLAREA_SEA_04", world);
  //RitualForest
  //spawnNpc(aiState,Minecrawler(), "FP_ROAM_RITUALFOREST_CAVE_05", world);
  // spawnNpc(aiState,MinecrawlerWarrior(), "FP_ROAM_RITUALFOREST_CAVE_07", world);
  //spawnNpc(aiState,MinecrawlerWarrior(), "FP_ROAM_RITUALFOREST_CAVE_08", world);
  // spawnNpc(aiState,MinecrawlerWarrior(), "FP_ROAM_RITUALFOREST_CAVE_09", world);
  //spawnNpc(aiState,MinecrawlerWarrior(), "FP_ROAM_RITUALFOREST_CAVE_11", world);
  //////- Die Maya Pyramiden //////  ////// HERE WILL BE A BOSSMOB


  /*
  spawnNpc(aiState,DragonSnapper(), "FP_ROAM_NW_TROLLAREA_RUINS_05", world);
  spawnNpc(aiState,DragonSnapper(), "FP_ROAM_NW_TROLLAREA_RUINS_09", world);
  spawnNpc(aiState,DragonSnapper(), "FP_ROAM_NW_TROLLAREA_RUINS_14", world);
  spawnNpc(aiState,DragonSnapper(), "FP_ROAM_NW_TROLLAREA_RUINS_15", world);
  spawnNpc(aiState,Firewaran(), "NW_TROLLAREA_RUINS_21", world);
  spawnNpc(aiState,Firewaran(), "FP_ROAM_NW_TROLLAREA_RUINS_21", world);
  spawnNpc(aiState,Firewaran(), "FP_ROAM_NW_TROLLAREA_RUINS_22", world);
  spawnNpc(aiState,Firewaran(), "FP_ROAM_NW_TROLLAREA_RUINS_24", world);
  spawnNpc(aiState,OrcElite(), "FP_ROAM_NW_TROLLAREA_RUINS_28", world);
  spawnNpc(aiState,OrcWarrior(), "FP_ROAM_NW_TROLLAREA_RUINS_29", world);
  spawnNpc(aiState,OrcWarrior(), "FP_ROAM_NW_TROLLAREA_RUINS_30", world);
  spawnNpc(aiState,Shadowbeast(), "FP_ROAM_NW_TROLLAREA_RUINS_10", world);
  */

  //in der Maya-H�hle
  //Gobbos in Eingangsh�hle
  /*
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_01", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_02", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_03", world);
  //Gobbos in 2. H�hle
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_05", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_06", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_07", world);
  //Gobbos in 3. H�hle
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_09", world);
  spawnNpc(aiState,Gobbo_Warrior(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_10", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_11", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_12", world);
  spawnNpc(aiState,Gobbo_Black(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_14", world);
  //MineCrawler 1. H�hle
  spawnNpc(aiState,Minecrawler(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_16", world);
  //2. H�hle
  spawnNpc(aiState,Minecrawler(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_21", world);
  spawnNpc(aiState,Minecrawler(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_23", world);
  spawnNpc(aiState,MinecrawlerWarrior(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_20", world);
  spawnNpc(aiState,MinecrawlerWarrior(), "FP_ROAM_NW_TROLLAREA_RUINS_CAVE_26", world);
  //4531
  //4545
  spawnNpc(aiState,Blattcrawler(), "NW_TROLLAREA_PORTALTEMPEL_15_A", world);
  spawnNpc(aiState,Blattcrawler(), "NW_TROLLAREA_PORTALTEMPEL_15_B", world);
  spawnNpc(aiState,Blattcrawler(), "NW_TROLLAREA_PORTALTEMPEL_15_B", world);
  spawnNpc(aiState,Blattcrawler(), "NW_TROLLAREA_PORTALTEMPEL_17_A", world);
  */

  //spawnNpc(aiState,Alligator_PortalDead, "NW_TROLLAREA_PORTALTEMPEL_DEADALLIGATOR", world);
  //B_KillNpc (Alligator_PortalDead);
  ////spawnNpc(aiState,Stoneguardian_Dead1, "NW_TROLLAREA_PORTALTEMPEL_08", world);
  ////B_KillNpc (Stoneguardian_Dead1); 
  ////spawnNpc(aiState,Stoneguardian_Dead2, "AMBOSS", world);
  ////B_KillNpc (Stoneguardian_Dead2); 
  ////spawnNpc(aiState,Stoneguardian_Dead3, "PORTAL", world);
  ////B_KillNpc (Stoneguardian_Dead3); 

  //4566


  //4583
  spawnNpc(aiState,new Wolf(), "NW_TROLLAREA_PATH_66_MONSTER", world);
  spawnNpc(aiState,new Scavenger(), "NW_TROLLAREA_PLANE_07", world);
  spawnNpc(aiState,new Wolf(), "NW_TROLLAREA_NOVCHASE_01", world);
  spawnNpc(aiState,new Wolf(), "NW_TROLLAREA_PATH_38_MONSTER", world);
  spawnNpc(aiState,new Scavenger(), "NW_TROLLAREA_PLANE_04", world);
  spawnNpc(aiState,new Scavenger(), "NW_TROLLAREA_RUINS_17", world);
  //spawnNpc(aiState,new Gobbo_Black(), "NW_TROLLAREA_RUINS_14", world);
  //spawnNpc(aiState,new Waran(), "NW_TROLLAREA_RUINS_32", world);
  spawnNpc(aiState,new Lurker(), "NW_TROLLAREA_PATH_71_MONSTER", world);
  spawnNpc(aiState,new Scavenger(), "NW_TROLLAREA_PATH_71_MONSTER2", world);
  spawnNpc(aiState,new Scavenger(), "NW_TROLLAREA_PATH_15_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_TROLLAREA_RITUALFOREST_04_MONSTER", world);
  spawnNpc(aiState,new Scavenger(), "NW_TROLLAREA_RITUALPATH_04", world);
  //spawnNpc(aiState,new Gobbo_Skeleton(), "NW_TROLLAREA_RITUAL_13", world);
  spawnNpc(aiState,new Wolf(), "NW_TROLLAREA_RITUALPATH_032", world);
  //spawnNpc(aiState,new Wisp(), "NW_TROLLAREA_PLANE_01", world);
  spawnNpc(aiState,new Scavenger(), "NW_TROLLAREA_PATH_22_MONSTER", world);
  spawnNpc(aiState,new Wolf(), "NW_TROLLAREA_RITUALFOREST_06_MONSTER", world);
  spawnNpc(aiState,new Lurker(), "NW_TROLLAREA_PATH_08", world);
  spawnNpc(aiState,new Scavenger(), "NW_TROLLAREA_BRIGDE_05", world);
  //TROLLROCKCAVE
  /*
  spawnNpc(aiState,Skeleton(), "NW_TROLLAREA_TROLLROCKCAVE_03", world);
  spawnNpc(aiState,Skeleton(), "NW_TROLLAREA_TROLLROCKCAVE_05", world);
  spawnNpc(aiState,SkeletonLord(), "NW_TROLLAREA_TROLLROCKCAVE_07", world);
  spawnNpc(aiState,SkeletonLord(), "NW_TROLLAREA_TROLLROCKCAVE_10", world);
  //TROLLLAKECAVE
  spawnNpc(aiState,Meatbug(), "NW_TROLLAREA_TROLLLAKECAVE_03A", world);
  spawnNpc(aiState,Scavenger(), "NW_TROLLAREA_TROLLLAKECAVE_02", world);
  spawnNpc(aiState,Gobbo_Black(), "NW_TROLLAREA_TROLLLAKECAVE_08", world);
  spawnNpc(aiState,Gobbo_Black(), "NW_TROLLAREA_TROLLLAKECAVE_09", world);
  */
  //RIVERSIDECAVE
  spawnNpc(aiState,new Shadowbeast(), "NW_TROLLAREA_RIVERSIDECAVE_02", world);
  spawnNpc(aiState,new Shadowbeast(), "NW_TROLLAREA_RIVERSIDECAVE_07", world);

  for (let i = 0; i < 5; i++) {
    const crimminal = new HeavyCrimminal()
    const spawnPoint = getWaynetRegistry(aiState).registerCrimminalAndGetPoint(crimminal.id)
    spawnNpc(aiState,crimminal, spawnPoint, world);
  }
  for (let i = 0; i < 3; i++) {
    const robber = new RoamingRobber()
    const spawnPoint = getWaynetRegistry(aiState).registerCrimminalAndGetPoint(robber.id)
    spawnNpc(aiState,robber, spawnPoint, world);
  }

  for (let i = 0; i < 15; i++) {
    const citizen = new CitizenMale([LIVES_IN_TOWN_TAG])
    const spawnPoint = getWaynetRegistry(aiState).registerTownieAndGetPoint(citizen.id)
    spawnNpc(aiState,citizen, spawnPoint, world);
  }

  for (let i = 0; i < 15; i++) {
    const citizen = new CitizenFemale([LIVES_IN_TOWN_TAG])
    const spawnPoint = getWaynetRegistry(aiState).registerTownieAndGetPoint(citizen.id)
    spawnNpc(aiState,citizen, spawnPoint, world);
  }

  let pal = new Troll()
    spawnNpc(aiState,pal, "HAFEN", world);
}
