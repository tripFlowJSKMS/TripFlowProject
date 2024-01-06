import { Destination } from "./Destination";
import { Edge } from "./Edge";

export class DestinationNode {
    private destination: Destination;
    private stringDate: string;
    private startTime: number;
    private endTime: number;
    private outgoingEdgeList: Edge[] = [];

    constructor(destination: Destination, stringDate: string, startTime: number, endTime: number) {
        this.stringDate = stringDate;
        this.destination = destination;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    getStringDate(): string { 
        return this.stringDate;
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

    noTimeLimitClash(destinationNode: DestinationNode, dayEndTime: number): boolean {
        return this.destination.isPossiblePlan(this.endTime, destinationNode.startTime, dayEndTime, destinationNode.destination);
    }

    equals(node: DestinationNode): boolean {
        return this.destination == node.destination;
    }

    itineraryFormat(): {destination: Destination, stringDate: string, startingTime: number, endingTime: number} {
        return this.destination.itineraryFormat(this.stringDate, this.startTime, this.endTime);
    }

}