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

    addOutgoingEdge(destinationNode: DestinationNode, weight: number): void {
        const newEdge: Edge = new Edge(this, destinationNode, weight);
        this.outgoingEdgeList.push(newEdge);
    }

    getOutgoingEdgeList(): Edge[] {
        return this.outgoingEdgeList;
    }

}