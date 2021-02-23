import * as waynet from "../../src/waynet/waynet";
test('Waynet should load freepoints correctly.', () => {
    
    var wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    var fplist = wn.freepoints;
    
    var testfp = fplist[0]
    expect(fplist.length).toBe(4)
    expect(testfp.fpName).toBe("FP_TEST1")
    expect(testfp.x).toBe(1000)
    expect(testfp.y).toBe(2000)
    expect(testfp.z).toBe(-3000)
    expect(testfp.rotX).toBe(1)
    expect(testfp.rotY).toBe(0)
})


test('Waynet should load the waypoints correctly.', () => {
    var wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    var testwp = wn.waypoints["WP_TEST1"]
    expect(Object.keys(wn.waypoints).length).toBe(7)
    expect(testwp.wpName).toBe("WP_TEST1")
    expect(testwp.x).toBe(1000)
    expect(testwp.y).toBe(2000)
    expect(testwp.z).toBe(-3000)
    expect(testwp.rotX).toBe(1)
    expect(testwp.rotY).toBe(0)
    expect(testwp.otherWps).toStrictEqual(["WP_TEST2", "WP_TEST3"])
})


test('Returns the right route from WP_TEST1 to WP_TEST7', () => {
    var wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    var routes:Array<string> = wn.getWayroute("WP_TEST1","WP_TEST7").map(wp => wp.wpName);
    expect(routes).toStrictEqual(["WP_TEST1","WP_TEST2","WP_TEST6","WP_TEST7"]);
})

test('Returns the right route from WP_TEST1 to WP_TEST4', () => {
    var wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    var routes:Array<string> = wn.getWayroute("WP_TEST1","WP_TEST4").map(wp => wp.wpName);
    expect(routes).toStrictEqual(["WP_TEST1","WP_TEST2","WP_TEST4"]);
})


test('Returns the right route from WP_TEST1 to WP_TEST5', () => {
    var wn = new waynet.Waynet("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
    var routes:Array<string> = wn.getWayroute("WP_TEST1","WP_TEST5").map(wp => wp.wpName);
    expect(routes).toStrictEqual(["WP_TEST1","WP_TEST2","WP_TEST6","WP_TEST5"]);
})





