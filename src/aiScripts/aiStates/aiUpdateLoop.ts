import { IActionComponent } from '../aiEntities/components/iActionsComponent';
import { IActionDescriptionComponent } from '../aiEntities/components/iActionDescriptionComponent';
import { IAiAction } from '../aiEntities/iAiAction';
import { IActionDescription } from '../aiEntities/iActionDescription';
import { getNpcForInstance } from '../aiEntities/npcs/npcEntityUtils';
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';
import { AiStateFunctions } from '../aiStates/aiStateFunctions';
import { AiState } from './aiState';

/**
 * Represents the loop that iterates through each npc state and executes the next actions for each npc.
 * The loops also executes descriptions, that decide which actions to put into the action collection of each npc's based on the npc state and environment.
 */
export class AiUpdateLoop {
    //todo: this constant world should only be used temporary!
    private world = "NEWWORLD\\NEWWORLD.ZEN"
    private aiState: AiState;
    private npcActionUtils: NpcActionUtils
    private aiStateFunctions: AiStateFunctions

    constructor(aiState: AiState) {
        this.aiState = aiState;
        this.npcActionUtils = new NpcActionUtils(aiState)
        this.aiStateFunctions = new AiStateFunctions(aiState)
    }

    public updateAll() {
        this.aiState.getCharacterInPositionAreas().set(this.world, new Map<number, Array<number>>())
        const allPositions: Map<number, Array<number>>|undefined = this.aiState.getCharacterInPositionAreas().get(this.world)
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
        this.aiState.getAllBots().forEach((aiId) => this.updateAi(aiId))
    }

    public readDescriptions() {
        this.aiState.getAllBots().forEach((aiId) => this.readDescription(aiId))
    }

    public updateAi(aiId: number) {
        const actionsComponent:IActionComponent | undefined = this.aiState.getEntityManager().getActionsComponent(aiId);

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
            const respawnInfo = this.aiState.getEntityManager().getRespawnComponent(aiId)
            if(typeof respawnInfo !== 'undefined' && respawnInfo.deathTime === -1){
                respawnInfo.deathTime = Date.now()
                this.aiState.getEntityManager().setRespawnComponent(aiId, respawnInfo)
            }
        }

    }

    public readDescription(aiId: number) {
        const descriptionComponent: IActionDescriptionComponent | undefined = this.aiState.getEntityManager().getActionDescriptionComponent(aiId);

        // remove action list restriction
        if (typeof descriptionComponent !== 'undefined' && this.isEntityUpdateable(aiId)) {
            const descriptions: Array<IActionDescription> | undefined = descriptionComponent.descriptions
            descriptions.forEach(description => description.describeAction(this.aiState))
        }
    }

    public respawnDeadNpcs(){
        revmp.characters.forEach(charId =>{
            const respawnComponent = this.aiState.getEntityManager().getRespawnComponent(charId)
            if(typeof respawnComponent !== 'undefined' && respawnComponent.deathTime !== -1 && Date.now() > respawnComponent.deathTime + (respawnComponent.respawnTime*1000) && revmp.isBot(charId)){
                // respawn npc and set state
                this.respawnNpc(charId)
            }
        })
    }

    private respawnNpc(aiId: number){
        const lastPosition = this.aiState.getEntityManager().getPositionsComponents(aiId)
        const lastNpcInstance = this.aiState.getEntityManager().getNpcStateComponent(aiId)?.npcInstance
        this.aiState.unregisterBot(aiId)
        revmp.destroyCharacter(aiId)
        if(typeof lastNpcInstance !== 'undefined' && typeof lastPosition !== 'undefined'){
            //TODO: extend getNpc for state
            //todo: fix this
        const spawnPoint = typeof lastPosition.startPoint !== 'undefined' ? lastPosition.startPoint : "HAFEN"
        const spawnWorld = typeof lastPosition.startWorld !== 'undefined' ? lastPosition.startWorld : this.world
        this.aiStateFunctions.spawnNpc(getNpcForInstance(lastNpcInstance),spawnPoint, spawnWorld)
        }
    }

    private isEntityUpdateable(entityId: number){
        return revmp.getHealth(entityId).current > 0 && revmp.isCharacter(entityId)
    }

}
