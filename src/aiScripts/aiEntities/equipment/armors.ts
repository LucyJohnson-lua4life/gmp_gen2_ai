export const ArmorInstances = {
    guardianArmor: "guardianArmor",
    dragonHunterArmor: "dragonHunterArmor",
    banditArmor: "banditArmor",
    heavyBanditArmor: "heavyBanditArmor",
    pirateClothes: "pirateClothes",
    pirateArmor: "pirateArmor",
    darkArmor: "darkArmor",
    vlkFemaleArmor: "vlkFemaleArmor",
    vlkMaleArmor: "vlkMaleArmor",
    farmFemaleArmor: "farmFemaleArmor",
    farmMaleArmor: "farmMaleArmor",
    heavyMercenaryArmor: "heavyMercenaryArmor",
    heavyPaladinArmor: "heavyPaladinArmor",
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
        value: 5000,
        description: {
            text: [
                [],
                ["An armor used by the old guards of the mine valley."],
                [],
                [],
                [],
                ["Value", 5000],
            ]
        },
    });

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.dragonHunterArmor,
        name: "Dragon Hunters Armor",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_Djg_M.3ds",
        visualChange: "Armor_Djg_M.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 10000,
        description: {
            text: [
                [],
                ["An armor used by dragon hunters. Its of high quality."],
                [],
                [],
                [],
                ["Value", 10000],
            ]
        },
    });


    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.banditArmor,
        name: "Bandits Armor",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_Bdt_M.3ds",
        visualChange: "Armor_Bdt_M.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 1000,
        description: {
            text: [
                [],
                ["An armor used by bandits."],
                [],
                [],
                [],
                ["Value", 1000],
            ]
        },
    });


    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.heavyBanditArmor,
        name: "Heavy Bandits Armor",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_Bdt_H.3ds",
        visualChange: "Armor_Bdt_H.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 1000,
        description: {
            text: [
                [],
                ["An armor used by bandits."],
                [],
                [],
                [],
                ["Value", 1000],
            ]
        },
    });

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.pirateClothes,
        name: "Pirate Clothes",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_PIR_L_ADDON.3ds",
        visualChange: "Armor_Pir_L_Addon.ASC",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 1000,
        description: {
            text: [
                [],
                ["An armor used by pirates."],
                [],
                [],
                [],
                ["Value", 1000],
            ]
        },
    });

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.pirateArmor,
        name: "Pirate Armor",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_PIR_M_ADDON.3ds",
        visualChange: "Armor_PIR_M_ADDON.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 1000,
        description: {
            text: [
                [],
                ["An armor used by pirates."],
                [],
                [],
                [],
                ["Value", 1000],
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
        value: 100,
        description: {
            text: [
                [],
                ["Clothes for normal citizens of Khorinis."],
                [],
                [],
                [],
                ["Value", 100],
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
        value: 100,
        description: {
            text: [
                [],
                ["Clothes for normal citizens of Khorinis."],
                [],
                [],
                [],
                ["Value", 100],
            ]
        },
    });

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.farmMaleArmor,
        name: "Farmer Clothes",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_Bau_L.3DS",
        visualChange: "Armor_Bau_L.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 100,
        description: {
            text: [
                [],
                ["Clothes for normal farmers of Khorinis."],
                [],
                [],
                [],
                ["Value", 100],
            ]
        },
    });

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.farmFemaleArmor,
        name: "Farmer Clothes",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_VLKBabe.3DS",
        visualChange: "Armor_BauBabe_L.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 100,
        description: {
            text: [
                [],
                ["Clothes for normal farmers of Khorinis."],
                [],
                [],
                [],
                ["Value", 100],
            ]
        },
    });

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.heavyMercenaryArmor,
        name: "Heavy Mercenary Armor",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_Sld_H.3DS",
        visualChange: "Armor_Sld_H.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 2500,
        description: {
            text: [
                [],
                ["Heavy armor worn by important executives."],
                [],
                [],
                [],
                ["Value", 2500],
            ]
        },
    });

    revmp.createItemInstance({
        type: revmp.ItemType.Armor,
        id: ArmorInstances.heavyPaladinArmor,
        name: "Heavy Paladin Armor",
        protection: {
            blunt: 0,
            edge: 0,
            point: 0,
            fire: 0,
            magic: 0,
        },
        visual: "ItAr_Pal_H.3DS",
        visualChange: "Armor_Pal_H.asc",
        visualSkin: 0,
        material: revmp.Material.Leather,
        category: revmp.ItemCategory.Armor,
        value: 2500,
        description: {
            text: [
                [],
                ["Heavy armor worn by important executives."],
                [],
                [],
                [],
                ["Value", 2500],
            ]
        },
    });

}