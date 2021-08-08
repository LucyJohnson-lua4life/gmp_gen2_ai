import { IActionsComponent } from '../aiEntities/components/iActionsComponent';
import { IActionDescriptionComponent } from '../aiEntities/components/iActionDescriptionComponent';
import { IAiAction } from '../aiEntities/iAiAction';
import { IActionDescription } from '../aiEntities/iActionDescription';
import { EntityManager } from './entityManager';

/**
 * Represents the loop that iterates through each npc state and executes the next actions for each npc.
 * The loops also executes descriptions, that decide which actions to put into the action collection of each npc's based on the npc state and environment.
 */
export class AiUpdateLoop {
    private _entityManager: EntityManager;

    constructor(em: EntityManager) {
        this._entityManager = em;
    }

    get state(): EntityManager {
        return this._entityManager;
    }

    public updateAll() {
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
