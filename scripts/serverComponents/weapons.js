"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instances = void 0;
exports.Instances = {
    warsword: "warsword"
};
revmp.createItemInstance({
    type: revmp.ItemType.MeleeWeapon,
    id: exports.Instances.warsword,
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
