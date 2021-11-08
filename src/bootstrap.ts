import { getPlayerAngle } from "./aiScripts/aiFunctions/aiUtils";
import { initAiState } from "./aiScripts/aiInit";
import { EntityManager } from "./aiScripts/aiStates/entityManager";
import { ArmorInstances, initArmorInstances } from "./serverComponents/armors";
import { revive } from "./serverComponents/damageCalculation";
import { initWeaponInstances, WeaponInstances } from "./serverComponents/weapons";

/* eslint-disable @typescript-eslint/no-var-requires */
//const damageCalculation = require("./dist/serverComponents/damageCalculation");
//const ai = require("./dist/aiStates/aiUpdateLoop");
let entityManager:EntityManager|undefined;
let aiState;


revmp.name = "Revmp Adventures";
revmp.description = "The best adventure experience.";

revmp.on("init", () => {
    
    const world = revmp.createWorld({
        zen: "NEWWORLD/NEWWORLD.ZEN",
        startpoint: "NW_CITY_HABOUR_02_B",
        name: "New World",
        time: { hour: 15 }
    });
    initWeaponInstances()
    initArmorInstances()
    
    aiState = initAiState()
    entityManager = aiState.getEntityManager()

});

revmp.on("entityCreated", (entity: revmp.Entity) => {

    if(revmp.isPlayer(entity)){
        const instance = WeaponInstances.warSword
        revmp.addItem(entity, instance, 1);
        revmp.addItem(entity,ArmorInstances.vlkFemaleArmor , 1);
        revmp.addItem(entity,ArmorInstances.vlkMaleArmor , 1);
        revmp.setAttributes(entity, {strength: 100, oneHanded: 100})
        revmp.setHealth(entity, {current: 2100, max: 2100})
        revmp.addOverlay(entity, "Humans_1hST2.MDS")
        revmp.sendChatMessage(entity, 'type /healme to get back to full health')
    }

})

//export function sendChatMessage(player: number|number[], message: string, color?: [number, number, number, number?]): void
function debugCommands(entity: revmp.Entity, msg: string) {
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    if (command === "/getpos") {
        const pos = revmp.getPosition(entity)
        revmp.sendChatMessage(entity, `pos: ${pos.position[0]},${pos.position[1]},${pos.position[2]}`)
    }
    if (command === "/sendsomething") {
        revmp.sendChatMessage(entity, 'testo')
    } else if (command === "/revive") {
        revive(entity);
    }

    if(command === "/tp"){
        const tpTarget = parseInt(words[1])
        if(typeof tpTarget !== 'undefined'){
            const pos = revmp.getPosition(tpTarget)
            revmp.setPosition(entity, pos)
        }
    }


}

revmp.on("attacked", (attacker, target, userEvent) => {
    const enemyId = entityManager?.getEnemyComponent(target)?.enemyId ?? -1
    if(enemyId === -1){
        entityManager?.setEnemyComponent(target, { entityId: target, enemyId: attacker, lastAttackTime: 0})
    }
})

revmp.on("chatCommand", (entity, msg) => {
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    console.log(words);
    debugCommands(entity, msg)


    if (command === "/masochist") {
        setInterval(revmp.attack.bind(revmp), 200, entity, entity);
    }
    if (command === "/e") {
        const angle = getPlayerAngle(entity)
        console.log("angle: " + angle)
    }
    if (command === "/eq") {
        const instance = WeaponInstances.warSword
        revmp.addItem(entity, instance, 1);
        revmp.addItem(entity,ArmorInstances.vlkFemaleArmor , 1);
        revmp.addItem(entity,ArmorInstances.vlkMaleArmor , 1);
        revmp.setAttributes(entity, {strength: 100, oneHanded: 100})
        revmp.setHealth(entity, {current: 2100, max: 2100})
        revmp.addOverlay(entity, "Humans_1hST2.MDS")
    }
    if (command === "/healme") {
        const maxHealth = revmp.getHealth(entity).max
        revmp.setHealth(entity, {current: maxHealth, max: maxHealth})
    }
    if (command === "/health") {
        revmp.setHealth(entity, { current: 700, max: 1100 })
        const h = revmp.getHealth(entity)
        console.log(h.current)
        console.log(h.max)
    }
    if (command === "/jump") {
        revmp.startAnimation(entity, "S_JUMP");
    }
    if (command === "/stumble") {
        revmp.startAnimation(entity, "T_STUMBLE");
    }
    if (command === "/stu2") {
        revmp.startAnimation(entity, "T_STUMBLEB");
    }
    if (command === "/toorc") {
        revmp.setVisualBody(entity, {bodyMesh: "Orc_BodyElite", headMesh: "Orc_HeadWarrior"})
        revmp.addItem(entity, WeaponInstances.eliteOrcSword, 1);
        revmp.equipItem(entity, WeaponInstances.eliteOrcSword)
        revmp.setAttributes(entity, { twoHanded: 100 })
        revmp.startAnimation(entity, "T_STAND_2_STUMBLE");
    }

    if (command === "/wptest") {
        revmp.setPosition(entity, [14671.2051, 1150.05042, 517.412537])
    }

    if(command === "/loopani"){
        const focusid = revmp.getFocus(entity).focus
        setInterval(()=>{
            revmp.startAnimation(focusid, "T_WARN")}, 200);
    }
});

