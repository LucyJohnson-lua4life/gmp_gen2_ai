"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNpcForInstance = void 0;
const npcInits_1 = require("./npcInits");
const wolf_1 = require("./wolf");
function getNpcForInstance(instanceName) {
    if (instanceName === npcInits_1.INSTANCE_WOLF) {
        return new wolf_1.Wolf();
    }
    return new wolf_1.Wolf();
}
exports.getNpcForInstance = getNpcForInstance;
