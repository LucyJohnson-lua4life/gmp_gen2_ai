"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiUpdateLoop = void 0;
/**
 * Represents the loop that iterates through each npc state and executes the next actions for each npc.
 * The loops also executes descriptions, that decide which actions to put into the action collection of each npc's based on the npc state and environment.
 */
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
            let nextAction = actionsComponent.nextActions[actionsComponent.nextActions.length - 1];
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
