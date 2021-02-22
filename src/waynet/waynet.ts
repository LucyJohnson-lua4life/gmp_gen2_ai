import * as waynetReader from './waynetReader';
import {IWaynet, Freepoint, Waypoint, WaypointDict} from './iwaynet';

/**
 * Represents a node in a Waynet. It contains additional information about distances to other
 * nodes in the waynet that are necessary for path finding.
 * @interface NodeInfo
 * @field **waypoint**: represents the concrete waypoint of the current node
 * @field **distanceToStart**: distance from the current node to the start, summing up the distances of the nodes in between
 * @field **distanceToEnd**: distance from the current node to the end, summing up the distances of the nodes in between
 * @field **absAirlineDistance**: an aproximate absolute distance summing up 'distanceToStart' + the flight distance between the current node and the end node (NOT considering the distances of the nodes in between)
 */
interface NodeInfo extends Waypoint {
    distanceToStart: number;
    distanceToEnd: number;
    aproximateAbsDistance: number;
}

interface NodeDict {
    [details: string]: NodeInfo;
}

export class Waynet implements IWaynet {
    waypoints: WaypointDict;
    freepoints: Array<Freepoint>;

    constructor(waypointFile: string, freepointFile: string) {
        this.waypoints = this.toWaypointDict(waynetReader.readWaypoints(waypointFile));
        this.freepoints = waynetReader.readFreepoints(freepointFile);
    }

     getWayroute(start: string, end: string): Array<Waypoint> {
        let routeNodes:NodeDict = this.getRouteNodes(this.waypoints[start], this.waypoints[end]);

        if(Object.keys(routeNodes).length === 0){
            return []
        }
        
        let currentWp:Waypoint | undefined  = this.waypoints[end];
        let wayroute = []
        wayroute.push(currentWp)
        while(currentWp.wpName !== start){
            let lastCurrentWp = currentWp;
            currentWp = this.getNextMinAbsDistanceWaypoint(currentWp, routeNodes);
            if(typeof currentWp === 'undefined'){
                return []
            }
            wayroute.push(currentWp);
            delete routeNodes[lastCurrentWp.wpName];
        }

        return wayroute.reverse();
    }

    private getRouteNodes(start: Waypoint, end: Waypoint): NodeDict {
        let nodesToVisit: NodeDict = {};
        let routeNodes: NodeDict = {};
        nodesToVisit[start.wpName] = this.createNodeWithWaypointData(start);

        while (Object.keys(nodesToVisit).length > 0){
            let currentNode: NodeInfo | undefined = this.popNodeWithMinAproximateAbsDistance(nodesToVisit);
            if (typeof currentNode === 'undefined') {
                return {};
            }

            if (currentNode.wpName === end.wpName) {
                routeNodes[currentNode.wpName] = currentNode
                return routeNodes;
            }
            this.expandNodesToVisit(nodesToVisit, routeNodes, currentNode, end);
            routeNodes[currentNode.wpName] = currentNode;
        }
        return {};
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

    private expandNodesToVisit(nodesToVisit: NodeDict, routeNodes: NodeDict, currentNode: NodeInfo, end: Waypoint): void {
        if (currentNode.otherWps.length == 0) {
            return;
        }

        currentNode.otherWps.forEach(neighborWpName => {
            if (typeof routeNodes[neighborWpName] === 'undefined') {
                let neighborWp = this.waypoints[neighborWpName];
                let distanceToNeighbor = this.getDistance(currentNode.x, currentNode.y, currentNode.z, neighborWp.x, neighborWp.y, neighborWp.z);
                let distNodeToStart = currentNode.distanceToStart + distanceToNeighbor;
                let neighborNode = nodesToVisit[neighborWpName]
                if (!(typeof neighborNode !== 'undefined' && distNodeToStart > neighborNode.distanceToStart)) {
                   /*aproximate means, that we are measuring the distance straight between point a to b, without measuring the distances of the nodes in between
                     measuring the aproximate absolute distance is enough of an heuristic for us to decide which node to chose next*/
                    let aproximateDistNodeToEnd = this.getDistance(end.x, end.y, end.z, neighborWp.x, neighborWp.y, neighborWp.z);
                    let aproximateAbsDistance = distNodeToStart + aproximateDistNodeToEnd
                    let newNodeToVisit = this.createNodeWithWaypointData(neighborWp);
                    newNodeToVisit.distanceToStart = distNodeToStart;
                    newNodeToVisit.aproximateAbsDistance = aproximateAbsDistance;
                    nodesToVisit[neighborWpName] = newNodeToVisit;
                    
                }
            }
        })
    }

    private getNextMinAbsDistanceWaypoint(currentWp: Waypoint, routeNodes: NodeDict): Waypoint | undefined {
        let smallestDistance = 99999999;
        let nextMinWaypoint: Waypoint | undefined;

        currentWp.otherWps.forEach(neighborWpName => {
            let neighborNode:NodeInfo = routeNodes[neighborWpName];
            if (typeof neighborNode !== 'undefined') {
                
                let distance = this.getDistance(currentWp.x, currentWp.y, currentWp.z, neighborNode.x, neighborNode.y, neighborNode.z);
                let absoluteDistance = routeNodes[currentWp.wpName].distanceToEnd + distance + routeNodes[neighborWpName].distanceToStart

                if (smallestDistance > absoluteDistance) {
                    smallestDistance = absoluteDistance;
                    nextMinWaypoint = this.waypoints[neighborNode.wpName];
                    routeNodes[neighborWpName].distanceToEnd = routeNodes[currentWp.wpName].distanceToEnd + distance
                }
            }
        }
        )
        return nextMinWaypoint;
    }

    private popNodeWithMinAproximateAbsDistance(nodesToVisit: NodeDict): NodeInfo | undefined {
        let lowestDistance = 99999999;
        let closestWpToGoal: string | undefined;
        let closestNodeToGoal: NodeInfo | undefined;
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

    private getDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
        let x = x1 - x2;
        let y = y1 - y2;
        let z = z1 - z2;
        return Math.sqrt(x * x + y * y + z * z);
    }

    private toWaypointDict(waypoints: Array<Waypoint>): WaypointDict {
        const reducer = (wpDict: WaypointDict, wp: Waypoint): WaypointDict => {
            wpDict[wp.wpName] = wp;
            return wpDict;
        }
        return waypoints.reduce(reducer, {})
    }

}












