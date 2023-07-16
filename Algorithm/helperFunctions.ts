export const TIME_SLOT: number = 30;
export const earliestNodes: DestinationNode[] = [];

// Declare the functions in the global namespace
declare global {
    function calculateWeights(preferences: string[], destinations: Destination[]): void;
    function calculateNumTimeSlots(destination: Destination): number;
    function createNodes(destinations: Destination[]): DestinationNode[];
    function createEdges(destinationNodes: DestinationNode[]): void;
  }

  function createSuperNode(): DestinationNode {
    // Find the earliest start time among all nodes. The supernode only needs to connect
    // to the earliest DestinationNode for each Destination to save computation time.

    let earliestStartTime: number = Infinity;
    for (const destinationNode of earliestNodes) {
        const startTime: number = destinationNode.getStartTime();
        if (startTime < earliestStartTime) {
            earliestStartTime = startTime;
        }
    }

    // Create the supernode with the earliest start time
    const dummyDestination: Destination = new Destination(0, "Supernode", earliestStartTime, earliestStartTime, 0, []);
    const supernode: DestinationNode = new DestinationNode(dummyDestination, earliestStartTime, earliestStartTime);

  }

    // Add edges from the supernode to the earliest node of each destination
    for (DestinationNode startNode : this.earliestNodes) {
        // This is probably a useless check because tour duration should be sufficient if we
        // visit the place the moment it opens, but just in case.
        if (isFeasibleEdge(supernode, startNode)) {
            supernode.addOutgoingEdge(startNode, startNode.getDestination().getWeight());
        }
    }

    return supernode;
}

  function createEdges(destinationNodes: DestinationNode[]): void {
    for (const start of destinationNodes) {
        for (const end of destinationNodes) {
            if (isFeasibleEdge(start, end)) {
                start.addOutgoingEdge(end, end.getDestination().getWeight());
            }
        }
    }
  }
  
  function calculateWeights(preferences: string[], destinations: Destination[]): void {
    const totalPreferences: number = preferences.length;
  
    for (const destination of destinations) {
      const characteristics: string[] = destination.getCharacteristics();
  
      let matchCount: number = 0;
      for (const preference of preferences) {
        if (characteristics.includes(preference)) {
          matchCount++;
        }
      }
  
      // Calculate the percentage match and store it in the weights map
      const percentageMatch: number = matchCount / totalPreferences;
      destination.setWeight(percentageMatch);
    }
  }

  function calculateNumTimeSlots(destination: Destination): number {
    const openingTime: number = destination.getOpeningTime();
    const closingTime: number = destination.getClosingTime();
    const tourDuration: number = destination.getTourDuration();
    let numTimeSlots: number = (closingTime - openingTime) / TIME_SLOT;
    numTimeSlots -= tourDuration / TIME_SLOT; // Subtract the duration of the tour

    return numTimeSlots
  }

  // The difference between Destination and DestinationNode is that there is only ONE destination.
  // However, each destination will have many nodes because of the timeslot we visit it.
  function createNodes(destinations: Destination[]): DestinationNode[] {
    const nodes: DestinationNode[] = [];

    for (const destination of destinations) {
        const numTimeSlots: number = calculateNumTimeSlots(destination);
        const openingTime: number = destination.getOpeningTime();

        for (let i = 0; i < numTimeSlots; i++) {
            const startTime: number = openingTime + (i * TIME_SLOT);
            const endTime: number = startTime + destination.getTourDuration();
            const node: DestinationNode = new DestinationNode(destination, startTime, endTime);
            nodes.push(node);
            if (i === 0) {
              earliestNodes.push(node);
            }
          }
    }
    return nodes;
  }
    
  // Export the functions
  export {};
  