
export const INSTANCE_WOLF:string = "revmp_wolf"

export function getWolfInstance() {
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
    }

}


