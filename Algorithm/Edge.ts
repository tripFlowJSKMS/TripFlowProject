import { DestinationNode } from "./DestinationNode";

export class Edge {
    private sourceNode: DestinationNode;
    private destinationNode: DestinationNode;
    private weight: number;

    constructor(sourceNode: DestinationNode, destinationNode: DestinationNode) {
        this.sourceNode = sourceNode;
        this.destinationNode = destinationNode;
        this.weight = this.destinationNode.getDestination().getWeight();
    }

    getDestinationNode(): DestinationNode {
        return this.destinationNode;
    }

    getSourceNode(): DestinationNode {
        return this.sourceNode;
    }

    getWeight(): number {
        return this.weight;
    }
}
