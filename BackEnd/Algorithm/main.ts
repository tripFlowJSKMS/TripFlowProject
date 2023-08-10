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
  GenerateDesirableDestinationsType
} from "../../Shared/types";

const RELAXED_MULTIPLIER: number = 1.25;
const PACKED_MULTIPLIER: number = 0.75;

// Let's assume for every additional day they are touring, we generate 10 more destinations for them to choose from
const GENERATE_DESTINATIONS_MULTIPLIER: number = 10;
const destinationMap: { [name: string]: Destination } = {};
let name: string;
let startTime: number;
let endTime: number;

export async function tripFlowAlgorithm(
  destinationNameList: string[],
  startTime: number,
  endTime: number
): Promise<[string, number, number][]> {
  let itinerary: [string, number, number][] = [];
  try {
    const destinationArr: Destination[] = [];
    for (const destinationName of destinationNameList) {
      const destination: Destination = destinationMap[destinationName];
      destinationArr.push(destination);
    }
    itinerary = planItinerary(destinationArr, startTime, endTime);
  } catch (error) {}
  return itinerary;
}

export async function generateDesirableDestinations(details: GenerateDesirableDestinationsType): Promise<Destination[]> {
  let preferences: string[];
  let numberOfDays: number = 0;
  let scheduleType: string;

  try {
    const validatedDetails = generateDesirableDestinationsType.parse(details);
    preferences = validatedDetails.preferences;
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

export async function registrationDetails(details: RegistrationDetailsType) {
  try {
    const validatedDetails = registrationDetailsType.parse(details);
    name = validatedDetails.username;
    startTime = validatedDetails.startingTime;
    endTime = validatedDetails.endingTime;
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
