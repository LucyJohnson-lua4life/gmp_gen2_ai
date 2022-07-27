import * as fs from 'fs';
import {Freepoint, Waypoint} from './iwaynet';
import {Quaternion, Vector3} from "three";

function isBlank(string: string) {
    return string.length == 0 || !string.trim()
}

function readFileLines(path: string) {
    return fs.readFileSync(path, 'utf-8')
        .split('\n')
        .filter(Boolean)
        .filter(line => !isBlank(line))
        .map(line => line.split(';'));
}

export function readFreepoints(path: string): Map<string, Freepoint> {
    return new Map(readFileLines(path)
        .map(freepoint => [freepoint[0], {
            fpName: freepoint[0],
            pos: new Vector3(Number(freepoint[1]), Number(freepoint[2]), Number(freepoint[3]))
        }])
    );
}

export function readWaypoints(path: string): Map<string, Waypoint> {
    return new Map(readFileLines(path)
        .map(waypoint => [waypoint[0], {
            wpName: waypoint[0],
            pos: new Vector3(Number(waypoint[1]), Number(waypoint[2]), Number(waypoint[3])),
            otherWps: waypoint.slice(6).map(wpName => wpName.replace(/\r?\n|\r/, ""))
        }])
    );
}

export function readWaypointsFromRevmp(waynet: revmp.Waynet): Map<string, Waypoint> {
    return new Map(waynet.waypoints.map(waypointId => {
        const name = revmp.getName(waypointId).name;
        return [name, {
            wpName: name,
            pos: new Vector3(...revmp.getPosition(waypointId).position),
            rotation: new Quaternion(...revmp.getRotation(waypointId).rotation),
            otherWps: revmp.getWaypoint(waypointId).connections.map(wpId => revmp.getName(wpId).name)
        }];
    }));
}

export function readFreepointsFromRevmp(waynet: revmp.Waynet): Map<string, Freepoint> {
    return new Map(waynet.freepoints.map(freepointId => {
        const name = revmp.getName(freepointId).name;
        return [name, {
            fpName: name,
            pos: new Vector3(...revmp.getPosition(freepointId).position),
            rotation: new Quaternion(...revmp.getRotation(freepointId).rotation)
        }]
    }));
} 