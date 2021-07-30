
export const Instances = {
    warsword: "warsword"
} as const;


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
            ["Edge Damager", 100],
            [],
            ["Necessary strength:", 5],
            ["One hand sword"],
            ["Value:", 1000],
        ]
    },
});
