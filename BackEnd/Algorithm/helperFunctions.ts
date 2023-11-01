import { Destination } from "./Destination";
import { DestinationNode } from "./DestinationNode";
import { Edge } from "./Edge";

var earliestNodes: DestinationNode[] = [];
var allPaths: [DestinationNode[], number][] = [];
 
export function planItinerary(destinations: Destination[], startTime: number, endTime: number): Array<{destination: Destination, startingTime: number, endingTime: number}> {
  const nodes: DestinationNode[] = createNodes(destinations, startTime);
  createEdges(nodes, endTime);
  const supernode: DestinationNode = createSuperNode(endTime);
  traversal(supernode, [], [], 0);
  const heaviestPath: DestinationNode[] = quickSelect(allPaths, allPaths.length - 1) as DestinationNode[];
  const itinerary: Array<{destination: Destination, startingTime: number, endingTime: number}> = generateItinerary(heaviestPath);
  return itinerary;
}

function generateItinerary(nodes: DestinationNode[]): Array<{destination: Destination, startingTime: number, endingTime: number}> {
  const itinerary: Array<{destination: Destination, startingTime: number, endingTime: number}> = [];
  for (let i = 0; i < nodes.length; i++) {
    itinerary[i] = nodes[i].itineraryFormat();
  }
  return itinerary;
}

function quickSelect(arr: [DestinationNode[], number][], k: number): DestinationNode[] {
  const sortedArr = arr.slice();
  const result = partition(sortedArr, 0, sortedArr.length - 1, k - 1);
  return result[0];
}

function partition(arr: [DestinationNode[], number][], left: number, right: number, k: number): [DestinationNode[], number] {
  while (left <= right) {
    const pivotIndex = getPivotIndex(left, right);
    const partitionIndex = partitionAroundPivot(arr, left, right, pivotIndex);
    
    if (partitionIndex === k) {
      return arr[partitionIndex];
    } else if (k < partitionIndex) {
      right = partitionIndex - 1;
    } else {
      left = partitionIndex + 1;
    }
  }

  console.log("something went wrong, shouldn't have come out");
  return [[], -1];
};

function getPivotIndex(left: number, right: number): number {
  const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;
  return randomIndex;
};

function partitionAroundPivot(arr: [DestinationNode[], number][], left: number, right: number, pivotIndex: number): number {
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

function swap(arr: [DestinationNode[], number][], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

/*
Dijkstra only relaxes the edges of the min-estimate node, but we have to record all possible paths as long as the 
Destination has not been visited before. The key constraint that causes Dijkstra to fail is that once we visit a particular 
DestinationNode, the rest of the DestinationNodes in the Destination set all cannot be visited anymore so the "graph" alters. 
Consequently, Dijkstra would not have considered valid combinations that yield a lower estimate now but will end up with a larger 
weight sum at the end of the path. 
*/

function traversal(currNode: DestinationNode, pathSoFar: DestinationNode[], 
  itinerarySoFar: Destination[], weightSoFar: number): void {
    const outgoingEdges: Edge[] = currNode.getOutgoingEdgeList();
    if (outgoingEdges.length == 0) {
      allPaths.push([pathSoFar, weightSoFar]);
    } else {
      for (const edge of outgoingEdges) {
        const destinationNode: DestinationNode = edge.getDestinationNode();
        const destination: Destination = destinationNode.getDestination();
        //I want to check if destination is a member of itinerarySoFar
        if (itinerarySoFar.includes(destination)) {
          allPaths.push([pathSoFar, weightSoFar]);
        } else {
          const updatedPath: DestinationNode[] = [...pathSoFar];
          updatedPath.push(destinationNode);
          const updatedItinerary: Destination[] = [...itinerarySoFar];
          updatedItinerary.push(destination);
          const updatedWeight: number = weightSoFar + destinationNode.getDestination().getWeight();
          traversal(destinationNode, updatedPath, updatedItinerary, updatedWeight);
        }

      }
    }
  }

function isFeasibleEdge(sourceNode: DestinationNode, destinationNode: DestinationNode, dayEndTime: number): boolean {
  /*
  Check if the edge is feasible based on the time constraints and tour duration.
  Return true if the edge is feasible, false otherwise.
  An edge is feasible only when the DESTINATION can be toured for its full duration after
  considering ALL time constraints (endTime of source, travelling time, tourDuration of
  destination).
  */
  if (sourceNode.equals(destinationNode)) {
    return false;
  }
  return sourceNode.noTimeClash(destinationNode, dayEndTime);
}

function createSuperNode(endTime: number): DestinationNode {
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
  const dummyDestination: Destination = new Destination(0, "Supernode", earliestStartTime, earliestStartTime, 0, [], 0, 0);
  const supernode: DestinationNode = new DestinationNode(dummyDestination, earliestStartTime, earliestStartTime);


  // Add edges from the supernode to the earliest node of each destination
  for (const startNode of earliestNodes) {
      if (isFeasibleEdge(supernode, startNode, endTime)) {
          supernode.addOutgoingEdge(startNode);
      }
  }
  
  return supernode; 
}

function createEdges(destinationNodes: DestinationNode[], endTime: number): void {
  for (const start of destinationNodes) {
      for (const end of destinationNodes) {
          if (isFeasibleEdge(start, end, endTime)) {
              start.addOutgoingEdge(end);
          }
      }
  }
}

// The difference between Destination and DestinationNode is that there is only ONE destination.
// However, each destination will have many nodes because of the timeslot we visit it.
function createNodes(destinations: Destination[], startTime: number): DestinationNode[] {
  const nodes: DestinationNode[] = [];
  for (const destination of destinations) {
      const numTimeSlots: number = destination.calculateNumTimeSlots();
      let earliestPossibleNode: boolean = true;
      for (let i = 0; i < numTimeSlots; i++) {
          const node: DestinationNode = destination.generateNode(i); 
          nodes.push(node);
          if (node.getStartTime() >= startTime && earliestPossibleNode) {
            earliestNodes.push(node);
            earliestPossibleNode = false;
          }
      }
  }
  return nodes;
}
  
// Export the functions
export {};
  