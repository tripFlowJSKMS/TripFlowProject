export const TIME_SLOT: number = 30;
export var earliestNodes: DestinationNode[] = [];
export var allPaths: Object[];
 
// Declare the functions in the global namespace
declare global {
    function calculateWeights(preferences: string[], destinations: Destination[]): void;
    function calculateNumTimeSlots(destination: Destination): number;
    function createNodes(destinations: Destination[]): DestinationNode[];
    function createEdges(destinationNodes: DestinationNode[], sleepTime: number): void;
    function isFeasibleEdge(source: DestinationNode, destination: DestinationNode): boolean;
    function addPathToFinaList(pathSoFar: DestinationNode[], weightSoFar: number): void;
    function traversal(currNode: DestinationNode, pathSoFar: DestinationNode[], 
      itinerarySoFar: Destination[], weightSoFar: number): void;
    function quickSelect(arr: Object[], k: number): Object;
    function generateItinerary(nodes: DestinationNode[]): Object[][];
    function planItinerary(destinations: Destination[]): Object[][];
    function createSupernode(sleepTime: number): DestinationNode;
  }

  function planItinerary(destinations: Destination[], sleepTime: number): Object[][] {
    const nodes: DestinationNode[] = createNodes(destinations);
    createEdges(nodes, sleepTime);
    const supernode: DestinationNode = createSuperNode(sleepTime);
    traversal(supernode, [], [], 0);
    const heaviestPath: DestinationNode[] = quickSelect(allPaths, allPaths.length - 1) as DestinationNode[];
    const itinerary = generateItinerary(heaviestPath);
    return itinerary;
  }

  function generateItinerary(nodes: DestinationNode[]): Object[][] {
    const itinerary: Object[][] = new Object[nodes.length][3];
    for (let i = 0; i < nodes.length; i++) {
      const node: DestinationNode = nodes[i];
      itinerary[i][0] = node.getDestination().getName();
      itinerary[i][1] = node.getStartTime();
      itinerary[i][2] = node.getEndTime();
    }
    return itinerary;
  }

  function quickSelect(arr: Object[], k: number): Object {
    const sortedArr = arr.slice();
    const result = partition(sortedArr, 0, sortedArr.length - 1, k - 1);
    return result;
  }

  function partition(arr: Object[], left: number, right: number, k: number): Object {
    while (left <= right) {
      const pivotIndex = getPivotIndex(arr, left, right);
      const partitionIndex = partitionAroundPivot(arr, left, right, pivotIndex);
      
      if (partitionIndex === k) {
        return arr[partitionIndex];
      } else if (k < partitionIndex) {
        right = partitionIndex - 1;
      } else {
        left = partitionIndex + 1;
      }
    }

    return "Something went wrong";
  };

  function getPivotIndex(arr: Object[], left: number, right: number): number {
    const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    return randomIndex;
  };

  function partitionAroundPivot(arr: Object[], left: number, right: number, pivotIndex: number): number {
    const pivotValue = arr[pivotIndex][1];
    swap(arr, pivotIndex, right);
    let partitionIndex = left;
    
    for (let i = left; i < right; i++) {
      if (arr[i][1] < pivotValue) {
        swap(arr, i, partitionIndex);
        partitionIndex++;
      }
    }
    
    swap(arr, partitionIndex, right);
    return partitionIndex;
  };

  function swap(arr: Object[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  function traversal(currNode: DestinationNode, pathSoFar: DestinationNode[], 
    itinerarySoFar: Destination[], weightSoFar: number): void {
      const outgoingEdges: Edge[] = currNode.getOutgoingEdgeList();
      if (outgoingEdges.length == 0) {
        addPathToFinalList(pathSoFar, weightSoFar);
      } else {
        for (const edge of outgoingEdges) {
          const destinationNode: DestinationNode = edge.getDestination();
          const destination: Destination = destinationNode.getDestination();
          //I want to check if destination is a member of itinerarySoFar
          if (itinerarySoFar.includes(destination)) {
            addPathToFinalList(pathSoFar, weightSoFar);
          } else {
            const updatedPath: DestinationNode[] = [...pathSoFar];
            updatedPath.push(destinationNode);
            const updatedItinerary: Destination[] = [...itinerarySoFar];
            updatedItinerary.push(destination);
            weightSoFar += destinationNode.getDestination().getWeight();
            traversal(destinationNode, updatedPath, updatedItinerary, weightSoFar);
          }

        }
      }
    }

  function addPathToFinalList(pathSoFar: DestinationNode[], weightSoFar: number): void {
    let finalPath: Object[] = [];
    finalPath.push(pathSoFar);
    finalPath.push(weightSoFar);
    allPaths.push(finalPath);
  }

  function isFeasibleEdge(source: DestinationNode, destination: DestinationNode, sleepTime: number): boolean {
    /*
    Check if the edge is feasible based on the time constraints and tour duration.
    Return true if the edge is feasible, false otherwise.
    An edge is feasible only when the DESTINATION can be toured for its full duration after
    considering ALL time constraints (endTime of source, travelling time, tourDuration of
    destination).
    */
    if (source.getDestination() === destination.getDestination()) {
      return false;
    }
    const startingTime: number = source.getEndTime();
    let travellingTime: number = Infinity;
    if (source.getDestination().getName() == "Supernode") {
      // This is assumed for our MVP. We will set this as the hotel location next time
      travellingTime = 0;
    } else {
      travellingTime = getTravelTime(source.getDestination(), destination.getDestination());
    }
    const tourDuration: number = destination.getDestination().getTourDuration();
    const endTime: number = startingTime + travellingTime + tourDuration;
    return (endTime <= sleepTime) && (endTime <= destination.getDestination().getClosingTime());
  }

  function createSuperNode(sleepTime: number): DestinationNode {
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


    // Add edges from the supernode to the earliest node of each destination
    for (const startNode of earliestNodes) {
        if (isFeasibleEdge(supernode, startNode, sleepTime)) {
            supernode.addOutgoingEdge(startNode, startNode.getDestination().getWeight());
        }
    }
    
    return supernode; 
  }

  function createEdges(destinationNodes: DestinationNode[], sleepTime: number): void {
    for (const start of destinationNodes) {
        for (const end of destinationNodes) {
            if (isFeasibleEdge(start, end, sleepTime)) {
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
  