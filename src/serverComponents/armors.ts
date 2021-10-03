export const ArmorInstances = {
    guardianArmor: "guardianArmor"
} as const;

export function initArmorInstances() {

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.guardianArmor,
        name: "Guardian Armor",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_Bloodwyn_ADDON.3DS",
        visualChange: "Armor_Bloodwyn_ADDON.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 2500,
        description: {
            text: [
                [],
                ["An armor used by the old guards of the mine valley."],
                [],
                [],
                [],
                ["Value", 2500],
            ]
        },
    });





}