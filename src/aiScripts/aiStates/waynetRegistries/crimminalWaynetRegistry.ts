import { registerAndGetRandomPoint, unregisterFromAllPoints} from "./waynetRegistryFunctions";

export class CrimminalWaynetRegistry {

    private readonly registry: Map<string, number>;
    private availablePoints = [
        "NW_CITY_TO_LIGHTHOUSE_16",
        "NW_TO_PASS_01",
        "NW_FLEEDMT_KAP3",
        "NW_FARM4_WOOD_MONSTER_N_5",
        "NW_FARM3_PATH_14",
        "NW_TROLLAREA_PATH_57",
        "NW_TROLLAREA_PATH_32",
        "NW_TROLLAREA_RUINS_37",
        "NW_TROLLAREA_RUINS_33",
        "NW_TROLLAREA_PLANE_02",
        "NW_TROLLAREA_PATH_01_01",
        "NW_TROLLAREA_PATH_71_MONSTER2",
        "FP_STAND_HAFEN_03",
        "FP_STAND_FARM1_CANTHAR",
        "FP_ROAM_FARM1_SHEEP_12",
        "FP_STAND_CITY_BEER_01",
        "FP_ROAM_CITY_TO_FOREST_39",
        "FP_STAND_NW_BIGFARM_KITCHEN_DAR",
        "FP_STAND_HODGES_01",
        "FP_STAND_DEMENTOR_08"
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