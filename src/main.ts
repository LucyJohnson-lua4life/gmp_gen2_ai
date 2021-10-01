/* eslint-disable @typescript-eslint/no-var-requires */
const wolf = require("./dist/aiEntities/npcs/wolf");
const npcInitializer = require("./dist/initNewWorldNpcs");
const scavenger = require("./dist/aiEntities/npcs/scavenger");
const orcElite = require("./dist/aiEntities/npcs/orcElite");
const orcWarrior = require("./dist/aiEntities/npcs/orcWarrior");
const undeadOrc = require("./dist/aiEntities/npcs/undeadOrc");
const funs = require("./dist/aiStates/aiStateFunctions");
const aiState = require("./dist/aiStates/aiState");
const aiUpdateLoop = require("./dist/aiStates/aiUpdateLoop");
const {Instances, initItemInstances} = require("./dist/serverComponents/weapons");
const damageCalculation = require("./dist/serverComponents/damageCalculation");
const {setAngle, getAngle, getAngleDistance, getPlayerAngle} = require("./dist/aiFunctions/aiUtils");
//const ai = require("./dist/aiStates/aiUpdateLoop");
const commonActions = require("./dist/aiFunctions/commonActions");
const posFuncs = require("./dist/waynet/positionFunctions");
const state = new aiState.AiState('./waynet/newworld.wp', './waynet/newworld.fp')
const em = state.getEntityManager();
const updateLoop = new aiUpdateLoop.AiUpdateLoop(state);
const aiStateFunctions = new funs.AiStateFunctions(state)

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

    const testMonster = new wolf.Wolf();
    console.log("monster id: " + testMonster.id)
    aiStateFunctions.spawnNpc(testMonster,"HAFEN","NEWWORLD\\NEWWORLD.ZEN")
    npcInitializer.initNewWorldNpcs(state)

});

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

    if (command === "/walk") {
        const param1 = words[1];
        const npcid = parseInt(param1)
        const positionComponent = em.getPositionsComponents(npcid)
        const pos = revmp.getPosition(npcid).position
        positionComponent.currentPosX = pos[0]
        positionComponent.currentPosY = pos[1]
        positionComponent.currentPosZ = pos[2]
        em.setPositionsComponent(npcid, positionComponent)
        const aiAction = new commonActions.GotoPoint(npcid, state, "FP_STAND_CITY_ANDRE")
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
        aiStateFunctions.spawnNpcByCoordinates(new undeadOrc.UndeadOrc(), 0, 0, 0,"NEWWORLD\\NEWWORLD");
    }
    if (command === "/masochist") {
        setInterval(revmp.attack.bind(revmp), 200, entity, entity);
    }
    if (command === "/e") {
        const angle = getPlayerAngle(entity)
        console.log("angle: " + angle)
    }
    if (command === "/a") {
        const focusid = revmp.getFocus(entity).focus
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
        const instance = Instances.warsword
        revmp.addItem(entity, instance, 1);
        revmp.setAttributes(entity, {strength: 100, oneHanded: 100})
        revmp.setHealth(entity, {current: 1600, max: 1600})
        revmp.addOverlay(entity, "Humans_1hST2.MDS")
        const attribute = revmp.getAttributes(entity)
        console.log("one handed"+ attribute.oneHanded)
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
        revmp.addItem(entity, Instances.eliteOrcSword, 1);
        revmp.equipItem(entity, Instances.eliteOrcSword)
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
