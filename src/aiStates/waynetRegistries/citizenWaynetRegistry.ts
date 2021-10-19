import { registerAndGetRandomPoint, unregisterFromAllPoints } from "./waynetRegistryFunctions";

export class CitizenWaynetRegistry {

    private registry: Map<string, number>;
    private availablePoints = [
        "FP_STAND_CITY_30",
        "FP_STAND_CITY_31",
        "FP_STAND_CITY_BEER_03",
        "FP_STAND_CITY_BEER_02",
        "FP_STAND_CITY_BEER_01",
        "FP_STAND_CITY_REGIS",
        "FP_STAND_GUARDING_MARKT_01",
        "FP_STAND_CITY_12",
        "FP_STAND_CITY_11",
        "FP_STAND_CITY_16",
        "FP_STAND_CITY_13",
        "FP_STAND_CITY_020",
        "FP_STAND_CITY_01",
        "FP_STAND_CITY_05",
        "FP_STAND_CITY_17",
        "FP_STAND_CITY_18",
        "FP_STAND_CITY_10",
        "FP_STAND_WEAPON_02",
        "FP_STAND_WEAPON_03",
        "FP_STAND_WEAPON_04",
        "FP_STAND_WEAPON_01",
        "FP_STAND_WEAPON_05",
        "FP_STAND_CITY_BEER_04",
        "FP_STAND_CITYKNEIPE_OUT",
        "FP_STAND_CITY_20",
        "FP_STAND_CITY_CAULDRON_01",
        "FP_STAND_HAFEN_03",
        "FP_STAND_NW_CITY_MERCHANT_SHOP03_FRONT_02",
        "FP_SMALLTALK_BEER_01",
        "FP_SMALLTALK_BEER_02",
        "FP_SMALLTALK_BLUBBER_01",
        "FP_SMALLTALK_BLUBBER_02",
        "FP_SMALLTALK_CITY_29",
        "FP_SMALLTALK_CITY_28",
        "FP_SMALLTALK_CITY_23",
        "FP_SMALLTALK_CITY_22",
        "FP_SMALLTALK_CITY_14",
        "FP_SMALLTALK_CITY_12",
        "FP_SMALLTALK_CITY_13",
        "FP_SMALLTALK_CITY_11",
        "FP_SMALLTALK_CITY_06",
        "FP_SMALLTALK_CITY_07",
        "FP_SMALLTALK_CITY_20",
        "FP_SMALLTALK_CITY_19",
        "FP_SMALLTALK_CITY_18",
        "FP_SMALLTALK_CITY_MERCHANT_03",
        "FP_SMALLTALK_CITY_MERCHANT_04",
        "FP_SMALLTALK_TAVERN01_02",
        "FP_SMALLTALK_TAVERN01_01",
        "FP_STAND_TAVERN01_01",
        "FP_STAND_TAVERN01_03",
        "FP_STAND_TAVERN01_04",
        "FP_STAND_TAVERN01_05",
        "FP_STAND_CITY_TAVERN_01",
        "FP_STAND_CITY_TAVERN_02",
        "FP_SMALLTALK_SCHREINER_01",
        "FP_SMALLTALK_SCHREINER_02",
        "FP_SMALLTALK_CITYKNEIPE_01",
        "FP_SMALLTALK_CITYKNEIPE_02",
        "FP_SMALLTALK_CITYKNEIPE_03",
        "FP_SMALLTALK_CITYKNEIPE_04"
    ]

    constructor() {
        this.registry = new Map()
    }

    public registerAndGetRandomPoint(npcId: number): string{
        return registerAndGetRandomPoint(this.registry, npcId, this.availablePoints)
    }

    public unregisterFromAllPoints(npcId: number) {
        unregisterFromAllPoints(this.registry, npcId)
    }

}