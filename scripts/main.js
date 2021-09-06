"use strict";

const wolf = require("./aiEntities/npcs/wolf");
const npcInitializer = require("./initNewWorldNpcs");
const scavenger = require("./aiEntities/npcs/scavenger");
const orcElite = require("./aiEntities/npcs/orcElite");
const orcWarrior = require("./aiEntities/npcs/orcWarrior");
const undeadOrc = require("./aiEntities/npcs/undeadOrc");
const funs = require("./aiStates/aiStateFunctions");
const aiState = require("./aiStates/aiState");
const aiUpdateLoop = require("./aiStates/aiUpdateLoop");
const {Instances, initItemInstances} = require("./serverComponents/weapons");
const damageCalculation = require("./serverComponents/damageCalculation");
const {setAngle, getAngle, getAngleDistance, getPlayerAngle} = require("./aiFunctions/aiUtils");
//const ai = require("./scripts/aiStates/aiUpdateLoop");
const commonActions = require("./aiFunctions/commonActions");
const posFuncs = require("./waynet/positionFunctions");
let state = new aiState.AiState('./newworld.wp', './newworld.fp')
let em = state.getEntityManager();
let updateLoop = new aiUpdateLoop.AiUpdateLoop(state);
let aiStateFunctions = new funs.AiStateFunctions(state)

revmp.on("init", () => {

    const world = revmp.createWorld({
        zen: "NEWWORLD/NEWWORLD.ZEN",
        startpoint: "NW_CITY_HABOUR_02_B",
        name: "New World",
        time: { hour: 15 }
    });
    initItemInstances()

    revmp.setTime(world, { hour: 15, minute: 0 });
    setInterval(updateLoop.updateAll.bind(updateLoop), 50);

    let testMonster = new wolf.Wolf()
    console.log("monster id: " + testMonster.id)
    aiStateFunctions.spawnNpc(testMonster,"HAFEN","NEWWORLD\\NEWWORLD.ZEN")
    npcInitializer.initNewWorldNpcs(state)

});

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

    if(typeof em.getEnemyComponent(target) !== 'undefined'){
        em.setEnemyComponent(target, { entityId: target, enemyId: attacker })
    }

})

revmp.on("chatCommand", (entity, msg) => {
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    console.log(words);
    debugCommands(entity, msg)

    if (command === "/spawn") {
        aiStateFunctions.spawnNpcByCoordinates(new wolf.Wolf(), 0, 0, 0,"NEWWORLD\\NEWWORLD");
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
        revmp.setHealth(entity, {current: 1600, max: 1600})
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
    if (command === "/toorc") {
        revmp.setVisualBody(entity, {bodyMesh: "Orc_BodyElite", headMesh: "Orc_HeadWarrior"})
        revmp.addItem(entity, Instances.eliteOrcSword, 1);
        revmp.equipItem(entity, Instances.eliteOrcSword)
        revmp.setAttributes(entity, { twoHanded: 100 })
        revmp.startAnimation(entity, "T_STAND_2_STUMBLE");
    }

    if (command === "/wptest") {
        revmp.setPosition(entity, [14671.2051, 1150.05042, 517.412537])
    }

    if(command === "/loopani"){
        let focusid = revmp.getFocus(entity).focus
        setInterval(()=>{
            revmp.startAnimation(focusid, "T_WARN")}, 200);

    }
});
