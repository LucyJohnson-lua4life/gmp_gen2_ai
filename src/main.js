"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wolf_1 = require("./aiEntities/npcs/wolf");
var aiStateFunctions_1 = require("./aiStates/aiStateFunctions");
var aiStates_1 = require("./aiStates/aiStates");
var state = new aiStates_1.AIState();
revmp.on("init", function () {
    revmp.createInstanceTemplate({
        type: revmp.InstanceType.World,
        id: "new_world",
        name: "New World",
        zen: "NEWWORLD\\NEWWORLD.ZEN",
        waypoint: "NW_CITY_HABOUR_02_B",
    });
    var world = revmp.createWorld("new_world");
    revmp.setTime(world, { hour: 15, minute: 0 });
});
revmp.on("chatCommand", function (entity, msg) {
    var words = msg.toLowerCase().split(' ');
    var command = words[0];
    console.log(words);
    if (command === "/spawn") {
        aiStateFunctions_1.SpawnNpc(state, new wolf_1.Wolf(), 100, 100, 100);
    }
});
