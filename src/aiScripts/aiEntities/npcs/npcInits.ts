
export const INSTANCE_WOLF = "revmp_wolf"
export const INSTANCE_SCAVENGER = "revmp_scavenger"
export const INSTANCE_SNAPPER = "revmp_snapper"
export const INSTANCE_WARG = "revmp_warg"
export const INSTANCE_SHADOWBEAST = "revmp_shadowbeast"
export const INSTANCE_KEILER = "revmp_keiler"
export const INSTANCE_TROLL = "revmp_troll"
export const INSTANCE_LURKER = "revmp_lurker"
export const INSTANCE_ORC_WARRIOR = "revmp_orc_warrior"
export const INSTANCE_ORC_ELITE = "revmp_orc_elite"
export const INSTANCE_ORC_UNDEAD = "revmp_orc_elite"
export const INSTANCE_HEAVY_CRIMMINAL = "revmp_heavy_crimminal"
export const INSTANCE_ROAMING_ROBBER = "revmp_roaming_robber"
export const INSTANCE_ROAMING_CITIZEN_MALE = "revmp_roaming_citizen_male"
export const INSTANCE_ROAMING_CITIZEN_FEMALE = "revmp_roaming_citizen_female"
export const INSTANCE_DEMON_KING = "revmp_demon_king"
export const INSTANCE_ZOMBIE = "revmp_zombie"

const FEMALE_HEAD_MODELS = ["Hum_Head_Pony", "Hum_Head_Bald", "Hum_Head_Babe"]
const MALE_HEAD_MODELS = ["Hum_Head_FatBald", "Hum_Head_Fighter", "Hum_Head_Pony", "Hum_Head_Bald", "Hum_Head_Thief", "Hum_Head_Psionic"]
const RANDOM_CRIMMINAL_NAME = ["Ron", "Jack", "Baldwyn", "Don", "Creek", "Henry", "Vlad", "Stone", "Danny", "Joe"]
const RANDOM_CRIMMINAL_TITLE = ["the Ripper", "the Tyrant", "the Killer", "the Molester", "the Vicious"]
/**
 * non humanoid npcs have currently their weapon mode set to fist, because they cant set them themselfes with "drawMeleeWeapon()" 
 * and setCombat state doesnt seem to work. therefore we pre initalize the weapon mode so, that for instance their combat state based animations
 * like S_FISTWALKL work properly
 *  
 */
export function getWolfInstance(): revmp.BotTemplate {
    return {
        name: "Wolf",
        maxHealth: 500,
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

        attributes: {
            strength: 100,
        },
        weaponMode: revmp.WeaponMode.Fist
    }

}


export function getScavengerInstance(): revmp.BotTemplate {
    return {
        name: "Scavenger",
        maxHealth: 500,
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
        attributes: {
            strength: 100,
        },
        weaponMode: revmp.WeaponMode.Fist
    }

}

