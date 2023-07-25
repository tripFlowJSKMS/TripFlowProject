import "dotenv/config";
import {
  getAllInformation,
  getAllItinerary,
} from "../Shared/prisma/prismaCode/main";
import { Destination } from "./Destination";
import { planItinerary } from "./helperFunctions";
const RELAXED_MULTIPLIER: number = 1.25;
const PACKED_MULTIPLIER: number = 0.75;

export async function tripFlowAlgorithm(
  name: string,
  preferences: string,
  startTime: number,
  endTime: number,
  scheduleType: string,
) {
  const destinationArr: Destination[] = [];

  try {
    const itineraryData = await getAllItinerary();
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

      destinationArr.push(destination);
    });
    planItinerary(destinationArr, endTime, preferences.split(","), scheduleType);
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
  }
}

export async function generateDesirableDestinations(preferences: string, number: number) {


}
tripFlowAlgorithm("Ming Chun", "Nature,Music,Art", 480, 1320, "Packed");
