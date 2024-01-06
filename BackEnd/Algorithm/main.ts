import z from "zod";
import "dotenv/config";
import {
  getAllInformation,
  getAllDestinations,
} from "../../Shared/prisma/prismaCode/main";
import { Destination } from "./Destination";
import { 
  planItinerary,
  getDateFromString,
  calculateTotalTravellingDays,  
} from "./helperFunctions";
import {
  RegistrationDetailsType,
  RecalibrateItineraryType,
  RecalibrateType,
  DestinationType,
} from "../../Shared/types";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";
import { EditLocationsInputType } from "../../Shared/types/pickLocations";
import { TripFlowAlgorithmType } from "../../Shared/types/editLocations";
import { GPTScrapedEventType } from "../../Shared/types/callGPT";

const RELAXED_MULTIPLIER: number = 1.25;
const PACKED_MULTIPLIER: number = 0.75;

// Let's assume for every additional day they are touring, we generate 3 more destinations for them to choose from
const GENERATE_DESTINATIONS_MULTIPLIER: number = 3;
let name: string;
let startDate: string;
let endDate: string;
let startTime: number;
let endTime: number;
let departureLocation: string;
let destinationLocation: string;
let paxNumber: number;
let dietaryPreference: string;
let areasOfInterests: string[];
let pace: string;
let desirableDestinations: Destination[];
let selectedDestinations: Set<number>;
let selectedCharacteristics: Map<string, number>;
let dateTimePrePlannedEvents: Map<string, [string, string][]> = new Map();

export async function storePrePlannedEvents(events: GPTScrapedEventType[]) {
  events.forEach((prePlannedEvent) => {
    const {
      date,
      time, 
      event,
    } = prePlannedEvent; 

    let dateEvents = dateTimePrePlannedEvents.get(date) || [];
    dateEvents.push([time, event]);
    dateTimePrePlannedEvents.set(date, dateEvents);
  });
}

export async function tripFlowAlgorithm(
  details: TripFlowAlgorithmType
): Promise<
  Array<{ destination: Destination; startingTime: number; endingTime: number }>
> {
  const destinationArr: Destination[] = details.map(
    (details) => {
      const {
        id,
        name,
        openingTime,
        closingTime,
        tourDuration,
        characteristics,
        longitude,
        latitude,
      } = details;
      return new Destination(
        id,
        name,
        openingTime,
        closingTime,
        tourDuration,
        characteristics,
        longitude,
        latitude
      );
    }
  );
  let itinerary: Array<{
    destination: Destination;
    startingTime: number;
    endingTime: number;
  }> = [];
  try {
    itinerary = planItinerary(destinationArr, startDate, endDate, startTime, endTime, dateTimePrePlannedEvents);
  } catch (error) {
    console.error("Error validating itinerary details:", error);
  }
  return itinerary;
}

export async function generateDesirableDestinations(
  details: GenerateDesirableDestinationsType
): Promise<Destination[]> {
  try {
    startTime = details.startTime;
    endTime = details.endTime;
    startDate = details.startDate;
    endDate = details.endDate;
    departureLocation = details.departureLocation;
    destinationLocation = details.destinationLocation;
    switch (details.paxNumber) {
      case "1":
        paxNumber = 1;
        break;
      case "2":
        paxNumber = 2;
        break;
      case "3-5":
        paxNumber = 5;
        break;
      case "6 or more":
        // dummy value for group
        paxNumber = 10;
        break;
      default:
        break;
    }
    dietaryPreference = details.dietaryPreference;
    pace = details.pace;
    areasOfInterests = details.areasOfInterests;
  } catch (error) {
    console.error(
      "Error validating generate desirable destinations details:",
      error
    );
  }

  desirableDestinations = [];

  try {
    const destinationData: any[] = await getAllDestinations();
    destinationData.forEach((destination) => {
      const {
        id,
        locationName,
        openingTime,
        closingTime,
        timeRequired,
        characteristics,
        longitude,
        latitude,
      } = destination;

      let actualTimeRequired: number = timeRequired;

      if (pace == "Packed") {
        actualTimeRequired *= PACKED_MULTIPLIER;
      } else if (pace == "Relaxed") {
        actualTimeRequired *= RELAXED_MULTIPLIER;
      } else {
        actualTimeRequired = timeRequired;
      }

      const destinationData: Destination = new Destination(
        id,
        locationName,
        openingTime,
        closingTime,
        actualTimeRequired,
        characteristics.split(","),
        longitude,
        latitude
      );

      // change this as a parameter later
      destinationData.setWeight(areasOfInterests);

      desirableDestinations.push(destinationData);
    });
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
  }

  desirableDestinations.sort((destinationA, destinationB) => {
    const weightA = destinationA.getWeight();
    const weightB = destinationB.getWeight();
    return weightB - weightA; // Sort in descending order
  });

  const numberOfDays: number = calculateTotalTravellingDays(startDate, endDate);
  const totalNumberRecommended: number =
    numberOfDays * GENERATE_DESTINATIONS_MULTIPLIER;

  const desirableDestinationsCopy: Destination[] = desirableDestinations.slice(
    0,
    totalNumberRecommended
  );

  return desirableDestinationsCopy;
}

