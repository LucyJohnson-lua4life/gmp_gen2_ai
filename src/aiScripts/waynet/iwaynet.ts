/**
 * Interface that represents the waynet. The waynet is a datastructure that connects nodes (waypoints) to create a
 * net on which the npc's can move along the edges (the paths/way).
 */
import {Quaternion, Vector3} from "three";

export interface IWaynet {
    waypoints: Map<string, Waypoint>;
    freepoints: Map<string, Freepoint>;
    getWayroute(start: string, end: string): Array<Waypoint>
    getNearestWaypoint(pos: Vector3): Waypoint|undefined
}

/**
 * The freepoint is a node that is independent from the waynet. However for finding the path to the freepoint
 * the waynet will often be consulted. E.g by finding a waypoint that is closest to the freepoint and then calculating
 * the path from from the start point to the closest waypoint. And from there to the freepoint.
 */
export interface Freepoint {
    fpName: string,
    pos: Vector3,
    rotation?: Quaternion
}

/**
 * Represents a node in the waynet. To find a path from point A to point B. 
 //TODO: think about summarizing x,y,z to an array, since you already alway work with all 3 values for passing a parameter e.g
 */
export interface Waypoint {
    wpName: string,
    pos: Vector3,
    rotation?: Quaternion
    otherWps: Array<string>
}


