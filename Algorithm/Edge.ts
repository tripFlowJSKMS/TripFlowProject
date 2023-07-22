import { DestinationNode } from "./DestinationNode";

export class Edge {
    private source: DestinationNode;
    private destination: DestinationNode;
    private weight: number;

    constructor(source: DestinationNode, destination: DestinationNode, weight: number) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }

    getDestinationNode(): DestinationNode {
        return this.destination;
    }

    getSourceNode(): DestinationNode {
        return this.source;
    }

    getWeight(): number {
        return this.weight;
    }
}
