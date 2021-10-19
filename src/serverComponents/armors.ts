export const ArmorInstances = {
    guardianArmor: "guardianArmor",
    darkArmor: "darkArmor",
    vlkFemaleArmor: "vlkFemaleArmor",
    vlkMaleArmor: "vlkMaleArmor"
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
    

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.darkArmor,
        name: "Dark armor",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_Raven_ADDON.3DS",
        visualChange: "Armor_Raven_ADDON.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 2500,
        description: {
            text: [
                [],
                ["A solid dark armor."],
                [],
                [],
                [],
                ["Value", 2500],
            ]
        },
    });

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.vlkFemaleArmor,
        name: "Citizen Dress",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_VLKBabe.3DS",
        visualChange: "ARMOR_VLKBABE_L.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 2500,
        description: {
            text: [
                [],
                ["Clothes for normal citizens of Khorinis."],
                [],
                [],
                [],
                ["Value", 2500],
            ]
        },
    });


    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.vlkMaleArmor,
        name: "Citizen Clothes",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_VLK_L.3DS",
        visualChange: "Armor_Vlk_L.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 2500,
        description: {
            text: [
                [],
                ["Clothes for normal citizens of Khorinis."],
                [],
                [],
                [],
                ["Value", 2500],
            ]
        },
    });


}