"use strict";

const wolf = require("./scripts/aiEntities/npcs/wolf");
const funs = require("./scripts/aiStates/aiStateFunctions");
const entityManager = require("./scripts/aiStates/entityManager");
const aiUpdateLoop = require("./scripts/aiStates/aiUpdateLoop");
//const ai = require("./scripts/aiStates/aiUpdateLoop");

const posFuncs = require("./scripts/waynet/positionFunctions");
let em = new entityManager.EntityManager();
let updateLoop = new aiUpdateLoop.AiUpdateLoop(em);

revmp.createInstanceTemplate({
    type: revmp.InstanceType.Character,
    id: "revmp_pc_hero",
    name: "Ich",
    maxHealth: 100,
    maxMana: 10,
    attributes: {
        strength: 10,
        dexterity: 10,
        magicCircle: 0,
        oneHanded: 0,
        twoHanded: 0,
        bow: 0,
        crossbow: 0,
    },
    meleeAttack: {
        blunt: 5,
        edge: 0,
        point: 0,
        fire: 0,
        fly: 0,
        magic: 0,
        fall: 0,
        range: 40,
    },
    protection: { 
        blunt: 0,
        edge: 0,
        point: 0,
        fire: 0,
        fly: 0,
        magic: 0,
        fall: 0,
    },
    visual: "humans.mds",
    visualBody: {
        bodyMesh: "hum_body_Naked0",
        bodyTexture: 9,
        skinColor: 0,
        headMesh: "Hum_Head_Pony",
        headTexture: 18,
        teethTexture: 0,
        bodyMass: 0,
    },
});

revmp.createInstanceTemplate({
    type: revmp.InstanceType.Character,
    id: "revmp_wolf",
    name: "Wolf",
    maxHealth: 60,
    meleeAttack: {
        edge: 30,
        range: 80,
    },
    protection: { 
        blunt: 30,
        edge: 30,
        fire: 30,
        fly: 30,
    },
    visual: "Wolf.mds",
    visualBody: {
        bodyMesh: "Wol_Body",
    },
    weaponMode: revmp.WeaponState.Fist,
});

revmp.on("init", () => {

    revmp.createInstanceTemplate({
        type: revmp.InstanceType.World,
        id: "new_world",
        name: "New World",
        zen: "NEWWORLD\\NEWWORLD.ZEN",
        waypoint: "NW_CITY_HABOUR_02_B",
    });
    const world = revmp.createWorld("new_world");
    revmp.setTime(world, { hour: 15, minute: 0 });

    let w = new wolf.Wolf()
    setInterval(updateLoop.updateAll.bind(updateLoop), 1000);
    funs.SpawnNpc(em, w, 0, 0, 0);
    
    console.log(w.id)

});

function getDistance(x1, y1, z1, x2, y2, z2) {
    if ([x1, y1, z1, , x2, y2, z2].some((val) => (typeof val === 'undefined'))) {
        return 99999
    }
    let x = x1 - x2
    let y = y1 - y2
    let z = z1 - z2

    return Math.sqrt(x * x + y * y + z * z);
}

//export function sendChatMessage(player: number|number[], message: string, color?: [number, number, number, number?]): void
function debugCommands(entity, msg){
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    
    if (command === "/getpos") {
        let pos = revmp.getPosition(entity)
        revmp.sendChatMessage(entity, `pos: ${pos.x},${pos.y},${pos.z}`)
    }
    if (command === "/sendsomething") {
        revmp.sendChatMessage(entity, 'testo')
    }

    if(command === "/walk"){
        const param1 = words[1];
        let npcid = parseInt(param1)
        //todo : liefer aiAction den state mit, und entferne die die aktion selbst, wenn die position erreicht wurde
        let aiAction = {
            priority:1,
            aiId:npcid,
            shouldLoop: true,
            executeAction: function(){
                let pos = revmp.getPosition(npcid) 
                let positionComponent =  em.getPositionsComponents(npcid)
                positionComponent.currentPosX = pos.x
                positionComponent.currentPosY = pos.y
                positionComponent.currentPosZ = pos.z
                em.setPositionsComponent(npcid, positionComponent)
                
                posFuncs.gotoPosition(positionComponent, 566, -79, -964)
                let position = revmp.getPosition(npcid)
                console.log(npcid)

                if(getDistance(566, -79, -964, position.x, position.y, position.z) < 50){
                    this.shouldLoop = false
                }
            }
        }

        
        //console.log(npc)
        //todo: push die aiActions in den npc
        //npc.addAction(aiAction)
        em.getActionsComponent(npcid).nextActions.push(aiAction)

    }
}

revmp.on("chatCommand", (entity, msg) => {
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    console.log(words);
    debugCommands(entity, msg)

    if (command === "/spawn") {
        funs.SpawnNpc(em, new wolf.Wolf(), 0, 0, 0);
    }
});
