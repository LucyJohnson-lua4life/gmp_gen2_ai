import { IActionsComponent } from '../aiEntities/components/iActionsComponent';
import { IActionDescriptionComponent } from '../aiEntities/components/iActionDescriptionComponent';
import { IAiAction } from '../aiEntities/iAiAction';
import { IActionDescription } from '../aiEntities/iActionDescription';
import { EntityManager } from './entityManager';
import { NpcActionUtils } from '../aiFunctions/npcActionUtils';

/**
 * Represents the loop that iterates through each npc state and executes the next actions for each npc.
 * The loops also executes descriptions, that decide which actions to put into the action collection of each npc's based on the npc state and environment.
 */
export class AiUpdateLoop {
    //todo: this constant world should only be temporary!
    private  world:string = "NEWWORLD\\NEWWORLD.ZEN"
    private _entityManager: EntityManager;
    private npcActionUtils: NpcActionUtils

    constructor(em: EntityManager) {
        this._entityManager = em;
        this.npcActionUtils = new NpcActionUtils(em)
    }

    get state(): EntityManager {
        return this._entityManager;
    }

    public updateAll() {
        this._entityManager.positionMap.set(this.world, new Map<number, Array<number>>())
        let allPositions:Map<number, Array<number>> = this._entityManager.positionMap.get(this.world)
        revmp.characters.forEach(charId =>{
            let pos = revmp.getPosition(charId).position
            let checksum = this.npcActionUtils.calculatePositionCheckSum(pos[0], pos[1], pos[2])

            if(allPositions.has(checksum)){
                allPositions.get(checksum).push(charId)
            }
            else{
                allPositions.set(checksum, [charId])
            }})

        this._entityManager.getAllBots.forEach((aiId) => this.updateAi(aiId))
    }

    public readDescriptions() {
        this._entityManager.getAllBots.forEach((aiId) => this.readDescription(aiId))
    }

    public updateAi(aiId: number) {
        let actionsComponent:IActionsComponent | undefined = this._entityManager.getActionsComponent(aiId);

        if (typeof actionsComponent !== 'undefined') {
            let nextAction:IAiAction|undefined = actionsComponent.nextActions[actionsComponent.nextActions.length -1]

            if(typeof nextAction !== 'undefined'){
                nextAction.shouldLoop ? nextAction.executeAction() : actionsComponent.nextActions.pop().executeAction();
            }
        }

    }

    public readDescription(aiId: number) {
        let descriptionComponent: IActionDescriptionComponent | undefined = this._entityManager.getActionDescriptionComponent(aiId);

        if (typeof descriptionComponent !== 'undefined') {
            let descriptions: Array<IActionDescription> | undefined = descriptionComponent.descriptions
            descriptions.forEach(description => description.describeAction(this._entityManager))
        }
    }

}
