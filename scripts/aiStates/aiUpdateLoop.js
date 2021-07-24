"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiUpdateLoop = void 0;
class AiUpdateLoop {
    constructor(em) {
        this._entityManager = em;
    }
    get state() {
        return this._entityManager;
    }
    updateAll() {
        this._entityManager.getAllBots.forEach((aiId) => this.updateAi(aiId));
    }
    readDescriptions() {
        this._entityManager.getAllBots.forEach((aiId) => this.readDescription(aiId));
    }
    updateAi(aiId) {
        let actionsComponent = this._entityManager.getActionsComponent(aiId);
        if (typeof actionsComponent !== 'undefined') {
            let nextAction = actionsComponent.nextActions.peek();
            if (typeof nextAction !== 'undefined') {
                nextAction.shouldLoop ? nextAction.executeAction() : actionsComponent.nextActions.pop().executeAction();
            }
        }
    }
    readDescription(aiId) {
        let descriptionComponent = this._entityManager.getActionDescriptionComponent(aiId);
        if (typeof descriptionComponent !== 'undefined') {
            let descriptions = descriptionComponent.descriptions;
            descriptions.forEach(description => description.describeAction(this._entityManager));
        }
    }
}
exports.AiUpdateLoop = AiUpdateLoop;
