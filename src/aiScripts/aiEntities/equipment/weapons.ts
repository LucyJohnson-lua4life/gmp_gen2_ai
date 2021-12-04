
export const WeaponInstances = {
    dragonHunterBlade: "dragonHunterBlade",
    eliteOrcSword: "eliteOrcSword",
    flamberge: "flamberge",
    nobleSword: "nobleSword"
} as const;


export function initWeaponInstances(){

revmp.createItemInstance({
    type: revmp.ItemType.MeleeWeapon,
    id: WeaponInstances.dragonHunterBlade,
    name: "Dragon Hunters Blade",
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
    id: WeaponInstances.nobleSword,
    name: "Noble Long Sword",
    meleeAttack: {
        edge: 100,
        range: 90
    },
    visual: "ItMw_045_1h_Sword_long_04.3DS",
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
    id: WeaponInstances.eliteOrcSword,
    name: "Elite Orc Sword",
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
            ["Edge Damage", 150],
            [],
            ["Necessary strength:", 5],
            ["One hand sword"],
            ["Value:", 1000],
        ]
    },
});

revmp.createItemInstance({
    type: revmp.ItemType.MeleeWeapon,
    id: WeaponInstances.flamberge,
    name: "Flamberge",
    meleeAttack: {
        edge: 100,
        range: 140
    },
    visual: "ItMw_040_2h_PAL_sword_heavy_RAW_01.3DS",
    material: revmp.Material.Metal,
    category: revmp.ItemCategory.TwoHandSword,
    value: 1000,
    description: {
        text: [
            [],
            ["Edge Damage", 150],
            [],
            ["Necessary strength:", 5],
            ["Two hand sword"],
            ["Value:", 1000],
        ]
    },
});


}

