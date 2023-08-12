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
  // Destination,
  destinationType,
} from "../../Shared/types";

const RELAXED_MULTIPLIER: number = 1.25;
const PACKED_MULTIPLIER: number = 0.75;

// Let's assume for every additional day they are touring, we generate 10 more destinations for them to choose from
const GENERATE_DESTINATIONS_MULTIPLIER: number = 10;
const destinationMap: { [name: string]: Destination } = {};
let name: string;
let startTime: number;
let endTime: number;
let departureLocation: string;
let endLocation: string;
let pace: string;
let preferences: string[];
let numberOfDays: number = 0;
let scheduleType: string;

export async function tripFlowAlgorithm(details: TripFlowAlgorithmType): Promise<[Destination, number, number][]> {
  const validatedDetails = tripFlowAlgorithmType.parse(details);
  // const destinationArr: Destination[] = validatedDetails.destinationArr;
  let itinerary: [Destination, number, number][] = [];
  try {
    // itinerary = planItinerary(destinationArr, startTime, endTime);
  } catch (error) {}
  return itinerary;
}

export async function generateDesirableDestinations(details: GenerateDesirableDestinationsType): Promise<Destination[]> {

  try {
    const validatedDetails = generateDesirableDestinationsType.parse(details);
    numberOfDays = validatedDetails.numberOfDays;
    scheduleType = validatedDetails.scheduleType;
  } catch (error) {
    console.error("Error validating generate desirable destinations details:", error);
  }
  
  let destinationArr: Destination[] = [];

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

      destinationArr.push(destination);
    });
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
  }

  destinationArr.sort((destinationA, destinationB) => {
    const weightA = destinationA.getWeight();
    const weightB = destinationB.getWeight();
    return weightB - weightA; // Sort in descending order
  });

  const totalNumberRecommended: number = numberOfDays * GENERATE_DESTINATIONS_MULTIPLIER;

  destinationArr = destinationArr.slice(0, totalNumberRecommended);
  
  return destinationArr;
}

export async function itineraryDetails(details: ItineraryDetailsType) {
  try {
    const validatedDetails = itineraryDetailsType.parse(details);
    departureLocation = validatedDetails.departureLocation;
    endLocation = validatedDetails.endLocation;
    scheduleType = validatedDetails.scheduleType;
    const numberOfDays: number = 1; // fixed as 1 for MVP, this will be a parameter passed in from frontend next time
    const inputData = { numberOfDays, scheduleType };
    generateDesirableDestinations(inputData);
  } catch (error) {
    console.error("Error validating itinerary details:", error);
  }
}

export async function registrationDetails(details: RegistrationDetailsType) {
  try {
    const validatedDetails = registrationDetailsType.parse(details);
    name = validatedDetails.username;
    startTime = validatedDetails.startingTime;
    endTime = validatedDetails.endingTime;
    preferences = validatedDetails.preferences;
  } catch (error) {
    console.error("Error validating registration details:", error);
  }
  
}

// async function run() {
//   try {
//     const userDetails: RegistrationDetailsType = {
//       username: "QH",
//       startingTime: 600,
//       endingTime: 1800,
//     };
//     await registrationDetails(userDetails);

//     const destinationNames = await generateDesirableDestinations(
//       ["Nature", "Music", "Art"],
//       4,
//       "Normal"
//     );
//     const result = await tripFlowAlgorithm(
//       destinationNames,
//       startTime,
//       endTime
//     );
//     console.log(result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// run();