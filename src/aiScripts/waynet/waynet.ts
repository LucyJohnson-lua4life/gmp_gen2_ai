import * as waynetReader from './waynetReader';
import {Freepoint, IWaynet, Waypoint} from './iwaynet';
import {Vector3} from "three";

/**
 * Represents a node in the waynet. It contains additional information about distances to other
 * nodes in the waynet that are necessary for path finding.
 * @interface NodeInfo
 * @field waypoint: represents the concrete waypoint of the current node
 * @field distanceToStart: distance from the current node to the start, summing up the distances of the nodes in between
 * @field distanceToEnd: distance from the current node to the end, summing up the distances of the nodes in between
 * @field aproximateAbsDistance: an aproximate absolute distance summing up 'distanceToStart' + the flight distance between the current node and the end node (NOT considering the distances of the nodes in between)
 */
interface NodeInfo extends Waypoint {
    distanceToStart: number;
    distanceToEnd: number;
    aproximateAbsDistance: number;
}

/**
 * Standard implementation of the waynet. Provides methods for path finding.
 */
export class Waynet implements IWaynet {
    waypoints: Map<string, Waypoint>;
    freepoints: Map<string, Freepoint>;

    constructor(waypointFile: string, freepointFile: string, waynet?: revmp.Waynet) {
        if (typeof waynet !== 'undefined') {
            this.waypoints = waynetReader.readWaypointsFromRevmp(waynet)
            this.freepoints = waynetReader.readFreepointsFromRevmp(waynet)
        }
        else {
            this.waypoints = waynetReader.readWaypoints(waypointFile);
            this.freepoints = waynetReader.readFreepoints(freepointFile);
        }
    }

    /**
     * Returns the waypoints to visit (the route) to get from waypoint A to waypoint B.
     * @param start name of the start waypoint
     * @param end name of the end waypoint
     */
    public getWayroute(start: string, end: string): Array<Waypoint> {
        const startWaypoint: Waypoint | undefined = this.waypoints.get(start);
        const endWaypoint: Waypoint | undefined = this.waypoints.get(end);
        let unorderedRouteNodes: Map<string, NodeInfo> | undefined = undefined;
        if (typeof startWaypoint !== 'undefined' && typeof endWaypoint !== 'undefined') {
            unorderedRouteNodes = this.getUnorderedRouteNodes(startWaypoint, endWaypoint);
            if(typeof unorderedRouteNodes !== 'undefined'){
                return this.getNodeRoutesOrderedByMinNetDistance(unorderedRouteNodes, start, end)
            }
        }

        return []
    }

    /**
     * Returns the nearest waypoint for the given x,y,z coordinates
     */
    public getNearestWaypoint(pos: Vector3): Waypoint | undefined {
        let shortestDistance = 999999999
        let nearestWaypoint: Waypoint | undefined;
        this.waypoints.forEach(wp => {
            const tmpDist = wp.pos.distanceTo(pos)

            if (tmpDist < shortestDistance) {
                shortestDistance = tmpDist
                nearestWaypoint = wp
            }
        })
        return nearestWaypoint
    }

    private getNodeRoutesOrderedByMinNetDistance(routeNodes: Map<string, NodeInfo>, start: string, end: string): Array<Waypoint> {
        let currentWp: Waypoint | undefined = this.waypoints.get(end);
        const wayroute = []
        if (typeof currentWp !== 'undefined') {
            wayroute.push(currentWp)
            while (currentWp.wpName !== start) {
                const lastCurrentWp = currentWp;
                currentWp = this.getNeighborWithMinNetDistance(currentWp, routeNodes);

                if (typeof currentWp === 'undefined') {
                    return []
                }

                wayroute.push(currentWp);
                routeNodes.delete(lastCurrentWp.wpName);
            }
        }
        return wayroute.reverse();
    }

    private getUnorderedRouteNodes(start: Waypoint, end: Waypoint): Map<string, NodeInfo> {
        let nodesToVisit: Map<string, NodeInfo> = new Map();
        let routeNodes: Map<string, NodeInfo> = new Map();
        nodesToVisit.set(start.wpName, this.createNodeInfo(start));

        while (nodesToVisit.size > 0) {
            const currentNode: NodeInfo | undefined = this.popNodeWithMinFlightDistance(nodesToVisit);
            if (typeof currentNode === 'undefined') {
                routeNodes = new Map();
                break;
            }

            if (currentNode.wpName === end.wpName) {
                routeNodes.set(currentNode.wpName, currentNode);
                break;
            }
            const nextNodesToVisit: Map<string, NodeInfo> = this.getNextNodesToVisit(nodesToVisit, routeNodes, currentNode, end);
            // merge current nodes and nodes to visit
            nodesToVisit = new Map([...Array.from(nodesToVisit.entries()), ...Array.from(nextNodesToVisit.entries())]);
            routeNodes.set(currentNode.wpName, currentNode);
        }
        return routeNodes
    }

