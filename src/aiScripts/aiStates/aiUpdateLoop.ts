import { IActionComponent } from '../aiEntities/components/iActionsComponent';
import { IAiActionDescriptions } from '../aiEntities/components/iAiActionDescriptions';
import { IAiAction } from '../aiEntities/iAiAction';
import { IActionDescription } from '../aiEntities/iActionDescription';
import { getNpcForInstance } from '../aiEntities/npcs/npcEntityUtils';
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';
import { AiState } from './aiState';
import { getActionDescriptionComponent, getActionsComponent, getAllBots, getCharacterInPositionAreas, getNpcStateComponent, getPositionsComponents, getRespawnComponent, setRespawnComponent, unregisterBot } from './aiStateFunctions/commonAiStateFunctions';
import { spawnNpc } from './aiStateFunctions/spawnFunctions';

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
        getCharacterInPositionAreas(this.aiState).set(this.world, new Map<number, Array<number>>())
        const allPositions: Map<number, Array<number>>|undefined = getCharacterInPositionAreas(this.aiState).get(this.world)
        // update positions for each character
        if(typeof allPositions !== 'undefined'){

        revmp.characters.forEach(charId =>{
            const pos = revmp.getPosition(charId).position
            const checksum = this.npcActionUtils.calculatePositionCheckSum(pos[0], pos[1], pos[2])
            const playerOfChecksum = allPositions.get(checksum)
            if(allPositions.has(checksum) && typeof playerOfChecksum !== 'undefined'){
                playerOfChecksum.push(charId)
            }
            else{
                allPositions.set(checksum, [charId])
            }})

        }

        this.readDescriptions()
        this.respawnDeadNpcs()
        getAllBots(this.aiState).forEach((aiId) => this.updateAi(aiId))
    }

    public readDescriptions() {
        getAllBots(this.aiState).forEach((aiId) => this.readDescription(aiId))
    }

    public updateAi(aiId: number) {
        const actionsComponent:IActionComponent | undefined = getActionsComponent(this.aiState, aiId);

        if (typeof actionsComponent !== 'undefined') {
            const nextAction:IAiAction|undefined = actionsComponent.nextAction
            if (typeof nextAction !== 'undefined' && this.isEntityUpdateable(aiId)){
                nextAction.executeAction()
                if(nextAction.shouldLoop === false){
                    actionsComponent.nextAction = undefined
                }
            }
        }

        //register if dead
        if(revmp.getHealth(aiId).current <= 0 && revmp.isBot(aiId) ){
            const respawnInfo = getRespawnComponent(this.aiState, aiId)
            if(typeof respawnInfo !== 'undefined' && respawnInfo.deathTime === -1){
                respawnInfo.deathTime = Date.now()
                setRespawnComponent(this.aiState, respawnInfo)
            }
        }

    }

    public readDescription(aiId: number) {
        const descriptionComponent: IAiActionDescriptions | undefined = getActionDescriptionComponent(this.aiState,aiId);

        // remove action list restriction
        if (typeof descriptionComponent !== 'undefined' && this.isEntityUpdateable(aiId)) {
            const descriptions: Array<IActionDescription> | undefined = descriptionComponent.descriptions
            descriptions.forEach(description => description.describeAction(this.aiState))
        }
    }

    public respawnDeadNpcs(){
        revmp.characters.forEach(charId =>{
            const respawnComponent = getRespawnComponent(this.aiState, charId)
            if(typeof respawnComponent !== 'undefined' && respawnComponent.deathTime !== -1 && Date.now() > respawnComponent.deathTime + (respawnComponent.respawnTime*1000) && revmp.isBot(charId)){
                // respawn npc and set state
                this.respawnNpc(charId)
            }
        })
    }

    private respawnNpc(aiId: number) {
        const lastPosition = getPositionsComponents(this.aiState, aiId)
        const lastNpcInstance = getNpcStateComponent(this.aiState, aiId)?.npcInstance
        unregisterBot(this.aiState, aiId)
        revmp.destroyCharacter(aiId)
        if (typeof lastNpcInstance !== 'undefined' && typeof lastPosition !== 'undefined') {
            //TODO: extend getNpc for state
            //todo: fix this
            const spawnPoint = typeof lastPosition.startPoint !== 'undefined' ? lastPosition.startPoint : "HAFEN"
            const spawnWorld = typeof lastPosition.startWorld !== 'undefined' ? lastPosition.startWorld : this.world
            spawnNpc(this.aiState,getNpcForInstance(lastNpcInstance), spawnPoint, spawnWorld)
        }
    }

    private isEntityUpdateable(entityId: number){
        return revmp.getHealth(entityId).current > 0 && revmp.isCharacter(entityId)
    }

}
