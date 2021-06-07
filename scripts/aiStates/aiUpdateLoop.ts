import { IActionsComponent } from '../aiEntities/components/iActionsComponent';
import { IAiAction } from '../aiEntities/iAiAction';
import { EntityManager } from './entityManager';
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

    public updateAi(aiId: number) {
        let actionsComponent:IActionsComponent | undefined = this._entityManager.getActionsComponent(aiId);

        if (typeof actionsComponent !== 'undefined') {
            let nextAction:IAiAction|undefined = actionsComponent.nextActions.peek();
            if(typeof nextAction !== 'undefined'){
                nextAction.shouldLoop ? nextAction.executeAction() : actionsComponent.nextActions.pop().executeAction();
            }
        }
    }

}