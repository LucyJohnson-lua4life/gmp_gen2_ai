import { IAiNpc } from "../iAiNpc"
import { HeavyCrimminal } from "./heavyCrimminal"
import { Keiler } from "./keiler"
import { Lurker } from "./lurker"
import { INSTANCE_HEAVY_CRIMMINAL, INSTANCE_KEILER, INSTANCE_LURKER, INSTANCE_ORC_ELITE, INSTANCE_ORC_UNDEAD, INSTANCE_ORC_WARRIOR, INSTANCE_ROAMING_ROBBER, INSTANCE_SCAVENGER, INSTANCE_SHADOWBEAST, INSTANCE_SNAPPER, INSTANCE_TROLL, INSTANCE_WARG, INSTANCE_WOLF } from "./npcInits"
import { OrcElite } from "./orcElite"
import { OrcWarrior } from "./orcWarrior"
import { RoamingRobber } from "./roamingRobber"
import { Scavenger } from "./scavenger"
import { Shadowbeast } from "./shadowbeast"
import { Snapper } from "./snapper"
import { Troll } from "./troll"
import { UndeadOrc } from "./undeadOrc"
import { Warg } from "./warg"
import { Wolf } from "./wolf"

export function getNpcForInstance(instanceName: string): IAiNpc {
    if (instanceName === INSTANCE_WOLF) {
        return new Wolf()
    }
    else if (instanceName === INSTANCE_SCAVENGER) {
        return new Scavenger()
    }
    else if (instanceName === INSTANCE_SNAPPER) {
        return new Snapper()
    }
    else if (instanceName === INSTANCE_WARG) {
        return new Warg()
    }
    else if (instanceName === INSTANCE_SHADOWBEAST) {
        return new Shadowbeast()
    }
    else if (instanceName === INSTANCE_KEILER) {
        return new Keiler()
    }
    else if (instanceName === INSTANCE_TROLL) {
        return new Troll()
    }
    else if (instanceName === INSTANCE_LURKER) {
        return new Lurker()
    }
    else if (instanceName === INSTANCE_ORC_WARRIOR) {
        return new OrcWarrior()
    }
    else if (instanceName === INSTANCE_ORC_ELITE) {
        return new OrcElite()
    }
    else if (instanceName === INSTANCE_ORC_UNDEAD) {
        return new UndeadOrc()
    }
    else if (instanceName === INSTANCE_HEAVY_CRIMMINAL) {
        return new HeavyCrimminal()
    }
    else if (instanceName === INSTANCE_ROAMING_ROBBER) {
        return new RoamingRobber()
    }
    return new Wolf()
}
