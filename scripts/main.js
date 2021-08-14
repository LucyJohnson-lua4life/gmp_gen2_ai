"use strict";

const wolf = require("./aiEntities/npcs/wolf");
const funs = require("./aiStates/aiStateFunctions");
const aiState = require("./aiStates/aiState");
const aiUpdateLoop = require("./aiStates/aiUpdateLoop");
const {Instances} = require("./serverComponents/weapons");
const damageCalculation = require("./serverComponents/damageCalculation");
const {setAngle, getAngle, getAngleDistance, getPlayerAngle} = require("./aiFunctions/aiUtils");
//const ai = require("./scripts/aiStates/aiUpdateLoop");
const commonActions = require("./aiFunctions/commonActions");
const posFuncs = require("./waynet/positionFunctions");
let state = new aiState.AiState()
let em = state.getEntityManager();
let updateLoop = new aiUpdateLoop.AiUpdateLoop(em);

function createWolf() {
    return revmp.createBot({
        name: "Wolf",
        maxHealth: 1000,

        visual: "Wolf.mds",
        visualBody: {
            bodyMesh: "Wol_Body"
        },
        meleeAttack: {
            edge: 30
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


revmp.on("init", () => {

    const world = revmp.createWorld({
        zen: "NEWWORLD/NEWWORLD.ZEN",
        startpoint: "NW_CITY_HABOUR_02_B",
        name: "New World",
        time: { hour: 15 }
    });

    revmp.setTime(world, { hour: 15, minute: 0 });

    let w = new wolf.Wolf()
    revmp.setHealth(w.id, {current: 1000, max: 1000})
    setInterval(updateLoop.readDescriptions.bind(updateLoop), 200);
    setInterval(updateLoop.updateAll.bind(updateLoop), 200);
    console.log("wolf id: " + w.id)
    funs.SpawnNpc(em, w, 0, 0, 1000);

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
        let positionComponent = em.getPositionsComponents(npcid)
        let pos = revmp.getPosition(npcid).position
        positionComponent.currentPosX = pos[0]
        positionComponent.currentPosY = pos[1]
        positionComponent.currentPosZ = pos[2]
        em.setPositionsComponent(npcid, positionComponent)
        let aiAction = new commonActions.GotoPoint(npcid, state, "FP_STAND_CITY_ANDRE")
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
        revmp.setCombatState(target, {weaponMode: revmp.WeaponMode.Fist})
    }

})

revmp.on("chatCommand", (entity, msg) => {
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    console.log(words);
    debugCommands(entity, msg)

    if (command === "/spawn") {
        funs.SpawnNpc(em, new wolf.Wolf(), 0, 0, 0);
    }
    if (command === "/masochist") {
        setInterval(revmp.attack.bind(revmp), 200, entity, entity);
    }
    if (command === "/e") {
        let angle = getPlayerAngle(entity)
        console.log("angle: " + angle)
    }
    if (command === "/a") {
        let focusid = revmp.getFocus(entity).focus
        const position = revmp.getPosition(entity).position;
        const targetPosition = revmp.getPosition(focusid).position;
        const y = getAngle(position[0], position[2], targetPosition[0], targetPosition[2]);
        //const r = getAngle(targetPosition[0], targetPosition[2], position[0], position[2]);
        console.log(y)
    }
    if (command === "/sa") {
        setAngle(entity, parseInt(words[1]))
    }
    if (command === "/eq") {
        let instance = Instances.warsword
        revmp.addItem(entity, instance, 1);
        revmp.setAttributes(entity, {strength: 100, oneHanded: 100})
        revmp.setHealth(entity, {current: 1100, max: 1100})
        revmp.addOverlay(entity, "Humans_1hST2.MDS")
        let attribute = revmp.getAttributes(entity)
        console.log("one handed"+ attribute.oneHanded)
    }
    if (command === "/health") {
        revmp.setHealth(entity, { current: 700, max: 1100 })
        let h = revmp.getHealth(entity)
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
    if (command === "/stumble2") {
        revmp.startAnimation(entity, "T_STAND_2_STUMBLE");
    }

    if (command === "/wptest") {
        //console.log(state.getWaynet().freepoints[0].fpName)
        
        revmp.setPosition(entity, [14671.2051, 1150.05042, 517.412537])

    }
});
