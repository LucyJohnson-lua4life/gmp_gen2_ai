
export const INSTANCE_WOLF = "revmp_wolf"
export const INSTANCE_SCAVENGER = "revmp_scavenger"
export const INSTANCE_SNAPPER = "revmp_snapper"
export const INSTANCE_WARG = "revmp_warg"
export const INSTANCE_SHADOWBEAST = "revmp_shadowbeast"
export const INSTANCE_KEILER = "revmp_keiler"
export const INSTANCE_TROLL = "revmp_troll"
export const INSTANCE_LURKER = "revmp_lurker"
export const INSTANCE_ORC_WARRIOR = "revmp_orc_warrior"
export const INSTANCE_ORC_ELITE = "revmp_orc_elite"
export const INSTANCE_ORC_UNDEAD = "revmp_orc_elite"

export function getWolfInstance() {
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
    }

}


export function getScavengerInstance() {
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
    }

}

export function getSnapperInstance() {
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
    }

}

export function getWargInstance() {
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
    }

}

export function getKeilerInstance() {
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
    }

}
export function getLurkerInstance() {
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
    }

}
export function getTrollInstance() {
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
    }

}
export function getOrcWarriorInstance() {
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
    }

}

export function getOrcEliteInstance() {
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
    }

}

export function getUndeadOrcInstance() {
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
    }

}
export function getShadowbeastInstance() {
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
    }
}
