import { IAiNpc } from "../iAiNpc"
import { INSTANCE_WOLF } from "./npcInits"
import { Wolf } from "./wolf"

export function getNpcForInstance(instanceName: string): IAiNpc {
    if (instanceName === INSTANCE_WOLF) {
        return new Wolf()
    }
    return new Wolf()
}