export async function registrationDetails(details: RegistrationDetailsType) {
  try {
    name = details.username;

    // preferences = details.preferences;
  } catch (error) {
    console.error("Error validating registration details:", error);
  }
}

export async function bumpNeglectedPreferences(
  details: EditLocationsInputType
): Promise<Destination[]> {

  // Always reinitialise this here so that when user presses back/refresh the destinations/characteristics do not get double counted
  selectedCharacteristics = new Map();
  selectedDestinations = new Set();
  // details contain all the locations initially selected by the user at the PickLocationsPage
  details.map((details) => {
    const { id, characteristics } = details;
    selectedDestinations.add(id);
    for (const characteristic of characteristics) {
      if (areasOfInterests.includes(characteristic)) {
        const currentValue = selectedCharacteristics.get(characteristic) ?? 0;
        selectedCharacteristics.set(characteristic, currentValue + 1);
      }
    }
  });

  let chosenFrequency: number | undefined = undefined;
  let characteristicLeastChosen: string = "";

  selectedCharacteristics.forEach((value, key) => {
    if (chosenFrequency === undefined || value < chosenFrequency) {
      chosenFrequency = value;
      characteristicLeastChosen = key;
    }
  });

  const neglectedDestinations: Destination[] = [];
  
  for (const destination of desirableDestinations) {
    if (selectedDestinations.has(destination.getId())) {
        continue;
    }    
    if (destination.getCharacteristics().includes(characteristicLeastChosen)) {
        neglectedDestinations.push(destination);
    }
  }

  return neglectedDestinations;
}

export async function recalibrate(
  details: RecalibrateItineraryType
): Promise<
  Array<{ destination: Destination; startingTime: number; endingTime: number }>
> {
  const destinationsVisitedSoFar: Destination[] =
    details.destinationsVisitedSoFar.map((details) => {
      const {
        id,
        name,
        openingTime,
        closingTime,
        tourDuration,
        characteristics,
        longitude,
        latitude,
      } = details;
      return new Destination(
        id,
        name,
        openingTime,
        closingTime,
        tourDuration,
        characteristics,
        longitude,
        latitude
      );
    });
  const issue: RecalibrateType = details.issue;
  if (issue == "EarlyOrLate") {
    const currentTime: number = details.currentTime;
    const remainingDestinations: Destination[] = desirableDestinations.filter(
      (location) => !destinationsVisitedSoFar.includes(location)
    );
    let itinerary: Array<{
      destination: Destination;
      startingTime: number;
      endingTime: number;
    }> = [];
    try {
      itinerary = planItinerary(remainingDestinations, startDate, endDate, startTime, endTime, dateTimePrePlannedEvents);
    } catch (error) {
      console.error("Error validating itinerary details:", error);
    }
    return itinerary;
  }
  // we will add more recalibrate cases in the future
  return [];
}
