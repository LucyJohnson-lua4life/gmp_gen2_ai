
export const INSTANCE_WOLF:string = "revmp_wolf"
export const INSTANCE_SCAVENGER: string = "revmp_scavenger"
export const INSTANCE_SNAPPER: string = "revmp_snapper"
export const INSTANCE_ORC_WARRIOR: string = "revmp_orc_warrior"
export const INSTANCE_ORC_ELITE: string = "revmp_orc_elite"

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
