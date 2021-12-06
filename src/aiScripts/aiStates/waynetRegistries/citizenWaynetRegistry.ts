import { registerAndGetRandomPoint, unregisterFromAllPoints } from "./waynetRegistryFunctions";

export class TownWaynetRegistry {

    private registry: Map<string, number>;
    private availablePoints = [
        "FP_PEE_CITY_OV_01",
        "FP_STAND_CITY_BEER_03",
        "FP_STAND_CITY_BEER_02",
        "FP_STAND_CITY_BEER_01",
        "FP_STAND_CITY_REGIS",
        "FP_STAND_CITY_ANDRE",
        "FP_PEE_CITY_02",
        "FP_SWEEP_CITY_12",
        "FP_SMALLTALK_CITY_36",
        "FP_SMALLTALK_CITY_35",
        "FP_STAND_CITY_32",
        "FP_SMALLTALK_CITY_33",
        "FP_SMALLTALK_CITY_32",
        "FP_SMALLTALK_CITY_30",
        "FP_SMALLTALK_CITY_31",
        "FP_SMALLTALK_CITY_29",
        "FP_SMALLTALK_CITY_28",
        "FP_STAND_CITY_12",
        "FP_STAND_CITY_11",
        "FP_SMALLTALK_CITY_27",
        "FP_SMALLTALK_CITY_26",
        "FP_SMALLTALK_CITY_23",
        "FP_SMALLTALK_CITY_22",
        "FP_STAND_CITY_16",
        "FP_STAND_CITY_13",
        "FP_SMALLTALK_CITY_14",
        "FP_SMALLTALK_CITY_12",
        "FP_SMALLTALK_CITY_13",
        "FP_STAND_CITY_020",
        "FP_STAND_CITY_01",
        "FP_PEE_CITY_01",
        "FP_STAND_CITY_05",
        "FP_STAND_CITY_06",
        "FP_SMALLTALK_CITY_04_01",
        "FP_SMALLTALK_CITY_04_02",
        "FP_STAND_CITY_30",
        "FP_STAND_CITY_31",
        "FP_SMALLTALK_CITY_11",
        "FP_STAND_CITY_17",
        "FP_STAND_CITY_18",
        "FP_SMALLTALK_CITY_06",
        "FP_SMALLTALK_CITY_07",
        "FP_SMALLTALK_CITY_20",
        "FP_SMALLTALK_CITY_19",
        "FP_SMALLTALK_CITY_18",
        "FP_STAND_CITY_10",
        "FP_SMALLTALK_NW_CITY_MERCHANT_01",
        "FP_SMALLTALK_NW_CITY_MERCHANT_02",
        "FP_SMALLTALK_CITY_MERCHANT_03",
        "FP_SMALLTALK_CITY_MERCHANT_04",
        "FP_SMALLTALK_CITY_37",
        "FP_SMALLTALK_CITY_38",
        "FP_SMALLTALK_CITY_40",
        "FP_SMALLTALK_CITY_39",
        "FP_STAND_CITY_TAVERN_01",
        "FP_STAND_CITY_TAVERN_02",
        "FP_STAND_CITY_TAVERN_03",
        "FP_STAND_CITY_BEER_04",
        "FP_SMALLTALK_CITYKNEIPE_01",
        "FP_SMALLTALK_CITYKNEIPE_02",
        "FP_SMALLTALK_CITYKNEIPE_03",
        "FP_SMALLTALK_CITYKNEIPE_04",
        "FP_STAND_CITYKNEIPE_OUT",
        "FP_STAND_CITY_20",
        "FP_STAND_CITY_CAULDRON_01",
        "FP_PEE_CITY_03",
        "FP_STAND_CITY_PALCAMP_01",
        "FP_STAND_CITY_PALCAMP_03",
        "FP_STAND_CITY_PALCAMP_02",
        "FP_STAND_CITY_PALCAMP_04",
        "FP_STAND_CITY_PALCAMP_05",
        "FP_STAND_CITY_PALCAMP_06",
        "FP_STAND_CITY_PALCAMP_07",
        "FP_SMALLTALK_CITY_PALCAMP_02",
        "FP_SMALLTALK_CITY_PALCAMP_01",
        "FP_SMALLTALK_CITY_PALCAMP_03",
        "FP_SMALLTALK_CITY_PALCAMP_04",
        "FP_SMALLTALK_CITY_PALCAMP_06",
        "FP_SMALLTALK_CITY_PALCAMP_05",
        "FP_SMALLTALK_CITY_PALCAMP_08",
        "FP_SMALLTALK_CITY_PALCAMP_07",
        "FP_SMALLTALK_CITY_PALCAMP_09",
        "FP_SMALLTALK_CITY_PALCAMP_10",
        "FP_SMALLTALK_CITY_PALCAMP_11",
        "FP_SMALLTALK_CITY_PALCAMP_12",
        "FP_SMALLTALK_CITY_PALCAMP_13",
        "FP_SMALLTALK_CITY_PALCAMP_14",
        "FP_CITY_TAVERN_01",
        "FP_CITY_TAVERN_02",
        "FP_CITY_TAVERN_03",
        "FP_CITY_TAVERN_04"
    ]

    constructor() {
        this.registry = new Map()
    }

    public registerAndGetRandomPoint(npcId: number): string {
        return registerAndGetRandomPoint(this.registry, npcId, this.availablePoints)
    }

    public unregisterFromAllPoints(npcId: number) {
        unregisterFromAllPoints(this.registry, npcId)
    }

}