"use strict";

const wolf = require("./aiEntities/npcs/wolf");
const funs = require("./aiStates/aiStateFunctions");
const entityManager = require("./aiStates/entityManager");
const aiUpdateLoop = require("./aiStates/aiUpdateLoop");
//const ai = require("./scripts/aiStates/aiUpdateLoop");

const commonActions = require("./aiFunctions/commonActions");

const posFuncs = require("./waynet/positionFunctions");
let em = new entityManager.EntityManager();
let updateLoop = new aiUpdateLoop.AiUpdateLoop(em);

function createWolf() {
    return revmp.createBot({
        name: "Wolf",
        maxHealth: 60,
        visual: "Wolf.mds",
        visualBody: {
            bodyMesh: "Wol_Body"
        },
        meleeAttack: {
            edge: 30,
            range: 80
        },
        protection: {
            blunt: 30,
            edge: 30,
            fire: 30,
            fly: 30,
        },
        weaponMode: revmp.WeaponMode.Fist
    });
}

function createHuman() {
    return revmp.createBot({
        name: "Dar",
        maxHealth: 100,
        visual: "humans.mds",
        visualBody: {
            bodyMesh: "hum_body_Naked0",
            bodyTexture: 1,
            headMesh: "Hum_Head_Bald",
            headTexture: 69
        },
        attributes: {
            strength: 80,
            dexterity: 80,
            magicCircle: 4,
            oneHanded: 50,
            twoHanded: 50,
            bow: 50,
            crossbow: 50
        },
        meleeAttack: {
            blunt: 5,
            range: 80
        }
    });
}

revmp.on("init", () => {

    const world = revmp.createWorld({
        zen: "NEWWORLD/NEWWORLD.ZEN",
        startpoint: "NW_CITY_HABOUR_02_B",
        name: "New World",
        time: { hour: 15 }
    });

    revmp.setTime(world, { hour: 15, minute: 0 });

    let w = new wolf.Wolf()
    setInterval(updateLoop.readDescriptions.bind(updateLoop), 1000);
    setInterval(updateLoop.updateAll.bind(updateLoop), 200);
    funs.SpawnNpc(em, w, 0, 0, 0);
    console.log(w.id)
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
function debugCommands(entity, msg) {
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    if (command === "/getpos") {
        let pos = revmp.getPosition(entity)
        revmp.sendChatMessage(entity, `pos: ${pos.x},${pos.y},${pos.z}`)
    }
    if (command === "/sendsomething") {
        revmp.sendChatMessage(entity, 'testo')
    }

    if (command === "/walk") {
        const param1 = words[1];
        let npcid = parseInt(param1)
        //todo : liefer aiAction den state mit, und entferne die die aktion selbst, wenn die position erreicht wurde
        let aiAction = {
            priority: 1,
            aiId: npcid,
            shouldLoop: true,
            executeAction: function() {
                let pos = revmp.getPosition(npcid).position
                let positionComponent = em.getPositionsComponents(npcid)
                positionComponent.currentPosX = pos[0]
                positionComponent.currentPosY = pos[1]
                positionComponent.currentPosZ = pos[2]
                console.log(positionComponent.currentPosX)
                em.setPositionsComponent(npcid, positionComponent)
                posFuncs.gotoPosition(positionComponent, 566, -79, -964)

                let position = revmp.getPosition(npcid)
                console.log(npcid)

                if (getDistance(566, -79, -964, position.x, position.y, position.z) < 50) {
                    this.shouldLoop = false
                }
            }
        }

        //todo: push die aiActions in den npc
        //npc.addAction(aiAction)
        em.getActionsComponent(npcid).nextActions.push(aiAction)

    }
}

revmp.on("attacked", (attacker, target, userEvent) => {

    //todo : liefer aiAction den state mit, und entferne die die aktion selbst, wenn die position erreicht wurde
    let aiAction = new commonActions.SFistAttackAction(2, target, attacker)
    let turnAction = new commonActions.TurnToTargetAction(2,target, attacker)
    let waitAction = new commonActions.WaitAction(1, target, 3000, new Date().getMilliseconds())
    if(typeof em.getEnemyComponent(target) !== 'undefined'){
        em.setEnemyComponent(target, { entityId: target, enemyId: attacker })
    }

    
//     revmp.startAnimation(target, "S_FISTRUNL")
    //todo: push die aiActions in den npc
    //npc.addAction(aiAction)
    /*
    if(typeof em.getActionsComponent(target) !== 'undefined'){
        em.getActionsComponent(target).nextActions.push(waitAction)
        em.getActionsComponent(target).nextActions.push(turnAction)
        em.getActionsComponent(target).nextActions.push(aiAction) }
        */


})

revmp.on("chatCommand", (entity, msg) => {
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    console.log(words);
    debugCommands(entity, msg)

    if (command === "/spawn") {
        funs.SpawnNpc(em, new wolf.Wolf(), 0, 0, 0);
    }
});