export function getSnapperInstance(): revmp.BotTemplate {
    return {
        name: "Snapper",
        maxHealth: 500,
        visual: "Snapper.mds",
        visualBody: {
            bodyMesh: "Sna_Body"
        },
        meleeAttack: {
            edge: 100,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        attributes: {
            strength: 200,
        },
        weaponMode: revmp.WeaponMode.Fist
    }

}

export function getWargInstance(): revmp.BotTemplate {
    return {
        name: "Warg",
        maxHealth: 700,
        visual: "Wolf.mds",
        visualBody: {
            bodyMesh: "Warg_Body2"
        },
        meleeAttack: {
            edge: 80,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        attributes: {
            strength: 150,
        },
        weaponMode: revmp.WeaponMode.Fist
    }

}

export function getKeilerInstance(): revmp.BotTemplate {
    return {
        name: "Keiler",
        maxHealth: 500,
        visual: "Keiler.mds",
        visualBody: {
            bodyMesh: "Keiler_Body"
        },
        meleeAttack: {
            edge: 80,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        attributes: {
            strength: 100,
        },
        weaponMode: revmp.WeaponMode.Fist
    }

}
export function getLurkerInstance(): revmp.BotTemplate {
    return {
        name: "Lurker",
        maxHealth: 500,
        visual: "Lurker.mds",
        visualBody: {
            bodyMesh: "Lur_Body"
        },
        meleeAttack: {
            edge: 80,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        attributes: {
            strength: 100,
        },
        weaponMode: revmp.WeaponMode.Fist
    }

}
export function getTrollInstance(): revmp.BotTemplate {
    return {
        name: "Troll",
        maxHealth: 2000,
        visual: "Troll.mds",
        visualBody: {
            bodyMesh: "Tro_Body"
        },
        meleeAttack: {
            edge: 80,
            range: 80
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        attributes: {
            strength: 200,
        },
        weaponMode: revmp.WeaponMode.Fist
    }

}
export function getOrcWarriorInstance(): revmp.BotTemplate {
    return {
        name: "Orc Warrior",
        maxHealth: 1000,
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
        attributes: {
            strength: 100,
            twoHanded: 100
        }
    }

}

export function getOrcEliteInstance(): revmp.BotTemplate {
    return {
        name: "Orc Elite",
        maxHealth: 1700,
        visual: "Orc.mds",
        visualBody: {
            bodyMesh: "Orc_BodyElite",
            headMesh: "Orc_HeadWarrior"
        },
        meleeAttack: {
            edge: 100,
            range: 20
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        attributes: {
            strength: 15,
            twoHanded: 100
        }
    }

}

export function getUndeadOrcInstance(): revmp.BotTemplate {
    return {
        name: "Undead Orc",
        maxHealth: 1600,
        visual: "Orc.mds",
        visualBody: {
            bodyMesh: "UOW_Body"
        },
        meleeAttack: {
            edge: 20,
            range: 20
        },
        protection: {
            blunt: 100,
            edge: 100,
            fire: 100,
            fly: 100,
        },
        attributes: {
            strength: 15,
            twoHanded: 100
        }
    }

}
export function getShadowbeastInstance(): revmp.BotTemplate {
    return {
        name: "Shadow beast",
        maxHealth: 1000,
        visual: "Shadow.mds",
        visualBody: {
            bodyMesh: "Sha_Body"
        },
        meleeAttack: {
            edge: 100,
            range: 20
        },
        attributes: {
            strength: 200,
            twoHanded: 100
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
//HUM_BODY_BABE0
export function getHeavyCrimminalInstance(): revmp.BotTemplate {
    const randomHeadIndex = Math.floor(Math.random() * MALE_HEAD_MODELS.length);
    const randomHeadTex = Math.floor(Math.random() * (80 - 35 + 1) + 35)
    const randomNameIndex =  Math.floor(Math.random() * RANDOM_CRIMMINAL_NAME.length);
    const randomTitleIndex =  Math.floor(Math.random() * RANDOM_CRIMMINAL_TITLE.length);

    return {
        name: `${RANDOM_CRIMMINAL_NAME[randomNameIndex]} ${RANDOM_CRIMMINAL_TITLE[randomTitleIndex]}`,
        maxHealth: 1600,
        visual: "Humans.mds",
        visualBody: {
            bodyMesh: "hum_body_Naked0",
            headMesh: MALE_HEAD_MODELS[randomHeadIndex],
            bodyTexture: 1,
            headTexture: randomHeadTex
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
        attributes: {
            strength: 15,
            oneHanded: 100
        }
    }

}


export function getWeaponMasterMaleInstance(): revmp.BotTemplate {
    const randomHeadIndex = Math.floor(Math.random() * MALE_HEAD_MODELS.length);
    const randomHeadTex = Math.floor(Math.random() * (80 - 35 + 1) + 35)
    return {
        name: "Twohand Master",
        maxHealth: 1500,
        visual: "Humans.mds",
        visualBody: {
            bodyMesh: "hum_body_Naked0",
            headMesh: MALE_HEAD_MODELS[randomHeadIndex],
            bodyTexture: 1,
            headTexture: randomHeadTex
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
        attributes: {
            strength: 15,
            oneHanded: 100,
            twoHanded: 100
        }
    }

}

export function getRoamingRobberInstance(): revmp.BotTemplate {
    const randomHeadIndex = Math.floor(Math.random() * MALE_HEAD_MODELS.length);
    const randomHeadTex = Math.floor(Math.random() * (80 - 35 + 1) + 35)
    return {
        name: "Roaming Robber",
        maxHealth: 1000,
        visual: "Humans.mds",
        visualBody: {
            bodyMesh: "hum_body_Naked0",
            headMesh: MALE_HEAD_MODELS[randomHeadIndex],
            bodyTexture: 1,
            headTexture: randomHeadTex
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
        attributes: {
            strength: 15,
            oneHanded: 100
        }
    }

}

export function getRoamingCitizenMaleInstance(): revmp.BotTemplate {
    const randomHeadIndex = Math.floor(Math.random() * MALE_HEAD_MODELS.length);
    const randomHeadTex = Math.floor(Math.random() * (80 - 35 + 1) + 35)
    return {
        name: "Citizen",
        maxHealth: 700,
        visual: "Humans.mds",
        visualBody: {
            bodyMesh: "hum_body_Naked0",
            headMesh: MALE_HEAD_MODELS[randomHeadIndex],
            bodyTexture: 1,
            headTexture: randomHeadTex
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
        attributes: {
            strength: 15,
            oneHanded: 100
        }
    }
}


export function getRoamingCitizenFemaleInstance(): revmp.BotTemplate {
    const randomHeadIndex = Math.floor(Math.random() * FEMALE_HEAD_MODELS.length);
    const randomHeadTex = Math.floor(Math.random() * (155 - 142 + 1) + 142)
    return {
        name: "Citizen",
        maxHealth: 700,
        visual: "Humans.mds",
        visualBody: {

            bodyMesh: "HUM_BODY_BABE0",
            headMesh: FEMALE_HEAD_MODELS[randomHeadIndex],
            bodyTexture: 4,
            headTexture: randomHeadTex
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
        attributes: {
            strength: 15,
            oneHanded: 100
        }
    }

}

export function getDemonKingInstance(): revmp.BotTemplate {
    return {
        name: "Demon King",
        maxHealth: 2200,
        visual: "Humans.mds",
        visualBody: {
            bodyMesh: "hum_body_Naked0",
            headMesh: "Hum_Head_Pony",
            bodyTexture: 3,
            headTexture: 4
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
        attributes: {
            strength: 15,
            oneHanded: 100,
            twoHanded: 100
        }
    }

}

export function getZombieInstance(): revmp.BotTemplate {
    return {
        name: "Zombie",
        maxHealth: 1000,
        visual: "Zombie.mds",
        visualBody: {
            bodyMesh: "Zom_Body",
            headMesh: "Zom_Head"
        },
        meleeAttack: {
            edge: 100,
            range: 20
        },
        attributes: {
            strength: 200,
            twoHanded: 100
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