export interface IWaynet {
    waypoints: WaypointDict,
    freepoints: Array<Freepoint>
    getWayroute(start: string, end: string): Array<Waypoint>
}

export interface Freepoint {
    fpName: string,
    x: number,
    y: number,
    z: number,
    rotX: number,
    rotY: number
}

export interface Waypoint {
    wpName: string,
    x: number,
    y: number,
    z: number,
    rotX: number,
    rotY: number
    otherWps: Array<string>
}

export interface WaypointDict {
    [details: string]: Waypoint;
}
