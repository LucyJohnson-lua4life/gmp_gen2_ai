"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiUpdateLoop = void 0;
const npcActionUtils_1 = require("../aiFunctions/npcActionUtils");
/**
 * Represents the loop that iterates through each npc state and executes the next actions for each npc.
 * The loops also executes descriptions, that decide which actions to put into the action collection of each npc's based on the npc state and environment.
 */
class AiUpdateLoop {
    constructor(aiState) {
        //todo: this constant world should only be temporary!
        this.world = "NEWWORLD\\NEWWORLD.ZEN";
        this.aiState = aiState;
        this.npcActionUtils = new npcActionUtils_1.NpcActionUtils(aiState);
    }
    updateAll() {
        this.aiState.getPlayerInPositionAreas().set(this.world, new Map());
        let allPositions = this.aiState.getPlayerInPositionAreas().get(this.world);
        revmp.characters.forEach(charId => {
            let pos = revmp.getPosition(charId).position;
            let checksum = this.npcActionUtils.calculatePositionCheckSum(pos[0], pos[1], pos[2]);
            if (allPositions.has(checksum)) {
                allPositions.get(checksum).push(charId);
            }
            else {
                allPositions.set(checksum, [charId]);
            }
        });
        this.aiState.getAllBots().forEach((aiId) => this.updateAi(aiId));
    }
    readDescriptions() {
        this.aiState.getAllBots().forEach((aiId) => this.readDescription(aiId));
    }
    updateAi(aiId) {
        let actionsComponent = this.aiState.getEntityManager().getActionsComponent(aiId);
        if (typeof actionsComponent !== 'undefined') {
            let nextAction = actionsComponent.nextActions[actionsComponent.nextActions.length - 1];
            if (typeof nextAction !== 'undefined' && this.isEntityUpdateable(aiId)) {
                nextAction.shouldLoop ? nextAction.executeAction() : actionsComponent.nextActions.pop().executeAction();
            }
        }
    }
    readDescription(aiId) {
        let descriptionComponent = this.aiState.getEntityManager().getActionDescriptionComponent(aiId);
        if (typeof descriptionComponent !== 'undefined' && this.isEntityUpdateable(aiId)) {
            let descriptions = descriptionComponent.descriptions;
            descriptions.forEach(description => description.describeAction(this.aiState));
        }
    }
    isEntityUpdateable(entityId) {
        return revmp.getHealth(entityId).current > 0 && revmp.isCharacter(entityId);
    }
}
exports.AiUpdateLoop = AiUpdateLoop;
