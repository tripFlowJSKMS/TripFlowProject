import { Destination } from "./Destination";
import { DestinationNode } from "./DestinationNode";
import { Edge } from "./Edge";

var earliestNodes: DestinationNode[] = [];
var heaviestPath: [DestinationNode[], number] = [[], 0];
// At some point we will replace this with actual coordinates by parsing in the user's travel plan to google maps api
const DUMMY_GPT_LONGITUDE: number = -122.42;
const DUMMY_GPT_LATITUDE: number = 37.78;
var gptDestinationNumber: number = 0;

export function getDateFromString(ymd: string): Date {
  // E.g. 2023-12-29
  // month in a JavaScript Date object is zero-indexed so need to -1 (if not done before)
  return new Date(parseInt(ymd.substring(0,4)), parseInt(ymd.substring(5,7)) - 1, parseInt(ymd.substring(8,10)));
}

export function calculateTotalTravellingDays(startDate: string, endDate: string): number {
  return ((getDateFromString(endDate).getTime() - getDateFromString(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
}

// Javascript Date object is time-zone sensitive when we do the math. 
export function addDaysToStringDate(dateStr: string, daysToAdd: number) {
  const date = new Date(`${dateStr}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + daysToAdd);
  // Format the year, month, and day in YYYY-MM-DD format using UTC values
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function planItinerary(
  destinations: Destination[], 
  startDate: string, 
  endDate: string, 
  startTime: number, 
  endTime: number, 
  dateTimePrePlannedEvents: Map<string, [string, string][]>
  ): Array<{destination: Destination, stringDate: string, startingTime: number, endingTime: number}> {

  const prePlannedEventsTimeSlots: Map<string, [number, number, string][]> = extractGptTimeOutput(dateTimePrePlannedEvents);
  const nodes: DestinationNode[] = createNodes(destinations, startDate, endDate, startTime, endTime, prePlannedEventsTimeSlots);
  createEdges(nodes, endTime);
  const supernode: DestinationNode = createSuperNode(startDate, endTime);
  traversal(supernode, [], new Set(), 0);
  const itinerary: Array<{destination: Destination, stringDate: string, startingTime: number, endingTime: number}> = generateItinerary(heaviestPath[0]);
  
  return itinerary;
}

// Date: [Time, Event] => Date: [StartTime, EndTime, Event]
function extractGptTimeOutput(
  dateTimePrePlannedEvents: Map<string, [string, string][]>
  ): Map<string, [number, number, string][]> {
  const convertedEvents = new Map<string, [number, number, string][]>();

  dateTimePrePlannedEvents.forEach((timeEvents, date) => {
    const convertedTimeEvents: [number, number, string][] = timeEvents.map(([startEndTime, eventName]) => {
      const startTime: number = timeToMinutes(startEndTime.substring(0,5));
      const endTime: number = timeToMinutes(startEndTime.substring(6,11));
      return [startTime, endTime, eventName];
    });
    convertedEvents.set(date, convertedTimeEvents);
  });

  return convertedEvents;
}

function generateItinerary(nodes: DestinationNode[]): Array<{destination: Destination, stringDate: string, startingTime: number, endingTime: number}> {
  const itinerary: Array<{destination: Destination, stringDate: string, startingTime: number, endingTime: number}> = [];
  for (let i = 0; i < nodes.length; i++) {
    itinerary[i] = nodes[i].itineraryFormat();
  }
  return itinerary;
}

/*
Dijkstra only relaxes the edges of the min-estimate node, but we have to record all possible paths as long as the 
Destination has not been visited before. The key constraint that causes Dijkstra to fail is that once we visit a particular 
DestinationNode, the rest of the DestinationNodes in the Destination set all cannot be visited anymore so the "graph" alters. 
Consequently, Dijkstra would not have considered valid combinations that yield a lower estimate now but will end up with a larger 
weight sum at the end of the path. 
*/
function traversal(currNode: DestinationNode, pathSoFar: DestinationNode[], 
  itinerarySet: Set<Destination>, weightSoFar: number): void {
  
  const outgoingEdges: Edge[] = currNode.getOutgoingEdgeList();
  if (outgoingEdges.length == 0) {
    const heaviestWeightSoFar: number = heaviestPath[1];
    if (weightSoFar < heaviestWeightSoFar) {
      return;
    }
    if (weightSoFar == heaviestWeightSoFar && heaviestWeightSoFar !== 0) {
      const currPathLastDestinationNode: DestinationNode = pathSoFar[pathSoFar.length - 1];
      const heaviestPathLastDestinationNode: DestinationNode = heaviestPath[0][heaviestPath[0].length - 1];
      const currPathEndDate: string = currPathLastDestinationNode.getStringDate();
      const heaviestPathEndDate: string = heaviestPathLastDestinationNode.getStringDate();
      if (getDateFromString(currPathEndDate) > getDateFromString(heaviestPathEndDate)) {
        return;
      }
      const currPathEndTime: number = currPathLastDestinationNode.getEndTime();
      const heaviestPathEndTime: number = heaviestPathLastDestinationNode.getEndTime();
      if (currPathEndTime >= heaviestPathEndTime) {
        return;
      }
    }
    heaviestPath = [pathSoFar, weightSoFar]; 
  } else {
    for (const edge of outgoingEdges) {
      const destinationNode: DestinationNode = edge.getDestinationNode();
      const destination: Destination = destinationNode.getDestination();

      if (itinerarySet.has(destination)) {
        const heaviestWeightSoFar: number = heaviestPath[1];
        if (weightSoFar < heaviestWeightSoFar) {
          continue;
        }
        if (weightSoFar == heaviestWeightSoFar && heaviestWeightSoFar !== 0) {
          const currPathLastDestinationNode: DestinationNode = pathSoFar[pathSoFar.length - 1];
          const heaviestPathLastDestinationNode: DestinationNode = heaviestPath[0][heaviestPath[0].length - 1];
          const currPathEndDate: string = currPathLastDestinationNode.getStringDate();
          const heaviestPathEndDate: string = heaviestPathLastDestinationNode.getStringDate();
          if (getDateFromString(currPathEndDate) > getDateFromString(heaviestPathEndDate)) {
            continue;
          }
          const currPathEndTime: number = currPathLastDestinationNode.getEndTime();
          const heaviestPathEndTime: number = heaviestPathLastDestinationNode.getEndTime();
          if (currPathEndTime >= heaviestPathEndTime) {
            continue;
          }
        }
        heaviestPath = [pathSoFar, weightSoFar]; 
      } else {
        const updatedPath: DestinationNode[] = [...pathSoFar];
        updatedPath.push(destinationNode);
        const updatedItinerarySet: Set<Destination> = new Set(itinerarySet);
        updatedItinerarySet.add(destination);
        const updatedWeight: number = weightSoFar + destinationNode.getDestination().getWeight();
        traversal(destinationNode, updatedPath, updatedItinerarySet, updatedWeight);
      }
    }
  } 
}

function isFeasibleEdge(sourceNode: DestinationNode, destinationNode: DestinationNode, dayEndTime: number): boolean {
  /*
  Check if the edge is feasible based on the time constraints and tour duration.
  Return true if the edge is feasible, false otherwise.
  An edge is feasible only when the DESTINATION can be toured for its full duration after
  considering ALL time constraints (date of source end end, endTime of source, travelling time, tourDuration of
  destination, etc.).
  */
  if (sourceNode.equals(destinationNode)) {
    return false;
  }
  if (getDateFromString(sourceNode.getStringDate()) < getDateFromString(destinationNode.getStringDate())) {
    return true;
  }
  if (getDateFromString(sourceNode.getStringDate()) > getDateFromString(destinationNode.getStringDate())) {
    return false;
  }
  return sourceNode.noTimeLimitClash(destinationNode, dayEndTime);
}

function createSuperNode(stringDate: string, endTime: number): DestinationNode {
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
  const dummyDestination: Destination = new Destination(0, "Supernode", earliestStartTime, earliestStartTime, 0, [], [], 0, 0, false);
  const supernode: DestinationNode = new DestinationNode(dummyDestination, stringDate, earliestStartTime, earliestStartTime);

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
function createNodes(destinations: Destination[], startDateString: string, endDateString: string, startTime: number, endTime: number, prePlannedEventsTimeSlots: Map<string, [number, number, string][]>): DestinationNode[] {
  const travellingDays: number = calculateTotalTravellingDays(startDateString, endDateString);
  const tripFlowNodes: DestinationNode[] = createTripFlowNodes(travellingDays, destinations, startDateString, endDateString, startTime, endTime, prePlannedEventsTimeSlots);
  const gptNodes: DestinationNode[] = createGptNodes(prePlannedEventsTimeSlots);
  return tripFlowNodes.concat(gptNodes);
}

function createGptNodes(prePlannedEventsTimeSlots: Map<string, [number, number, string][]>) {
  const nodes: DestinationNode[] = [];
  let dummyId: number = -1;
  prePlannedEventsTimeSlots.forEach((startEndEvents, date) => {
    startEndEvents.forEach(([prePlannedStartTime, prePlannedEndTime, eventName]) => {
      const duration: number = prePlannedEndTime - prePlannedStartTime;
      // dummy ids
      const destination: Destination = new Destination(
        dummyId, 
        eventName, 
        prePlannedStartTime, 
        prePlannedEndTime, 
        duration,
        [],
        [],
        DUMMY_GPT_LONGITUDE,
        DUMMY_GPT_LATITUDE,
        true
      );
      dummyId--;

      // 0 for timeslot multiplier
      const node: DestinationNode | null = destination.generateNode(date, 0, prePlannedEventsTimeSlots, true); 
      if (node != null) {
        gptDestinationNumber++;
        nodes.push(node);
        earliestNodes.push(node);
      }    
    });
  });
  return nodes;
}
function createTripFlowNodes(travellingDays: number, destinations: Destination[], startDateString: string, endDateString: string, startTime: number, endTime: number, prePlannedEventsTimeSlots: Map<string, [number, number, string][]>): DestinationNode[] {
  const nodes: DestinationNode[] = [];

  for (const destination of destinations) {
    const numTimeSlots: number = destination.calculateNumTimeSlots();
    let earliestPossibleNode: boolean = true;
    const destinationTourDuration: number = destination.getTourDuration();
    for (let d = 0; d < travellingDays; d++) {
      for (let i = 0; i < numTimeSlots; i++) {
        const currStringDate: string = addDaysToStringDate(startDateString, d);
        const node: DestinationNode | null = destination.generateNode(currStringDate, i, prePlannedEventsTimeSlots, false); 
        if (node == null) {
          continue;
        }
        nodes.push(node);
        // if this node falls within the user specified time range and COULD be the earliestPossibleNode for the particular Destination 
        const nodeStartTime: number = node.getStartTime();
        if ((nodeStartTime >= startTime) && (nodeStartTime + destinationTourDuration <= endTime) && (earliestPossibleNode)) {
          earliestNodes.push(node);
          earliestPossibleNode = false;
        }
      }
    }  
  }

  return nodes;
}
  
// Export the functions
export {};
  