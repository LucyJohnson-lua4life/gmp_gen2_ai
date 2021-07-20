"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWolfInstance = exports.INSTANCE_WOLF = void 0;
exports.INSTANCE_WOLF = "revmp_wolf";
function getWolfInstance() {
    return {
        name: "Wolf",
        maxHealth: 60,
        visual: "Wolf.mds",
        visualBody: {
            bodyMesh: "Wol_Body"
        },
        meleeAttack: {
            edge: 30,
            range: 80
        },
        protection: {
            blunt: 30,
            edge: 30,
            fire: 30,
            fly: 30,
        },
        weaponMode: revmp.WeaponMode.Fist
    };
}
exports.getWolfInstance = getWolfInstance;
