"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiUpdateLoop = void 0;
const npcEntityUtils_1 = require("../aiEntities/npcs/npcEntityUtils");
const npcActionUtils_1 = require("../aiFunctions/npcActionUtils");
const aiStateFunctions_1 = require("../aiStates/aiStateFunctions");
/**
 * Represents the loop that iterates through each npc state and executes the next actions for each npc.
 * The loops also executes descriptions, that decide which actions to put into the action collection of each npc's based on the npc state and environment.
 */
class AiUpdateLoop {
    constructor(aiState) {
        //todo: this constant world should only be used temporary!
        this.world = "NEWWORLD\\NEWWORLD.ZEN";
        this.aiState = aiState;
        this.npcActionUtils = new npcActionUtils_1.NpcActionUtils(aiState);
        this.aiStateFunctions = new aiStateFunctions_1.AiStateFunctions(aiState);
    }
    updateAll() {
        this.aiState.getCharacterInPositionAreas().set(this.world, new Map());
        let allPositions = this.aiState.getCharacterInPositionAreas().get(this.world);
        // update positions for each character
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
        this.readDescriptions();
        this.respawnDeadNpcs();
        this.removeDeadOrUnvalidPlayerFromEnemyLists();
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
        //register if dead
        if (revmp.getHealth(aiId).current <= 0 && revmp.isBot(aiId)) {
            let respawnInfo = this.aiState.getEntityManager().getRespawnComponent(aiId);
            if (typeof respawnInfo !== 'undefined' && typeof respawnInfo.deathTime === 'undefined') {
                respawnInfo.deathTime = Date.now();
                this.aiState.getEntityManager().setRespawnComponent(aiId, respawnInfo);
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
    respawnDeadNpcs() {
        revmp.characters.forEach(charId => {
            let respawnComponent = this.aiState.getEntityManager().getRespawnComponent(charId);
            if (typeof respawnComponent !== 'undefined' && typeof respawnComponent.deathTime !== 'undefined' && Date.now() > respawnComponent.deathTime + (respawnComponent.respawnTime * 1000) && revmp.isBot(charId)) {
                // respawn npc and set state
                this.respawnNpc(charId);
            }
        });
    }
    respawnNpc(aiId) {
        let lastPosition = this.aiState.getEntityManager().getPositionsComponents(aiId);
        let lastNpcInstance = this.aiState.getEntityManager().getNpcStateComponent(aiId).npcInstance;
        this.aiState.unregisterBot(aiId);
        revmp.destroyCharacter(aiId);
        this.aiStateFunctions.spawnNpc(npcEntityUtils_1.getNpcForInstance(lastNpcInstance), lastPosition.startPoint, lastPosition.startWorld);
    }
    isEntityUpdateable(entityId) {
        return revmp.getHealth(entityId).current > 0 && revmp.isCharacter(entityId);
    }
    removeDeadOrUnvalidPlayerFromEnemyLists() {
        revmp.bots.forEach(botId => {
            let enemyId = this.aiState.getEntityManager().getEnemyComponent(botId).enemyId;
            if (typeof enemyId !== 'undefined' && (!revmp.valid(enemyId) || revmp.getHealth(enemyId).current <= 0)) {
                this.aiState.getEntityManager().setEnemyComponent(botId, { entityId: botId, enemyId: undefined });
            }
        });
    }
}
exports.AiUpdateLoop = AiUpdateLoop;
