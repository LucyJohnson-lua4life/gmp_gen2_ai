"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAllNpcInstances = exports.INSTANCE_WOLF = void 0;
exports.INSTANCE_WOLF = "revmp_wolf";
function initAllNpcInstances() {
    revmp.createInstanceTemplate({
        type: revmp.InstanceType.Character,
        id: exports.INSTANCE_WOLF,
        name: "Wolf",
        maxHealth: 60,
        meleeAttack: {
            edge: 30,
            range: 80,
        },
        protection: {
            blunt: 30,
            edge: 30,
            fire: 30,
            fly: 30,
        },
        visual: "Wolf.mds",
        visualBody: {
            bodyMesh: "Wol_Body",
        },
        weaponMode: { mode: revmp.WeaponState.Fist },
    });
}
exports.initAllNpcInstances = initAllNpcInstances;
