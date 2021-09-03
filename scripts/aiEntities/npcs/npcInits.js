"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrcEliteInstance = exports.getOrcWarriorInstance = exports.getSnapperInstance = exports.getScavengerInstance = exports.getWolfInstance = exports.INSTANCE_ORC_ELITE = exports.INSTANCE_ORC_WARRIOR = exports.INSTANCE_SNAPPER = exports.INSTANCE_SCAVENGER = exports.INSTANCE_WOLF = void 0;
exports.INSTANCE_WOLF = "revmp_wolf";
exports.INSTANCE_SCAVENGER = "revmp_scavenger";
exports.INSTANCE_SNAPPER = "revmp_snapper";
exports.INSTANCE_ORC_WARRIOR = "revmp_orc_warrior";
exports.INSTANCE_ORC_ELITE = "revmp_orc_elite";
function getWolfInstance() {
    return {
        name: "Wolf",
        maxHealth: 200,
        visual: "Wolf.mds",
        visualBody: {
            bodyMesh: "Wol_Body"
        },
        meleeAttack: {
            edge: 50,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        weaponMode: revmp.WeaponMode.Fist
    };
}
exports.getWolfInstance = getWolfInstance;
function getScavengerInstance() {
    return {
        name: "Scavenger",
        maxHealth: 200,
        visual: "Scavenger.mds",
        visualBody: {
            bodyMesh: "Sca_Body"
        },
        meleeAttack: {
            edge: 50,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        weaponMode: revmp.WeaponMode.Fist
    };
}
exports.getScavengerInstance = getScavengerInstance;
function getSnapperInstance() {
    return {
        name: "Snapper",
        maxHealth: 200,
        visual: "Snapper.mds",
        visualBody: {
            bodyMesh: "Sna_Body"
        },
        meleeAttack: {
            edge: 50,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        weaponMode: revmp.WeaponMode.Fist
    };
}
exports.getSnapperInstance = getSnapperInstance;
function getOrcWarriorInstance() {
    return {
        name: "Orc Warrior",
        maxHealth: 500,
        visual: "Orc.mds",
        visualBody: {
            bodyMesh: "Orc_BodyWarrior",
            headMesh: "Orc_HeadWarrior"
        },
        meleeAttack: {
            edge: 50,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        weaponMode: revmp.WeaponMode.Fist
    };
}
exports.getOrcWarriorInstance = getOrcWarriorInstance;
function getOrcEliteInstance() {
    return {
        name: "Orc Elite",
        maxHealth: 1000,
        visual: "Orc.mds",
        visualBody: {
            bodyMesh: "Orc_BodyElite",
            headMesh: "Orc_HeadWarrior"
        },
        meleeAttack: {
            edge: 10,
            range: 20
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        weaponMode: revmp.WeaponMode.TwoHand
    };
}
exports.getOrcEliteInstance = getOrcEliteInstance;
