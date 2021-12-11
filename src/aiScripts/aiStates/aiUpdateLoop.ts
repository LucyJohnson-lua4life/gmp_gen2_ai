import { IAiActionDescriptions } from '../aiEntities/components/iAiActionDescriptions';
import { IAiAction } from '../aiEntities/iAiAction';
import { IActionDescription } from '../aiEntities/iActionDescription';
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';
import { AiState } from './aiState';
import { deleteAiAction, getAiActionDescriptions, getAiAction, getAllBots, getCharacterInPositionAreas, getAiRespawnInfo, setAiRespawnInfo} from './aiStateFunctions/commonAiStateFunctions';
import { respawnNpc} from './aiStateFunctions/spawnFunctions';

/**
 * Represents the loop that iterates through each npc state and executes the next actions for each npc.
 * The loops also executes descriptions, that decide which actions to put into the action collection of each npc's based on the npc state and environment.
 */
export class AiUpdateLoop {
    //todo: this constant world should only be used temporary!
    private world = "NEWWORLD\\NEWWORLD.ZEN"
    private aiState: AiState;
    private npcActionUtils: NpcActionUtils

    constructor(aiState: AiState) {
        this.aiState = aiState;
        this.npcActionUtils = new NpcActionUtils(aiState)
    }

    public updateAll() {
        this.updatePositions()
        this.readDescriptions()
        this.respawnDeadNpcs()
        this.executeAllAiActions()
        this.registerAllDeadNpc()
    }

    private executeAllAiActions() {
        getAllBots(this.aiState).forEach((aiId) => this.executeAiAction(aiId))
    }

    private registerAllDeadNpc() {
        getAllBots(this.aiState).forEach((aiId) => this.registerDeadNpc(aiId))
    }

    private updatePositions() {
        getCharacterInPositionAreas(this.aiState).set(this.world, new Map<number, Array<number>>())
        const allPositions: Map<number, Array<number>> | undefined = getCharacterInPositionAreas(this.aiState).get(this.world)
        // update positions for each character
        if (typeof allPositions !== 'undefined') {

            revmp.characters.forEach(charId => {
                const pos = revmp.getPosition(charId).position
                const checksum = this.npcActionUtils.calculatePositionCheckSum(pos[0], pos[1], pos[2])
                const playerOfChecksum = allPositions.get(checksum)
                if (allPositions.has(checksum) && typeof playerOfChecksum !== 'undefined') {
                    playerOfChecksum.push(charId)
                }
                else {
                    allPositions.set(checksum, [charId])
                }
            })

        }
    }

    private readDescriptions() {
        getAllBots(this.aiState).forEach((aiId) => this.readDescription(aiId))
    }

    private executeAiAction(aiId: number) {
        const currentAction: IAiAction | undefined = getAiAction(this.aiState, aiId);

        if (typeof currentAction !== 'undefined') {
            if (this.isEntityUpdateable(aiId)) {
                currentAction.executeAction()
                if (currentAction.shouldLoop === false) {
                    deleteAiAction(this.aiState, aiId)
                }
            }
        }
    }

    private registerDeadNpc(aiId: number){
        if (revmp.getHealth(aiId).current <= 0 && revmp.isBot(aiId)) {
            const respawnInfo = getAiRespawnInfo(this.aiState, aiId)
            if (typeof respawnInfo !== 'undefined' && respawnInfo.deathTime === -1) {
                respawnInfo.deathTime = Date.now()
                setAiRespawnInfo(this.aiState, respawnInfo)
            }
        }
    }

    private readDescription(aiId: number) {
        const descriptionComponent: IAiActionDescriptions | undefined = getAiActionDescriptions(this.aiState, aiId);

        // remove action list restriction
        if (typeof descriptionComponent !== 'undefined' && this.isEntityUpdateable(aiId)) {
            const descriptions: Array<IActionDescription> | undefined = descriptionComponent.descriptions
            descriptions.forEach(description => description.describeAction(this.aiState))
        }
    }

    private respawnDeadNpcs() {
        revmp.characters.forEach(charId => {
            const respawnInfo = getAiRespawnInfo(this.aiState, charId)
            if (typeof respawnInfo !== 'undefined' && respawnInfo.deathTime !== -1 && Date.now() > respawnInfo.deathTime + (respawnInfo.respawnTime * 1000) && revmp.isBot(charId)) {
                // respawn npc and set state
                respawnNpc(this.aiState, charId, this.world)
            }
        })
    }

    private isEntityUpdateable(entityId: number) {
        return revmp.getHealth(entityId).current > 0 && revmp.isCharacter(entityId)
    }

}
