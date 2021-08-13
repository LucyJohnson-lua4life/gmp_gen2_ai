"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waynet = void 0;
const waynetReader = require("./waynetReader");
/**
 * Standard implementation of the waynet. Provides methods for path finding.
 */
class Waynet {
    constructor(waypointFile, freepointFile) {
        this.waypoints = waynetReader.readWaypointsMap(waypointFile);
        this.freepoints = waynetReader.readFreepoints(freepointFile);
    }
    /**
     * Returns the waypoints to visit (the route) to get from waypoint A to waypoint B.
     * @param start name of the start waypoint
     * @param end name of the end waypoint
     */
    getWayroute(start, end) {
        let unorderedRouteNodes = this.getUnorderedRouteNodes(this.waypoints.get(start), this.waypoints.get(end));
        if (unorderedRouteNodes.size === 0) {
            return new Array();
        }
        return this.getNodeRoutesOrderedByMinNetDistance(unorderedRouteNodes, start, end);
    }
    /**
     * Returns the nearest waypoint for the given x,y,z coordinates
     */
    getNearestWaypoint(x, y, z) {
        let shortestDistance = 999999999;
        let nearestWaypoint = this.waypoints[0];
        this.waypoints.forEach(wp => {
            let tmpDist = this.getDistance(x, y, z, wp.x, wp.y, wp.z);
            if (tmpDist < shortestDistance) {
                shortestDistance = tmpDist;
                nearestWaypoint = wp;
            }
        });
        return nearestWaypoint;
    }
    getNodeRoutesOrderedByMinNetDistance(routeNodes, start, end) {
        let currentWp = this.waypoints.get(end);
        let wayroute = [];
        wayroute.push(currentWp);
        while (currentWp.wpName !== start) {
            let lastCurrentWp = currentWp;
            currentWp = this.getNeighborWithMinNetDistance(currentWp, routeNodes);
            if (typeof currentWp === 'undefined') {
                return [];
            }
            wayroute.push(currentWp);
            routeNodes.delete(lastCurrentWp.wpName);
        }
        return wayroute.reverse();
    }
    getUnorderedRouteNodes(start, end) {
        let nodesToVisit = new Map();
        let routeNodes = new Map();
        nodesToVisit.set(start.wpName, this.createNodeInfo(start));
        while (nodesToVisit.size > 0) {
            let currentNode = this.popNodeWithMinFlightDistance(nodesToVisit);
            if (typeof currentNode === 'undefined') {
                routeNodes = new Map();
                break;
            }
            if (currentNode.wpName === end.wpName) {
                routeNodes.set(currentNode.wpName, currentNode);
                break;
            }
            let nextNodesToVisit = this.getNextNodesToVisit(nodesToVisit, routeNodes, currentNode, end);
            // merge current nodes and nodes to visit
            nodesToVisit = new Map([...Array.from(nodesToVisit.entries()), ...Array.from(nextNodesToVisit.entries())]);
            routeNodes.set(currentNode.wpName, currentNode);
        }
        return routeNodes;
    }
    createNodeInfo(waypoint) {
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
    getNextNodesToVisit(nodesToVisit, routeNodes, currentNode, end) {
        if (currentNode.otherWps.length == 0) {
            return;
        }
        let result = new Map();
        currentNode.otherWps.forEach(neighborWpName => {
            if (typeof routeNodes.get(neighborWpName) === 'undefined') {
                let neighborWp = this.waypoints.get(neighborWpName);
                let distanceToNeighbor = this.getDistance(currentNode.x, currentNode.y, currentNode.z, neighborWp.x, neighborWp.y, neighborWp.z);
                let distNodeToStart = currentNode.distanceToStart + distanceToNeighbor;
                let neighborNode = nodesToVisit.get(neighborWpName);
                if (!this.neighborDistanceToStartIsGreater(neighborNode, distNodeToStart)) {
                    /*aproximate means, that we are measuring the distance straight between point a to b, without measuring the distances of the nodes in between
                      measuring the aproximate absolute distance is enough of an heuristic for us to decide which node to chose next*/
                    let aproximateDistNodeToEnd = this.getDistance(end.x, end.y, end.z, neighborWp.x, neighborWp.y, neighborWp.z);
                    let aproximateAbsDistance = distNodeToStart + aproximateDistNodeToEnd;
                    let newNodeToVisit = this.createNodeInfo(neighborWp);
                    newNodeToVisit.distanceToStart = distNodeToStart;
                    newNodeToVisit.aproximateAbsDistance = aproximateAbsDistance;
                    result.set(neighborWpName, newNodeToVisit);
                }
            }
        });
        return result;
    }
    neighborDistanceToStartIsGreater(neighborNode, distNodeToStart) {
        return typeof neighborNode !== 'undefined' && distNodeToStart > neighborNode.distanceToStart;
    }
    getNeighborWithMinNetDistance(currentWp, routeNodes) {
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
    popNodeWithMinFlightDistance(nodesToVisit) {
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
        return Math.sqrt((x * x) + (y * y) + (z * z));
    }
}
exports.Waynet = Waynet;
