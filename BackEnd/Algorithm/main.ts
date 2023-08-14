import z from "zod";
import "dotenv/config";
import {
  getAllInformation,
  getAllItinerary,
} from "../../Shared/prisma/prismaCode/main";
import { Destination } from "./Destination";
import { planItinerary } from "./helperFunctions";
import { 
  registrationDetailsType, 
  RegistrationDetailsType,
  generateDesirableDestinationsType,
  GenerateDesirableDestinationsType,
  itineraryDetailsType,
  ItineraryDetailsType,
  tripFlowAlgorithmType,
  TripFlowAlgorithmType,
  recalibrateItineraryType,
  RecalibrateItineraryType,
  RecalibrateType,
} from "../../Shared/types";

const RELAXED_MULTIPLIER: number = 1.25;
const PACKED_MULTIPLIER: number = 0.75;

// Let's assume for every additional day they are touring, we generate 10 more destinations for them to choose from
const GENERATE_DESTINATIONS_MULTIPLIER: number = 10;
let name: string;
let startTime: number;
let endTime: number;
let departureLocation: string;
let endLocation: string;
let preferences: string[];
let numberOfDays: number = 0;
let scheduleType: string;
let desirableDestinations: Destination[];

export async function tripFlowAlgorithm(details: TripFlowAlgorithmType): Promise<[Destination, number, number][]> {
  // passed in as JSON, transform it back to Destination class
  const destinationArr: Destination[] = details.destinationArr.map(details => {
    const { id, name, openingTime, closingTime, tourDuration, characteristics, longitude, latitude } = details;
    return new Destination(id, name, openingTime, closingTime, tourDuration, characteristics, longitude, latitude);
  });  
  let itinerary: [Destination, number, number][] = [];
  try {
    itinerary = planItinerary(destinationArr, startTime, endTime)
  } catch (error) {
    console.error("Error validating itinerary details:", error);
  }
  return itinerary;
}

export async function generateDesirableDestinations(details: GenerateDesirableDestinationsType): Promise<Destination[]> {

  try {
    const validatedDetails: GenerateDesirableDestinationsType = generateDesirableDestinationsType.parse(details);
    numberOfDays = validatedDetails.numberOfDays;
    scheduleType = validatedDetails.scheduleType;
  } catch (error) {
    console.error("Error validating generate desirable destinations details:", error);
  }
  
  desirableDestinations = [];

  try {
    const itineraryData: any[] = await getAllItinerary();
    itineraryData.forEach((itinerary) => {
      const {
        id,
        locationName,
        openingTime,
        closingTime,
        timeRequired,
        characteristics,
        longitude,
        latitude,
      } = itinerary;

      let actualTimeRequired: number = timeRequired;

      if (scheduleType == "Packed") {
        actualTimeRequired *= PACKED_MULTIPLIER;
      } else if (scheduleType == "Relaxed") {
        actualTimeRequired *= RELAXED_MULTIPLIER;
      } else {
        actualTimeRequired = timeRequired;
      }

      const destination: Destination = new Destination(
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
      destination.setWeight(preferences);

      desirableDestinations.push(destination);
    });
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
  }

  desirableDestinations.sort((destinationA, destinationB) => {
    const weightA = destinationA.getWeight();
    const weightB = destinationB.getWeight();
    return weightB - weightA; // Sort in descending order
  });

  const totalNumberRecommended: number = numberOfDays * GENERATE_DESTINATIONS_MULTIPLIER;

  desirableDestinations = desirableDestinations.slice(0, totalNumberRecommended);
  
  return desirableDestinations;
}

export async function itineraryDetails(details: ItineraryDetailsType): Promise<Destination[]> {
  try {
    departureLocation = details.departureLocation;
    endLocation = details.endLocation;
    scheduleType = details.scheduleType;
    const numberOfDays: number = 1; // fixed as 1 for MVP, this will be a parameter passed in from frontend next time
    const inputData = { numberOfDays, scheduleType };
    return generateDesirableDestinations(inputData);
  } catch (error) {
    console.error("Error validating itinerary details:", error);
  }
}

export async function registrationDetails(details: RegistrationDetailsType) {
  try {
    name = details.username;
    startTime = details.startingTime;
    endTime = details.endingTime;
    preferences = details.preferences;
  } catch (error) {
    console.error("Error validating registration details:", error);
  }
  
}

export async function recalibrate(details: RecalibrateItineraryType): Promise<[Destination, number, number][]> {
  const destinationsVisitedSoFar: Destination[] = details.destinationsVisitedSoFar.map(details => {
    const { id, name, openingTime, closingTime, tourDuration, characteristics, longitude, latitude } = details;
    return new Destination(id, name, openingTime, closingTime, tourDuration, characteristics, longitude, latitude);
  });  
  const issue: RecalibrateType = details.issue;
  if (issue == "EarlyOrLate") {
    const currentTime: number = details.currentTime;
    const remainingDestinations: Destination[] = desirableDestinations.filter(location => !destinationsVisitedSoFar.includes(location));
    let itinerary: [Destination, number, number][] = [];
    try {
      itinerary = planItinerary(remainingDestinations, currentTime, endTime);
    } catch (error) {
      console.error("Error validating itinerary details:", error);
    }
    return itinerary;
  } 
  return null;
}