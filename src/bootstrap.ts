import { ArmorInstances, initArmorInstances } from "./aiScripts/aiEntities/equipment/armors";
import { initWeaponInstances, WeaponInstances } from "./aiScripts/aiEntities/equipment/weapons";
import { initAiState } from "./aiScripts/aiInit";
import { AiState } from "./aiScripts/aiStates/aiState";
import { AiStateFunctions } from "./aiScripts/aiStates/aiStateFunctions";
import { updateWorldAcordingToState } from "./aiScripts/aiStates/aiWorldStateInterpreter";
import { getWorldEventState } from "./aiScripts/aiStates/commonAiStateFunctions";
import { revive } from "./serverComponents/damageCalculation";

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


    aiState = initAiState()

});

revmp.on("entityCreated", (entity: revmp.Entity) => {

    if(revmp.isPlayer(entity)){
        revmp.addItem(entity, WeaponInstances.dragonHunterBlade, 1);
        revmp.addItem(entity, ArmorInstances.dragonHunterArmor, 1);
        revmp.equipItem(entity, WeaponInstances.dragonHunterBlade)
        revmp.equipItem(entity, ArmorInstances.dragonHunterArmor)
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
        revmp.sendChatMessage(entity, "influence of gods: " + state.influenceOfTheGods)
        revmp.sendChatMessage(entity, "khorinis state: " + state.khorinisState)
        revmp.sendChatMessage(entity, "bigfarm state: " + state.bigFarmState)
        revmp.sendChatMessage(entity, "last update: " + state.lastStateUpdate)
    }

    else if (command === "/setig") {
        const input = parseInt(words[1])
        getWorldEventState(aiState).influenceOfTheGods = input
    }
    else if (command === "/setks") {
        const input = parseInt(words[1])
        getWorldEventState(aiState).khorinisState = input
    }
    else if (command === "/update") {
        updateWorldAcordingToState(aiState, new AiStateFunctions(aiState))
    }
    else if (command === "/pray") {
        revmp.startAnimation(entity, "S_PRAY")
    }
}


revmp.on("chatCommand", (entity, msg) => {
    const words = msg.toLowerCase().split(' ');
    console.log(words);
    debugCommands(entity, msg)
});

