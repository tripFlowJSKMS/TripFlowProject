import { Destination } from "./Destination";
import { Edge } from "./Edge";

export class DestinationNode {
    private destination: Destination;
    private startTime: number;
    private endTime: number;
    private outgoingEdgeList: Edge[] = [];

    constructor(destination: Destination, startTime: number, endTime: number) {
        this.destination = destination;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    getStartTime(): number {
        return this.startTime;
    }

    getEndTime(): number {
        return this.endTime;
    }

    getDestination(): Destination {
        return this.destination;
    }

    addOutgoingEdge(destinationNode: DestinationNode): void {
        this.outgoingEdgeList.push(new Edge(this, destinationNode));
    }

    getOutgoingEdgeList(): Edge[] {
        return this.outgoingEdgeList;
    }

    noTimeClash(destinationNode: DestinationNode, dayEndTime: number): boolean {
        return this.destination.isPossiblePlan(this.endTime, destinationNode.startTime, dayEndTime, destinationNode.destination);
    }

    equals(node: DestinationNode): boolean {
        return this.destination == node.destination;
    }

    itineraryFormat(): [Destination, number, number] {
        return this.destination.itineraryFormat(this.startTime, this.endTime);
    }

}