"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiState = void 0;
const waynet_1 = require("../waynet/waynet");
const entityManager_1 = require("./entityManager");
/** Entry point to access the all ai related state.*/
class AiState {
    constructor() {
        this.entityManager = new entityManager_1.EntityManager();
        this.waynet = new waynet_1.Waynet('./newworld.wp', './newworld.fp');
    }
    getEntityManager() {
        return this.entityManager;
    }
    getWaynet() {
        return this.waynet;
    }
}
exports.AiState = AiState;
