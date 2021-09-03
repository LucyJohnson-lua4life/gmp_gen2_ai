
export const Instances = {
    warsword: "warsword",
    eliteOrcSword: "eliteOrcSword"
} as const;


export function initItemInstances(){

revmp.createItemInstance({
    type: revmp.ItemType.MeleeWeapon,
    id: Instances.warsword,
    name: "War Sword",
    meleeAttack: {
        edge: 100,
        range: 90
    },
    visual: "ItMw_060_1h_Sword_smith_03.3DS",
    material: revmp.Material.Metal,
    category: revmp.ItemCategory.Sword,
    value: 1000,
    description: {
        text: [
            [],
            ["Edge Damage", 100],
            [],
            ["Necessary strength:", 5],
            ["One hand sword"],
            ["Value:", 1000],
        ]
    },
});

revmp.createItemInstance({
    type: revmp.ItemType.MeleeWeapon,
    id: Instances.eliteOrcSword,
    name: "Elite orc sword",
    meleeAttack: {
        edge: 100,
        range: 140
    },
    visual: "ItMw_2H_OrcSword_02.3DS",
    material: revmp.Material.Metal,
    category: revmp.ItemCategory.TwoHandSword,
    value: 1000,
    description: {
        text: [
            [],
            ["Edge Damage", 100],
            [],
            ["Necessary strength:", 5],
            ["One hand sword"],
            ["Value:", 1000],
        ]
    },
});


}

