"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWaypoints = exports.readFreepoints = void 0;
var fs = require("fs");
function isBlank(string) {
    return string.length == 0 || !string.trim();
}
function readFileLines(path) {
    return fs.readFileSync(path, 'utf-8')
        .split('\n')
        .filter(Boolean);
}
function readFreepoints(path) {
    return readFileLines(path).filter(function (line) { return !isBlank(line); }).map(function (line) { return line.split(';'); }).map(function (freepoint) {
        return ({
            fpName: freepoint[0],
            x: Number(freepoint[1]),
            y: Number(freepoint[2]),
            z: Number(freepoint[3]),
            rotX: Number(freepoint[4]),
            rotY: Number(freepoint[5])
        });
    });
}
exports.readFreepoints = readFreepoints;
function readWaypoints(path) {
    return readFileLines(path).filter(function (line) { return !isBlank(line); }).map(function (line) { return line.split(';'); }).map(function (waypoint) {
        return ({
            wpName: waypoint[0],
            x: Number(waypoint[1]),
            y: Number(waypoint[2]),
            z: Number(waypoint[3]),
            rotX: Number(waypoint[4]),
            rotY: Number(waypoint[5]),
            otherWps: waypoint.slice(6).map(function (wpName) { return wpName.replace(/\r?\n|\r/, ""); })
        });
    });
}
exports.readWaypoints = readWaypoints;
