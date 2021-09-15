"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShadowbeastInstance = exports.getUndeadOrcInstance = exports.getOrcEliteInstance = exports.getOrcWarriorInstance = exports.getTrollInstance = exports.getLurkerInstance = exports.getKeilerInstance = exports.getWargInstance = exports.getSnapperInstance = exports.getScavengerInstance = exports.getWolfInstance = exports.INSTANCE_ORC_UNDEAD = exports.INSTANCE_ORC_ELITE = exports.INSTANCE_ORC_WARRIOR = exports.INSTANCE_LURKER = exports.INSTANCE_TROLL = exports.INSTANCE_KEILER = exports.INSTANCE_SHADOWBEAST = exports.INSTANCE_WARG = exports.INSTANCE_SNAPPER = exports.INSTANCE_SCAVENGER = exports.INSTANCE_WOLF = void 0;
exports.INSTANCE_WOLF = "revmp_wolf";
exports.INSTANCE_SCAVENGER = "revmp_scavenger";
exports.INSTANCE_SNAPPER = "revmp_snapper";
exports.INSTANCE_WARG = "revmp_warg";
exports.INSTANCE_SHADOWBEAST = "revmp_shadowbeast";
exports.INSTANCE_KEILER = "revmp_keiler";
exports.INSTANCE_TROLL = "revmp_troll";
exports.INSTANCE_LURKER = "revmp_lurker";
exports.INSTANCE_ORC_WARRIOR = "revmp_orc_warrior";
exports.INSTANCE_ORC_ELITE = "revmp_orc_elite";
exports.INSTANCE_ORC_UNDEAD = "revmp_orc_elite";
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
        maxHealth: 400,
        visual: "Snapper.mds",
        visualBody: {
            bodyMesh: "Sna_Body"
        },
        meleeAttack: {
            edge: 100,
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
function getWargInstance() {
    return {
        name: "Warg",
        maxHealth: 500,
        visual: "Wolf.mds",
        visualBody: {
            bodyMesh: "Warg_Body2"
        },
        meleeAttack: {
            edge: 80,
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
exports.getWargInstance = getWargInstance;
function getKeilerInstance() {
    return {
        name: "Keiler",
        maxHealth: 200,
        visual: "Keiler.mds",
        visualBody: {
            bodyMesh: "Keiler_Body"
        },
        meleeAttack: {
            edge: 80,
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
exports.getKeilerInstance = getKeilerInstance;
function getLurkerInstance() {
    return {
        name: "Lurker",
        maxHealth: 200,
        visual: "Lurker.mds",
        visualBody: {
            bodyMesh: "Lur_Body"
        },
        meleeAttack: {
            edge: 80,
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
exports.getLurkerInstance = getLurkerInstance;
function getTrollInstance() {
    return {
        name: "Troll",
        maxHealth: 1200,
        visual: "Troll.mds",
        visualBody: {
            bodyMesh: "Tro_Body"
        },
        meleeAttack: {
            edge: 80,
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
exports.getTrollInstance = getTrollInstance;
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
function getUndeadOrcInstance() {
    return {
        name: "Undead Orc",
        maxHealth: 1000,
        visual: "Orc.mds",
        visualBody: {
            bodyMesh: "UOW_Body"
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
    };
}
exports.getUndeadOrcInstance = getUndeadOrcInstance;
function getShadowbeastInstance() {
    return {
        name: "Shadow beast",
        maxHealth: 1000,
        visual: "Shadow.mds",
        visualBody: {
            bodyMesh: "Sha_Body"
        },
        meleeAttack: {
            edge: 100,
            range: 20
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
exports.getShadowbeastInstance = getShadowbeastInstance;
