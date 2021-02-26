import { Wolf } from "./aiEntities/npcs/wolf";
import { SpawnNpc } from "./aiStates/aiStateFunctions";
import { AIState } from "./aiStates/aiStates";


let state:AIState = new AIState();
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
        SpawnNpc(state, new Wolf(), 100, 100, 100);
    }

});