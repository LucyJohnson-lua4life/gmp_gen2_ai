"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waynet = void 0;
const waynetReader = require("./waynetReader");
/**
 * Standard implementation of the waynet. Provides methods for path finding.
 */
class Waynet {
    constructor(waypointFile, freepointFile) {
        this.waypoints = this.toWaypointDict(waynetReader.readWaypoints(waypointFile));
        this.freepoints = waynetReader.readFreepoints(freepointFile);
    }
    /**
     * Returns the waypoints to visit (the route) to get from waypoint A to waypoint B.
     * @param start name of the start waypoint
     * @param end name of the end waypoint
     */
    getWayroute(start, end) {
        let routeNodes = this.getRouteNodes(this.waypoints[start], this.waypoints[end]);
        if (Object.keys(routeNodes).length === 0) {
            return [];
        }
        let currentWp = this.waypoints[end];
        let wayroute = [];
        wayroute.push(currentWp);
        while (currentWp.wpName !== start) {
            let lastCurrentWp = currentWp;
            currentWp = this.getNextMinAbsDistanceWaypoint(currentWp, routeNodes);
            if (typeof currentWp === 'undefined') {
                return [];
            }
            wayroute.push(currentWp);
            delete routeNodes[lastCurrentWp.wpName];
        }
        return wayroute.reverse();
    }
    getRouteNodes(start, end) {
        let nodesToVisit = {};
        let routeNodes = {};
        nodesToVisit[start.wpName] = this.createNodeWithWaypointData(start);
        while (Object.keys(nodesToVisit).length > 0) {
            let currentNode = this.popNodeWithMinAproximateAbsDistance(nodesToVisit);
            if (typeof currentNode === 'undefined') {
                return {};
            }
            if (currentNode.wpName === end.wpName) {
                routeNodes[currentNode.wpName] = currentNode;
                return routeNodes;
            }
            this.expandNodesToVisit(nodesToVisit, routeNodes, currentNode, end);
            routeNodes[currentNode.wpName] = currentNode;
        }
        return {};
    }
    createNodeWithWaypointData(waypoint) {
        let node = {
            x: waypoint.x,
            y: waypoint.y,
            z: waypoint.z,
            rotX: waypoint.rotX,
            rotY: waypoint.rotY,
            wpName: waypoint.wpName,
            otherWps: waypoint.otherWps,
            distanceToStart: 0,
            distanceToEnd: 0,
            aproximateAbsDistance: 0
        };
        return node;
    }
    expandNodesToVisit(nodesToVisit, routeNodes, currentNode, end) {
        if (currentNode.otherWps.length == 0) {
            return;
        }
        currentNode.otherWps.forEach(neighborWpName => {
            if (typeof routeNodes[neighborWpName] === 'undefined') {
                let neighborWp = this.waypoints[neighborWpName];
                let distanceToNeighbor = this.getDistance(currentNode.x, currentNode.y, currentNode.z, neighborWp.x, neighborWp.y, neighborWp.z);
                let distNodeToStart = currentNode.distanceToStart + distanceToNeighbor;
                let neighborNode = nodesToVisit[neighborWpName];
                if (!(typeof neighborNode !== 'undefined' && distNodeToStart > neighborNode.distanceToStart)) {
                    /*aproximate means, that we are measuring the distance straight between point a to b, without measuring the distances of the nodes in between
                      measuring the aproximate absolute distance is enough of an heuristic for us to decide which node to chose next*/
                    let aproximateDistNodeToEnd = this.getDistance(end.x, end.y, end.z, neighborWp.x, neighborWp.y, neighborWp.z);
                    let aproximateAbsDistance = distNodeToStart + aproximateDistNodeToEnd;
                    let newNodeToVisit = this.createNodeWithWaypointData(neighborWp);
                    newNodeToVisit.distanceToStart = distNodeToStart;
                    newNodeToVisit.aproximateAbsDistance = aproximateAbsDistance;
                    nodesToVisit[neighborWpName] = newNodeToVisit;
                }
            }
        });
    }
    getNextMinAbsDistanceWaypoint(currentWp, routeNodes) {
        let smallestDistance = 99999999;
        let nextMinWaypoint;
        currentWp.otherWps.forEach(neighborWpName => {
            let neighborNode = routeNodes[neighborWpName];
            if (typeof neighborNode !== 'undefined') {
                let distance = this.getDistance(currentWp.x, currentWp.y, currentWp.z, neighborNode.x, neighborNode.y, neighborNode.z);
                let absoluteDistance = routeNodes[currentWp.wpName].distanceToEnd + distance + routeNodes[neighborWpName].distanceToStart;
                if (smallestDistance > absoluteDistance) {
                    smallestDistance = absoluteDistance;
                    nextMinWaypoint = this.waypoints[neighborNode.wpName];
                    routeNodes[neighborWpName].distanceToEnd = routeNodes[currentWp.wpName].distanceToEnd + distance;
                }
            }
        });
        return nextMinWaypoint;
    }
    popNodeWithMinAproximateAbsDistance(nodesToVisit) {
        let lowestDistance = 99999999;
        let closestWpToGoal;
        let closestNodeToGoal;
        Object.keys(nodesToVisit).forEach(wpName => {
            if (nodesToVisit[wpName].aproximateAbsDistance < lowestDistance) {
                lowestDistance = nodesToVisit[wpName].aproximateAbsDistance;
                closestWpToGoal = wpName;
                closestNodeToGoal = nodesToVisit[wpName];
            }
        });
        if (typeof closestWpToGoal !== 'undefined') {
            delete nodesToVisit[closestWpToGoal];
        }
        return closestNodeToGoal;
    }
    getDistance(x1, y1, z1, x2, y2, z2) {
        let x = x1 - x2;
        let y = y1 - y2;
        let z = z1 - z2;
        return Math.sqrt(x * x + y * y + z * z);
    }
    toWaypointDict(waypoints) {
        const reducer = (wpDict, wp) => {
            wpDict[wp.wpName] = wp;
            return wpDict;
        };
        return waypoints.reduce(reducer, {});
    }
}
exports.Waynet = Waynet;
