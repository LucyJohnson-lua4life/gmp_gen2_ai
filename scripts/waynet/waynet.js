"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waynet = void 0;
const waynetReader = require("./waynetReader");
/**
 * Standard implementation of the waynet. Provides methods for path finding.
 */
class Waynet {
    constructor(waypointFile, freepointFile) {
        this.waypoints = this.toWaypointMap(waynetReader.readWaypoints(waypointFile));
        this.freepoints = waynetReader.readFreepoints(freepointFile);
    }
    /**
     * Returns the waypoints to visit (the route) to get from waypoint A to waypoint B.
     * @param start name of the start waypoint
     * @param end name of the end waypoint
     */
    getWayroute(start, end) {
        let routeNodes = this.getRouteNodes(this.waypoints.get(start), this.waypoints.get(end));
        if (routeNodes.size === 0) {
            return [];
        }
        let currentWp = this.waypoints.get(end);
        let wayroute = [];
        wayroute.push(currentWp);
        while (currentWp.wpName !== start) {
            let lastCurrentWp = currentWp;
            currentWp = this.getNextMinAbsDistanceWaypoint(currentWp, routeNodes);
            if (typeof currentWp === 'undefined') {
                return [];
            }
            wayroute.push(currentWp);
            routeNodes.delete(lastCurrentWp.wpName);
        }
        return wayroute.reverse();
    }
    getRouteNodes(start, end) {
        let nodesToVisit = new Map();
        let routeNodes = new Map();
        nodesToVisit.set(start.wpName, this.createNodeWithWaypointData(start));
        while (nodesToVisit.size > 0) {
            let currentNode = this.popNodeWithMinAproximateAbsDistance(nodesToVisit);
            if (typeof currentNode === 'undefined') {
                return new Map();
            }
            if (currentNode.wpName === end.wpName) {
                routeNodes.set(currentNode.wpName, currentNode);
                return routeNodes;
            }
            this.expandNodesToVisit(nodesToVisit, routeNodes, currentNode, end);
            routeNodes.set(currentNode.wpName, currentNode);
        }
        return new Map();
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
            if (typeof routeNodes.get(neighborWpName) === 'undefined') {
                let neighborWp = this.waypoints.get(neighborWpName);
                let distanceToNeighbor = this.getDistance(currentNode.x, currentNode.y, currentNode.z, neighborWp.x, neighborWp.y, neighborWp.z);
                let distNodeToStart = currentNode.distanceToStart + distanceToNeighbor;
                let neighborNode = nodesToVisit.get(neighborWpName);
                if (!(typeof neighborNode !== 'undefined' && distNodeToStart > neighborNode.distanceToStart)) {
                    /*aproximate means, that we are measuring the distance straight between point a to b, without measuring the distances of the nodes in between
                      measuring the aproximate absolute distance is enough of an heuristic for us to decide which node to chose next*/
                    let aproximateDistNodeToEnd = this.getDistance(end.x, end.y, end.z, neighborWp.x, neighborWp.y, neighborWp.z);
                    let aproximateAbsDistance = distNodeToStart + aproximateDistNodeToEnd;
                    let newNodeToVisit = this.createNodeWithWaypointData(neighborWp);
                    newNodeToVisit.distanceToStart = distNodeToStart;
                    newNodeToVisit.aproximateAbsDistance = aproximateAbsDistance;
                    nodesToVisit.set(neighborWpName, newNodeToVisit);
                }
            }
        });
    }
    getNextMinAbsDistanceWaypoint(currentWp, routeNodes) {
        let smallestDistance = 99999999;
        let nextMinWaypoint;
        currentWp.otherWps.forEach(neighborWpName => {
            let neighborNode = routeNodes.get(neighborWpName);
            if (typeof neighborNode !== 'undefined') {
                let distance = this.getDistance(currentWp.x, currentWp.y, currentWp.z, neighborNode.x, neighborNode.y, neighborNode.z);
                let absoluteDistance = routeNodes.get(currentWp.wpName).distanceToEnd + distance + routeNodes.get(neighborWpName).distanceToStart;
                if (smallestDistance > absoluteDistance) {
                    smallestDistance = absoluteDistance;
                    nextMinWaypoint = this.waypoints.get(neighborNode.wpName);
                    routeNodes.get(neighborWpName).distanceToEnd = routeNodes.get(currentWp.wpName).distanceToEnd + distance;
                }
            }
        });
        return nextMinWaypoint;
    }
    popNodeWithMinAproximateAbsDistance(nodesToVisit) {
        let lowestDistance = 99999999;
        let closestWpToGoal;
        let closestNodeToGoal;
        Array.from(nodesToVisit.keys()).forEach(wpName => {
            if (nodesToVisit.get(wpName).aproximateAbsDistance < lowestDistance) {
                lowestDistance = nodesToVisit.get(wpName).aproximateAbsDistance;
                closestWpToGoal = wpName;
                closestNodeToGoal = nodesToVisit.get(wpName);
            }
        });
        if (typeof closestWpToGoal !== 'undefined') {
            nodesToVisit.delete(closestWpToGoal);
        }
        return closestNodeToGoal;
    }
    getDistance(x1, y1, z1, x2, y2, z2) {
        let x = x1 - x2;
        let y = y1 - y2;
        let z = z1 - z2;
        return Math.sqrt(x * x + y * y + z * z);
    }
    toWaypointMap(waypoints) {
        const reducer = (wpMap, wp) => {
            wpMap.set(wp.wpName, wp);
            return wpMap;
        };
        return waypoints.reduce(reducer, new Map());
    }
}
exports.Waynet = Waynet;
