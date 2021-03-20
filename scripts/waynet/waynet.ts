import * as waynetReader from './waynetReader';
import {IWaynet, Freepoint, Waypoint} from './iwaynet';

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
    waypoints: Map<String,Waypoint>;
    freepoints: Array<Freepoint>;

    constructor(waypointFile: string, freepointFile: string) {
        this.waypoints = this.toWaypointMap(waynetReader.readWaypoints(waypointFile));
        this.freepoints = waynetReader.readFreepoints(freepointFile);
    }

    /**
     * Returns the waypoints to visit (the route) to get from waypoint A to waypoint B.
     * @param start name of the start waypoint
     * @param end name of the end waypoint
     */
    public getWayroute(start: string, end: string): Array<Waypoint> {
        let routeNodes:Map<string, NodeInfo> = this.getRouteNodes(this.waypoints.get(start), this.waypoints.get(end));

        if(routeNodes.size === 0){
            return []
        }
        
        let currentWp:Waypoint | undefined  = this.waypoints.get(end);
        let wayroute = []
        wayroute.push(currentWp)
        while(currentWp.wpName !== start){
            let lastCurrentWp = currentWp;
            currentWp = this.getNextMinAbsDistanceWaypoint(currentWp, routeNodes);
            if(typeof currentWp === 'undefined'){
                return []
            }
            wayroute.push(currentWp);
            routeNodes.delete(lastCurrentWp.wpName);
        }

        return wayroute.reverse();
    }

    private getRouteNodes(start: Waypoint, end: Waypoint): Map<string, NodeInfo> {
        let nodesToVisit: Map<string,NodeInfo> = new Map();
        let routeNodes: Map<string,NodeInfo> = new Map();
        nodesToVisit.set(start.wpName,this.createNodeWithWaypointData(start));

        while (nodesToVisit.size > 0){
            let currentNode: NodeInfo | undefined = this.popNodeWithMinAproximateAbsDistance(nodesToVisit);
            if (typeof currentNode === 'undefined') {
                return new Map();
            }

            if (currentNode.wpName === end.wpName) {
                routeNodes.set(currentNode.wpName,currentNode);
                return routeNodes;
            }
            this.expandNodesToVisit(nodesToVisit, routeNodes, currentNode, end);
            routeNodes.set(currentNode.wpName,currentNode);
        }
        return new Map();
    }

    private createNodeWithWaypointData(waypoint:Waypoint):NodeInfo{
        let node:NodeInfo = {
            x: waypoint.x, 
            y:waypoint.y, 
            z: waypoint.z, 
            rotX: waypoint.rotX, 
            rotY: waypoint.rotY,
            wpName: waypoint.wpName,
            otherWps: waypoint.otherWps,
            distanceToStart: 0,
            distanceToEnd:0,
            aproximateAbsDistance:0
        }
        return node;
    }

    private expandNodesToVisit(nodesToVisit: Map<string, NodeInfo>, routeNodes: Map<string, NodeInfo>, currentNode: NodeInfo, end: Waypoint): void {
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
                    let aproximateAbsDistance = distNodeToStart + aproximateDistNodeToEnd
                    let newNodeToVisit = this.createNodeWithWaypointData(neighborWp);
                    newNodeToVisit.distanceToStart = distNodeToStart;
                    newNodeToVisit.aproximateAbsDistance = aproximateAbsDistance;
                    nodesToVisit.set(neighborWpName, newNodeToVisit);
                    
                }
            }
        })
    }

    private getNextMinAbsDistanceWaypoint(currentWp: Waypoint, routeNodes: Map<string, NodeInfo>): Waypoint | undefined {
        let smallestDistance = 99999999;
        let nextMinWaypoint: Waypoint | undefined;

        currentWp.otherWps.forEach(neighborWpName => {
            let neighborNode:NodeInfo = routeNodes.get(neighborWpName);
            if (typeof neighborNode !== 'undefined') {
                
                let distance = this.getDistance(currentWp.x, currentWp.y, currentWp.z, neighborNode.x, neighborNode.y, neighborNode.z);
                let absoluteDistance = routeNodes.get(currentWp.wpName).distanceToEnd + distance + routeNodes.get(neighborWpName).distanceToStart

                if (smallestDistance > absoluteDistance) {
                    smallestDistance = absoluteDistance;
                    nextMinWaypoint = this.waypoints.get(neighborNode.wpName);
                    routeNodes.get(neighborWpName).distanceToEnd = routeNodes.get(currentWp.wpName).distanceToEnd + distance
                }
            }
        }
        )
        return nextMinWaypoint;
    }

    private popNodeWithMinAproximateAbsDistance(nodesToVisit: Map<string, NodeInfo>): NodeInfo | undefined {
        let lowestDistance = 99999999;
        let closestWpToGoal: string | undefined;
        let closestNodeToGoal: NodeInfo | undefined;
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

    private getDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
        let x = x1 - x2;
        let y = y1 - y2;
        let z = z1 - z2;
        return Math.sqrt(x * x + y * y + z * z);
    }

    private toWaypointMap(waypoints: Array<Waypoint>): Map<string,Waypoint> {
        const reducer = (wpMap: Map<string, Waypoint>, wp: Waypoint): Map<string, Waypoint> => {
            wpMap.set(wp.wpName, wp);
            return wpMap;
        }
        return waypoints.reduce(reducer, new Map())
    }

}












