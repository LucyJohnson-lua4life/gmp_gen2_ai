import { registerAndGetRandomPoint, unregisterFromAllPoints } from "./waynetRegistryFunctions";

export class BigFarmWaynetRegistry {

    private registry: Map<string, number>;
    private availablePoints = [
        "FP_SMALLTALK_NW_BIGFARM_KITCHEN_04",
        "FP_SMALLTALK_NW_BIGFARM_KITCHEN_03",
        "FP_STAND_BIGFARM_RAOUL",
        "FP_PEE_BIGFARM_TREE",
        "FP_SMALLTALK_BIGFARMHUT_02",
        "FP_SMALLTALK_BIGFARMHUT_01",
        "FP_SMALLTALK_NW_BIGFARM_ALVARES_02",
        "FP_SMALLTALK_NW_BIGFARM_ALVARES_01",
        "FP_STAND_BIGFARM_OUT_TORLOF",
        "FP_STAND_NW_BIGFARM_HOUSE_16",
        "FP_STAND_NW_BIGFARM_KITCHEN_DAR",
        "FP_STAND_NW_BIGFARM_STABLE_01",
        "FP_SMALLTALK_NW_BIGFARM_STABLE_01_02",
        "FP_SMALLTALK_NW_BIGFARM_STABLE_01_01",
        "FP_STAND_NW_BIGFARM_HOUSE_06_01",
        "FP_SMALLTALK_NW_BIGFARM_KITCHEN_02",
        "FP_SMALLTALK_NW_BIGFARM_KITCHEN_01",
        "FP_STAND_NW_BIGFARM_KITCHEN_BAR_01",
        "FP_SMALLTALK_NW_BIGFARM_STABLE_01",
        "FP_SMALLTALK_NW_BIGFARM_STABLE_02",
        "FP_SMALLTALK_NW_BIGFARM_SMITH_01",
        "FP_SMALLTALK_NW_BIGFARM_SMITH_02",
        "FP_SMALLTALK_NW_BIGFARM_HOUSE_OUT_01",
        "FP_STAND_NW_BIGFARM_STABLE_OUT_01",
        "FP_SMALLTALK_NW_BIGFARM_KITCHEN_OUT_01",
        "FP_SMALLTALK_NW_BIGFARM_KITCHEN_OUT_02",
        "FP_STAND_NW_BIGFARM_VORPOSTEN1_02",
        "FP_STAND_NW_BIGFARM_VORPOSTEN1_01",
        "FP_CAMPFIRE_NW_BIGFARM_VORPOSTEN1_01",
        "FP_CAMPFIRE_NW_BIGFARM_VORPOSTEN1_02",
        "FP_SMALLTALK_NW_BIGFARM_HOUSE_SLD_01",
        "FP_SMALLTALK_NW_BIGFARM_HOUSE_SLD_02",
        "FP_STAND_NW_BIGFARM_HOUSE_UP2_01",
        "FP_SMALLTALK_NW_BIGFARM_HOUSE_OUT_02",
        "FP_SMALLTALK_NW_BIGFARM_STABLE_OUT_03",
        "FP_SMALLTALK_NW_BIGFARM_STABLE_OUT_031"
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