    private createNodeInfo(waypoint: Waypoint): NodeInfo {
        return {
            pos: waypoint.pos,
            wpName: waypoint.wpName,
            otherWps: waypoint.otherWps,
            distanceToStart: 0,
            distanceToEnd: 0,
            aproximateAbsDistance: 0
        };
    }

    private getNextNodesToVisit(nodesToVisit: Map<string, NodeInfo>, routeNodes: Map<string, NodeInfo>, currentNode: NodeInfo, end: Waypoint): Map<string, NodeInfo> {
        if (currentNode.otherWps.length == 0) {
            return routeNodes;
        }
        const result: Map<string, NodeInfo> = new Map();

        currentNode.otherWps.forEach(neighborWpName => {
            const neighborWp = this.waypoints.get(neighborWpName);
            if (typeof routeNodes.get(neighborWpName) === 'undefined' && typeof neighborWp !== 'undefined') {
                const neighborNode:NodeInfo|undefined = nodesToVisit.get(neighborWpName);
                const distanceToNeighbor = currentNode.pos.distanceTo(neighborWp.pos);
                const distNodeToStart = currentNode.distanceToStart + distanceToNeighbor;
                if (!this.neighborDistanceToStartIsGreater(neighborNode, distNodeToStart)) {
                    /*aproximate means, that we are measuring the distance straight between point a to b, without measuring the distances of the nodes in between
                      measuring the aproximate absolute distance is enough of an heuristic for us to decide which node to chose next*/
                    const aproximateDistNodeToEnd = end.pos.distanceTo(neighborWp.pos);
                    const aproximateAbsDistance = distNodeToStart + aproximateDistNodeToEnd;
                    const newNodeToVisit = this.createNodeInfo(neighborWp);
                    newNodeToVisit.distanceToStart = distNodeToStart;
                    newNodeToVisit.aproximateAbsDistance = aproximateAbsDistance;
                    result.set(neighborWpName, newNodeToVisit);
                }
            }
        })
        return result
    }

    private neighborDistanceToStartIsGreater(neighborNode: NodeInfo|undefined, distNodeToStart: number) {
        return typeof neighborNode !== 'undefined' && distNodeToStart > neighborNode.distanceToStart;
    }

    private getNeighborWithMinNetDistance(currentWp: Waypoint, routeNodes: Map<string, NodeInfo>): Waypoint | undefined {
        let smallestDistance = 99999999;
        let nextMinWaypoint: Waypoint | undefined;

        currentWp.otherWps.forEach(neighborWpName => {
            const neighborNode: NodeInfo|undefined = routeNodes.get(neighborWpName);
            if (typeof neighborNode !== 'undefined') {
                const distance = currentWp.pos.distanceTo(neighborNode.pos)
                const currentRouteNode = routeNodes.get(currentWp.wpName)
                const neighborRouteNode = routeNodes.get(neighborWpName)

                if(typeof currentRouteNode !== 'undefined' && typeof neighborRouteNode !== 'undefined'){
                    const absoluteDistance = currentRouteNode.distanceToEnd + distance + neighborRouteNode.distanceToStart
                    if (smallestDistance > absoluteDistance) {
                        smallestDistance = absoluteDistance;
                        nextMinWaypoint = this.waypoints.get(neighborNode.wpName);
                        neighborRouteNode.distanceToEnd = currentRouteNode.distanceToEnd + distance
                    }
                }

            }
        })
        return nextMinWaypoint;
    }


    private popNodeWithMinFlightDistance(nodesToVisit: Map<string, NodeInfo>): NodeInfo | undefined {
        let lowestDistance = 99999999;
        let closestWpToGoal: string | undefined;
        let closestNodeToGoal: NodeInfo | undefined;
        for (const wpName of nodesToVisit.keys()) {
            const nodeToVisit = nodesToVisit.get(wpName)
            if (typeof nodeToVisit !== 'undefined' && nodeToVisit.aproximateAbsDistance < lowestDistance) {
                lowestDistance = nodeToVisit.aproximateAbsDistance;
                closestWpToGoal = wpName;
                closestNodeToGoal = nodesToVisit.get(wpName);
            }
        }

        if (typeof closestWpToGoal !== 'undefined') {
            nodesToVisit.delete(closestWpToGoal);
        }

        return closestNodeToGoal;
    }
}












