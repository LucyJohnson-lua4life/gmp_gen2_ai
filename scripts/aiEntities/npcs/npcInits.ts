
export const INSTANCE_WOLF:string = "revmp_wolf"

export function initAllNpcInstances():void {
    revmp.createInstanceTemplate({
        type: revmp.InstanceType.Character,
        id: INSTANCE_WOLF,
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
        weaponMode: {mode: revmp.WeaponState.Fist},
    });

}