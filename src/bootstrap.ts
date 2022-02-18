import { ArmorInstances, initArmorInstances } from "./aiScripts/aiEntities/equipment/armors";
import { initWeaponInstances, WeaponInstances } from "./aiScripts/aiEntities/equipment/weapons";
import { initAiState } from "./aiScripts/aiInit";
import { AiState } from "./aiScripts/aiStates/aiState";
import { updateWorldAcordingToState } from "./aiScripts/aiStates/aiWorldStateInterpreter";
import { getWorldEventState } from "./aiScripts/aiStates/aiStateFunctions/commonAiStateFunctions";
import { revive } from "./serverComponents/damageCalculation";
import { KHORINIS_FRACTION } from "./aiScripts/aiStates/waynetRegistries/iWorldEventState";
import { initWorldItems, respawnPlants } from "./serverComponents/worldItems";

let aiState: AiState;

revmp.name = "Revmp Adventures";
revmp.description = "The best adventure experience.";

revmp.on("init", () => {

    const world = revmp.createWorld({
        zen: "NEWWORLD/NEWWORLD.ZEN",
        //startpoint: "NW_CITY_HABOUR_02_B",
        startpoint: "NW_CITY_CITYHALL_IN_01",
        name: "New World",
        time: { hour: 15 }
    });
    initWeaponInstances()
    initArmorInstances()
    //initWorldItems()
    //const itemId = revmp.addItem(revmp.worlds[0], WeaponInstances.dragonHunterBlade, { amount: 1, position: [0,0,0] })



    aiState = initAiState()

});

revmp.on("entityCreated", (entity: revmp.Entity) => {

    if (revmp.isPlayer(entity)) {
        revmp.addItem(entity, WeaponInstances.dragonHunterBlade, 1);
        revmp.addItem(entity, ArmorInstances.dragonHunterArmor, 1);
        revmp.equipItem(entity, WeaponInstances.dragonHunterBlade)
        revmp.equipItem(entity, ArmorInstances.dragonHunterArmor)
        revmp.setAttributes(entity, { strength: 100, oneHanded: 100 })
        revmp.setHealth(entity, { current: 2100, max: 2100 })
        revmp.addMdsOverlay(entity, "Humans_1hST2.MDS")
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
    }
    else if (command === "/revive") {
        revive(entity);
    }

    else if (command === "/tp") {
        const tpTarget = parseInt(words[1])
        if (typeof tpTarget !== 'undefined') {
            const pos = revmp.getPosition(tpTarget)
            revmp.setPosition(entity, pos)
        }
    }

    else if (command === "/healme") {
        const maxHealth = revmp.getHealth(entity).max
        revmp.setHealth(entity, { current: maxHealth, max: maxHealth })
    }

    else if (command === "/v1") {
        revmp.setPosition(entity, { position: [15553, 1048, 49] })
    }
    else if (command === "/v2") {
        revmp.setPosition(entity, [1000, 1000, 1000])
    }

    else if (command === "/v3") {
        revmp.setPosition(entity, { position: [0, 0, 0] })
    }

    else if (command === "/ws") {
        const state = getWorldEventState(aiState)
        revmp.sendChatMessage(entity, "paladins: " + (state.khorinisState?.get(KHORINIS_FRACTION.PALADIN) ?? 0))
        revmp.sendChatMessage(entity, "mercenaries: " + (state.khorinisState?.get(KHORINIS_FRACTION.MERCENARY) ?? 0))
        revmp.sendChatMessage(entity, "beliar: " + (state.khorinisState?.get(KHORINIS_FRACTION.BELIAR) ?? 0))
        revmp.sendChatMessage(entity, "last update: " + state.lastStateUpdate)
    }

    else if (command === "/setpal") {
        const input = parseInt(words[1])
        getWorldEventState(aiState).khorinisState.set(KHORINIS_FRACTION.PALADIN,input) 
    }
    else if (command === "/setmerc") {
        const input = parseInt(words[1])
        getWorldEventState(aiState).khorinisState.set(KHORINIS_FRACTION.MERCENARY,input) 
    }
    else if (command === "/setbel") {
        const input = parseInt(words[1])
        getWorldEventState(aiState).khorinisState.set(KHORINIS_FRACTION.BELIAR,input) 
    }
    else if (command === "/update") {
        updateWorldAcordingToState(aiState)
    }
    else if (command === "/pray") {
        revmp.startAnimation(entity, "S_PRAY")
    }

    else if (command === "/sev") {
        revmp.sendChatMessage(entity, "start sending....")
        revmp.emit("myevent", entity)
    }
    else if (command === "/fall"){
        revmp.startAnimation(entity, "T_STAND_2_" + "S_FALLB")
    }
    else if (command === "/id"){
        const focusid = revmp.getFocus(entity).focus
        revmp.sendChatMessage(entity, "id: " + focusid)
    }
    else if (command === "/resp"){
        respawnPlants()
    }
    else if(command === "/oneitem"){
        const itemId = revmp.addItem(revmp.worlds[0], WeaponInstances.dragonHunterBlade, { amount: 1, position: [0,0,0] })
    }

    else if(command === "/moreitems"){
        const itemId = revmp.addItem(revmp.worlds[0], WeaponInstances.dragonHunterBlade, { amount: 5, position: [200,200,200] })
    }
}


revmp.on("chatCommand", (entity, msg) => {
    const words = msg.toLowerCase().split(' ');
    console.log(words);
    debugCommands(entity, msg)
});


revmp.on("myevent", (entity) => {
    if (typeof entity === 'number') {
        revmp.sendChatMessage(entity, "you send a custom event")
    }
});
