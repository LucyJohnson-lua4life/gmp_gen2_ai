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
        rotY: Number(freepoint[5])
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
        rotY: Number(waypoint[5]),
        otherWps: waypoint.slice(6).map(wpName => wpName.replace(/\r?\n|\r/, ""))
    }))
}