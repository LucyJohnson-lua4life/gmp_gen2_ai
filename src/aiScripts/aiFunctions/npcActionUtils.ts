import { AiState } from "../aiStates/aiState";
import { getCharacterInPositionAreas } from "../aiStates/aiStateFunctions/commonAiStateFunctions";
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
        const worldPositionMap = getCharacterInPositionAreas(this.aiState).get(world);
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
     //TODO: world should be replaced with a world id
     * @param characterId
     * @param world
     */
    public getNearestCharacter(characterId: number, world: string): number {
        const worldPositionMap = getCharacterInPositionAreas(this.aiState).get(world);
        let nearestDist = 9999999
        let nearestChar = -1
        if (typeof worldPositionMap !== 'undefined' && revmp.valid(characterId)) {
            const pos = revmp.getPosition(characterId).position
            const nearbyCharacter = worldPositionMap.get(this.calculatePositionCheckSum(pos[0], pos[1], pos[2]));
            if (typeof nearbyCharacter !== 'undefined') {
                nearbyCharacter.forEach(targetId => {
                    const nearbyPos = revmp.getPosition(targetId).position
                    const tmpPos = Math.hypot(pos[0] - nearbyPos[0], pos[1] - nearbyPos[1], pos[2] - nearbyPos[2])
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
