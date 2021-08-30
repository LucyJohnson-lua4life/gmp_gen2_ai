import { IActionsComponent } from '../aiEntities/components/iActionsComponent';
import { IActionDescriptionComponent } from '../aiEntities/components/iActionDescriptionComponent';
import { IAiAction } from '../aiEntities/iAiAction';
import { IActionDescription } from '../aiEntities/iActionDescription';
import { getNpcForInstance } from '../aiEntities/npcs/npcEntityUtils';
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';
import { AiStateFunctions } from '../aiStates/aiStateFunctions';
import { AiState } from './aiState';
import { IRespawnComponent } from '../aiEntities/components/iRespawnComponent';
import { Wolf } from '../aiEntities/npcs/wolf';

/**
 * Represents the loop that iterates through each npc state and executes the next actions for each npc.
 * The loops also executes descriptions, that decide which actions to put into the action collection of each npc's based on the npc state and environment.
 */
export class AiUpdateLoop {
    //todo: this constant world should only be used temporary!
    private world:string = "NEWWORLD\\NEWWORLD.ZEN"
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
        let allPositions: Map<number, Array<number>> = this.aiState.getCharacterInPositionAreas().get(this.world)
        // update positions for each character
        revmp.characters.forEach(charId =>{
            let pos = revmp.getPosition(charId).position
            let checksum = this.npcActionUtils.calculatePositionCheckSum(pos[0], pos[1], pos[2])

            if(allPositions.has(checksum)){
                allPositions.get(checksum).push(charId)
            }
            else{
                allPositions.set(checksum, [charId])
            }})

        this.readDescriptions()
        this.respawnDeadNpcs()
        this.removeDeadOrUnvalidPlayerFromEnemyLists()
        this.aiState.getAllBots().forEach((aiId) => this.updateAi(aiId))
    }

    public readDescriptions() {
        this.aiState.getAllBots().forEach((aiId) => this.readDescription(aiId))
    }

    public updateAi(aiId: number) {
        let actionsComponent:IActionsComponent | undefined = this.aiState.getEntityManager().getActionsComponent(aiId);

        if (typeof actionsComponent !== 'undefined') {
            let nextAction:IAiAction|undefined = actionsComponent.nextActions[actionsComponent.nextActions.length -1]

            if (typeof nextAction !== 'undefined' && this.isEntityUpdateable(aiId)){
                nextAction.shouldLoop ? nextAction.executeAction() : actionsComponent.nextActions.pop().executeAction();
            }
        }

        //register if dead
        if(revmp.getHealth(aiId).current <= 0 && revmp.isBot(aiId) ){
            let respawnInfo = this.aiState.getEntityManager().getRespawnComponent(aiId)
            if(typeof respawnInfo !== 'undefined' && typeof respawnInfo.deathTime === 'undefined'){
                respawnInfo.deathTime = Date.now()
                this.aiState.getEntityManager().setRespawnComponent(aiId, respawnInfo)
            }
        }

    }

    public readDescription(aiId: number) {
        let descriptionComponent: IActionDescriptionComponent | undefined = this.aiState.getEntityManager().getActionDescriptionComponent(aiId);

        if (typeof descriptionComponent !== 'undefined' && this.isEntityUpdateable(aiId)) {
            let descriptions: Array<IActionDescription> | undefined = descriptionComponent.descriptions
            descriptions.forEach(description => description.describeAction(this.aiState))
        }
    }

    public respawnDeadNpcs(){
        revmp.characters.forEach(charId =>{
            let respawnComponent = this.aiState.getEntityManager().getRespawnComponent(charId)
            if(typeof respawnComponent !== 'undefined' && typeof respawnComponent.deathTime !== 'undefined' && Date.now() > respawnComponent.deathTime + (respawnComponent.respawnTime*1000) && revmp.isBot(charId)){
                // respawn npc and set state
                this.respawnNpc(charId)
            }
        })
    }

    private respawnNpc(aiId: number){
        let lastPosition = this.aiState.getEntityManager().getPositionsComponents(aiId)
        let lastNpcInstance = this.aiState.getEntityManager().getNpcStateComponent(aiId).npcInstance
        this.aiState.unregisterBot(aiId)
        revmp.destroyCharacter(aiId)
        this.aiStateFunctions.spawnNpc(getNpcForInstance(lastNpcInstance),lastPosition.startPoint, lastPosition.startWorld)
    }

    private isEntityUpdateable(entityId: number){
        return revmp.getHealth(entityId).current > 0 && revmp.isCharacter(entityId)
    }

    private removeDeadOrUnvalidPlayerFromEnemyLists():void{
        revmp.bots.forEach(botId =>{
            let enemyId:number|undefined = this.aiState.getEntityManager().getEnemyComponent(botId).enemyId
            if(typeof enemyId !== 'undefined' && (!revmp.valid(enemyId) || revmp.getHealth(enemyId).current <= 0)){
                this.aiState.getEntityManager().setEnemyComponent(botId, {entityId: botId, enemyId: undefined})
            }
        })
    }
}
