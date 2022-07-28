import { Waypoint } from "../../src/aiScripts/waynet/iwaynet";
import * as waynet from "../../src/aiScripts/waynet/waynet";
import {Vector3} from "three";
test('Waynet should load freepoints correctly.', () => {
    const wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const fplist = wn.freepoints;
    expect(fplist.size).toBe(4)
    const testfp = fplist.get("FP_TEST1")
    expect(testfp?.fpName).toBe("FP_TEST1")
    expect(testfp?.pos).toStrictEqual(new Vector3(1000, 2000, -3000))
})


test('Waynet should load the waypoints correctly.', () => {
    const wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const testwp = wn.waypoints.get("WP_TEST1");
    expect(wn.waypoints.size).toBe(7)
    expect(testwp?.wpName).toBe("WP_TEST1")
    expect(testwp?.pos).toStrictEqual(new Vector3(1000, 2000, -3000))
    expect(testwp?.otherWps).toStrictEqual(["WP_TEST2", "WP_TEST3"])
})


test('Returns the right route from WP_TEST1 to WP_TEST7', () => {
    const wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const routes:Array<string> = wn.getWayroute("WP_TEST1","WP_TEST7").map(wp => wp.wpName);
    expect(routes).toStrictEqual(["WP_TEST1","WP_TEST2","WP_TEST6","WP_TEST7"]);
})

test('Returns the right route from WP_TEST1 to WP_TEST4', () => {
    const wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const routes:Array<string> = wn.getWayroute("WP_TEST1","WP_TEST4").map(wp => wp.wpName);
    expect(routes).toStrictEqual(["WP_TEST1","WP_TEST2","WP_TEST4"]);
})


test('Returns the right route from WP_TEST1 to WP_TEST5', () => {
    const wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    const routes:Array<string> = wn.getWayroute("WP_TEST1","WP_TEST5").map(wp => wp.wpName);
    expect(routes).toStrictEqual(["WP_TEST1","WP_TEST2","WP_TEST6","WP_TEST5"]);
})


test('Returns correctly the nearest waypoint', () => {
    const wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp", "./tests/waynet/test_with_whitespaces.fp")
    const nearestWp: Waypoint|undefined = wn?.getNearestWaypoint(new Vector3(2000, 3100, -4100))
    expect(nearestWp?.wpName).toStrictEqual("WP_TEST5");
})





