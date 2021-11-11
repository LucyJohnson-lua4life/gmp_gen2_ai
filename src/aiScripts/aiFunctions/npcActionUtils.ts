import { AiState } from "../aiStates/aiState";
import { getDistance } from "./aiUtils";


/**
 * Provides utility functions for npc's to execute their actions.
 */
const AI_TARGET_DISTANCE = 2500;
export class NpcActionUtils {

    private aiState: AiState;

    constructor(aiState: AiState) {
        this.aiState = aiState;
    }

    /**
     * Returns all npc id's that are in the same 2500x2500x2500 distance sector of the given point.
     * 
     * E.g 
     * 3500x3100x4000 are in the same sector as 4999x4999x4999
     * 5000x3100x4000 are NOT in the same sector as 4999x4999x4999
     * 
     * @param world 
     * @param x the x value of the point, for which nearby npc ids should be found
     * @param y the y value of the point, for which nearby npc ids should be found
     * @param z the z value of the point, for which nearby npc ids should be found
     */
    public getNearbyNpcs(world: string, x: number, y: number, z: number): Array<number> {
        const worldPositionMap = this.aiState.getCharacterInPositionAreas().get(world);
        const deepCopyOfNearbyNpcs: Array<number> = []
        if (typeof worldPositionMap !== 'undefined') {
            const nearbyNpcs = worldPositionMap.get(this.calculatePositionCheckSum(x, y, z));
            if (typeof nearbyNpcs !== 'undefined') {
                nearbyNpcs.forEach(id => deepCopyOfNearbyNpcs.push(id))
            }
        }
        return deepCopyOfNearbyNpcs;
    }

    /**
     * Returns nearest character id to given character or -1 if none exist.
     * @param npcId get id of character that is closest to the given character id
     //TODO: world should be replaced with a world id
     */
    public getNearestCharacter(characterId: number, world: string): number {
        const worldPositionMap = this.aiState.getCharacterInPositionAreas().get(world);
        let nearestDist = 9999999
        let nearestChar = -1
        if (typeof worldPositionMap !== 'undefined' && revmp.valid(characterId)) {
            const pos = revmp.getPosition(characterId).position
            const nearbyCharacter = worldPositionMap.get(this.calculatePositionCheckSum(pos[0], pos[1], pos[2]));
            if (typeof nearbyCharacter !== 'undefined') {
                nearbyCharacter.forEach(targetId => {
                    const nearbyPos = revmp.getPosition(targetId).position
                    const tmpPos = this.getDistance(pos[0], pos[1], pos[2], nearbyPos[0], nearbyPos[1], nearbyPos[2])
                    if (tmpPos < nearestDist && characterId !== targetId) {
                        nearestDist = tmpPos
                        nearestChar = targetId
                    }
                })
            }
        }
        return nearestChar
    }
    public getNearestCharacterRangeMapping(aiId: number, world: string): [number, number] {
        //"NEWWORLD\\NEWWORLD.ZEN"
        const charId = this.getNearestCharacter(aiId, world)
        let range = 99999999
        if (charId !== aiId && charId !== -1 && revmp.isPlayer(charId)) {
            range = getDistance(aiId, charId)
        }
        return [charId, range]
    }

    private getDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
        if ([x1, y1, z1, x2, y2, z2].some((val) => (typeof val === 'undefined'))) {
            return 99999
        }
        const x = x1 - x2
        const y = y1 - y2
        const z = z1 - z2

        return Math.sqrt(x * x + y * y + z * z);
    }



    /**
     * Returns the checksum that determines if entities are located in the same sector,
     * based on their positions.
     *
     * E.g
     * 3500x3100x4000 are in the same sector as 4999x4999x4999
     * 5000x3100x4000 are NOT in the same sector as 4999x4999x4999
     *
     * @param x the x value of the point, for which nearby npc ids should be found
     * @param y the y value of the point, for which nearby npc ids should be found
     * @param z the z value of the point, for which nearby npc ids should be found
     */
    public calculatePositionCheckSum(x: number, y: number, z: number): number {
        return Math.floor(x / AI_TARGET_DISTANCE) + 1000 * Math.floor(y / AI_TARGET_DISTANCE) + 1000 * Math.floor(z / AI_TARGET_DISTANCE) * 1000
    }

}
