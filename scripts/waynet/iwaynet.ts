/**
 * Interface that represents the waynet. The waynet is a datastructure that connects nodes (waypoints) to create a
 * net on which the npc's can move along the edges (the paths/way).
 */
export interface IWaynet {
    waypoints: Map<String, Waypoint>,
    freepoints: Array<Freepoint>
    getWayroute(start: string, end: string): Array<Waypoint>
}

/**
 * The freepoint is a node that is independent from the waynet. However for finding the path to the freepoint
 * the waynet will often be consulted. E.g by finding a waypoint that is closest to the freepoint and then calculating
 * the path from from the start point to the closest waypoint. And from there to the freepoint.
 */
export interface Freepoint {
    fpName: string,
    x: number,
    y: number,
    z: number,
    rotX: number,
    rotY: number
}

/**
 * Represents a node in the waynet. To find a path from point A to point B. 
 */
export interface Waypoint {
    wpName: string,
    x: number,
    y: number,
    z: number,
    rotX: number,
    rotY: number
    otherWps: Array<string>
}


