"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waynet = void 0;
var waynetReader = require("./waynetReader");
/**
 * Standard implementation of the waynet. Provides methods for path finding.
 */
var Waynet = /** @class */ (function () {
    function Waynet(waypointFile, freepointFile) {
        this.waypoints = this.toWaypointDict(waynetReader.readWaypoints(waypointFile));
        this.freepoints = waynetReader.readFreepoints(freepointFile);
    }
    /**
     * Returns the waypoints to visit (the route) to get from waypoint A to waypoint B.
     * @param start name of the start waypoint
     * @param end name of the end waypoint
     */
    Waynet.prototype.getWayroute = function (start, end) {
        var routeNodes = this.getRouteNodes(this.waypoints[start], this.waypoints[end]);
        if (Object.keys(routeNodes).length === 0) {
            return [];
        }
        var currentWp = this.waypoints[end];
        var wayroute = [];
        wayroute.push(currentWp);
        while (currentWp.wpName !== start) {
            var lastCurrentWp = currentWp;
            currentWp = this.getNextMinAbsDistanceWaypoint(currentWp, routeNodes);
            if (typeof currentWp === 'undefined') {
                return [];
            }
            wayroute.push(currentWp);
            delete routeNodes[lastCurrentWp.wpName];
        }
        return wayroute.reverse();
    };
    Waynet.prototype.getRouteNodes = function (start, end) {
        var nodesToVisit = {};
        var routeNodes = {};
        nodesToVisit[start.wpName] = this.createNodeWithWaypointData(start);
        while (Object.keys(nodesToVisit).length > 0) {
            var currentNode = this.popNodeWithMinAproximateAbsDistance(nodesToVisit);
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
    };
    Waynet.prototype.createNodeWithWaypointData = function (waypoint) {
        var node = {
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
    };
    Waynet.prototype.expandNodesToVisit = function (nodesToVisit, routeNodes, currentNode, end) {
        var _this = this;
        if (currentNode.otherWps.length == 0) {
            return;
        }
        currentNode.otherWps.forEach(function (neighborWpName) {
            if (typeof routeNodes[neighborWpName] === 'undefined') {
                var neighborWp = _this.waypoints[neighborWpName];
                var distanceToNeighbor = _this.getDistance(currentNode.x, currentNode.y, currentNode.z, neighborWp.x, neighborWp.y, neighborWp.z);
                var distNodeToStart = currentNode.distanceToStart + distanceToNeighbor;
                var neighborNode = nodesToVisit[neighborWpName];
                if (!(typeof neighborNode !== 'undefined' && distNodeToStart > neighborNode.distanceToStart)) {
                    /*aproximate means, that we are measuring the distance straight between point a to b, without measuring the distances of the nodes in between
                      measuring the aproximate absolute distance is enough of an heuristic for us to decide which node to chose next*/
                    var aproximateDistNodeToEnd = _this.getDistance(end.x, end.y, end.z, neighborWp.x, neighborWp.y, neighborWp.z);
                    var aproximateAbsDistance = distNodeToStart + aproximateDistNodeToEnd;
                    var newNodeToVisit = _this.createNodeWithWaypointData(neighborWp);
                    newNodeToVisit.distanceToStart = distNodeToStart;
                    newNodeToVisit.aproximateAbsDistance = aproximateAbsDistance;
                    nodesToVisit[neighborWpName] = newNodeToVisit;
                }
            }
        });
    };
    Waynet.prototype.getNextMinAbsDistanceWaypoint = function (currentWp, routeNodes) {
        var _this = this;
        var smallestDistance = 99999999;
        var nextMinWaypoint;
        currentWp.otherWps.forEach(function (neighborWpName) {
            var neighborNode = routeNodes[neighborWpName];
            if (typeof neighborNode !== 'undefined') {
                var distance = _this.getDistance(currentWp.x, currentWp.y, currentWp.z, neighborNode.x, neighborNode.y, neighborNode.z);
                var absoluteDistance = routeNodes[currentWp.wpName].distanceToEnd + distance + routeNodes[neighborWpName].distanceToStart;
                if (smallestDistance > absoluteDistance) {
                    smallestDistance = absoluteDistance;
                    nextMinWaypoint = _this.waypoints[neighborNode.wpName];
                    routeNodes[neighborWpName].distanceToEnd = routeNodes[currentWp.wpName].distanceToEnd + distance;
                }
            }
        });
        return nextMinWaypoint;
    };
    Waynet.prototype.popNodeWithMinAproximateAbsDistance = function (nodesToVisit) {
        var lowestDistance = 99999999;
        var closestWpToGoal;
        var closestNodeToGoal;
        Object.keys(nodesToVisit).forEach(function (wpName) {
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
    };
    Waynet.prototype.getDistance = function (x1, y1, z1, x2, y2, z2) {
        var x = x1 - x2;
        var y = y1 - y2;
        var z = z1 - z2;
        return Math.sqrt(x * x + y * y + z * z);
    };
    Waynet.prototype.toWaypointDict = function (waypoints) {
        var reducer = function (wpDict, wp) {
            wpDict[wp.wpName] = wp;
            return wpDict;
        };
        return waypoints.reduce(reducer, {});
    };
    return Waynet;
}());
exports.Waynet = Waynet;
