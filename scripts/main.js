"use strict";

const wolf = require("./scripts/aiEntities/npcs/wolf");
const funs = require("./scripts/aiStates/aiStateFunctions");
const state1 = require("./scripts/aiStates/aiStates");
let state = new state1.AIState();


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
});
revmp.on("chatCommand", (entity, msg) => {
    const words = msg.toLowerCase().split(' ');
    const command = words[0];
    console.log(words);
    if (command === "/spawn") {
        funs.SpawnNpc(state, new wolf.Wolf(), 0, 0, 0);
    }
});
