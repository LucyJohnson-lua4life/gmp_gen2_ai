import * as fs from 'fs';
import {Freepoint, Waypoint} from './iwaynet';

function isBlank(string: string) {
    return string.length == 0 || !string.trim()
}

function readFileLines(path: string) {
    return fs.readFileSync(path, 'utf-8')
        .split('\n')
        .filter(Boolean);
}

export function readFreepoints(path: string): Array<Freepoint> {
    return readFileLines(path).filter(line => !isBlank(line)).map(line => line.split(';')).map(freepoint =>
    ({
        fpName: freepoint[0],
        x: Number(freepoint[1]),
        y: Number(freepoint[2]),
        z: Number(freepoint[3]),
        rotX: Number(freepoint[4]),
        rotZ: Number(freepoint[5])
    }));
}

export function readWaypoints(path: string): Array<Waypoint> {
    return readFileLines(path).filter(line => !isBlank(line)).map(line => line.split(';')).map(waypoint =>
    ({
        wpName: waypoint[0],
        x: Number(waypoint[1]),
        y: Number(waypoint[2]),
        z: Number(waypoint[3]),
        rotX: Number(waypoint[4]),
        rotZ: Number(waypoint[5]),
        otherWps: waypoint.slice(6).map(wpName => wpName.replace(/\r?\n|\r/, ""))
    }))
}



export function readWaypointsMap(path: string): Map<string,Waypoint> {
    const waypointsMap = new Map();
    readWaypoints(path).forEach(element => waypointsMap.set(element.wpName, element))
    return waypointsMap;
}


export function readWaypointsMapFromRevmp(waynet: revmp.Waynet): Map<string, Waypoint> {
    const waypointsMap = new Map<string, Waypoint>();

    waynet.waypoints.forEach(waypointId => {
        const name = revmp.getName(waypointId).name
        const position = revmp.getPosition(waypointId).position
        const rotation = revmp.getRotation(waypointId).rotation
        const otherWaypoints: Array<string> = revmp.getWaypoint(waypointId).connections.map(wpId => revmp.getName(wpId).name)
        waypointsMap.set(name, {
            wpName: name,
            x: position[0],
            y: position[1],
            z: position[2],
            rotX: 0,
            rotZ: 0,
            rotation: rotation,
            otherWps: otherWaypoints
        })
    })
    return waypointsMap;
}

export function readFreepointsFromRevmp(waynet: revmp.Waynet): Array<Freepoint> {
    return waynet.freepoints.map(freepointId => {
        const name = revmp.getName(freepointId).name
        const position = revmp.getPosition(freepointId).position
        const rotation = revmp.getRotation(freepointId).rotation
        return { fpName: name, x: position[0], y: position[1], z: position[2], rotX: 0, rotZ: 0, rotation: rotation }
    })
} 