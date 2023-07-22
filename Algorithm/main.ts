import "dotenv/config";
import {
  getAllInformation,
  getAllItinerary,
} from "../Shared/prisma/prismaCode/main";
import { Destination } from "./Destination";
import { planItinerary } from "./helperFunctions";

export async function tripFlowAlgorithm(
  name: string,
  preferences: string,
  startTime: number,
  endTime: number
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
      const destination: Destination = new Destination(
        id,
        locationName,
        openingTime,
        closingTime,
        timeRequired,
        characteristics.split(","),
        longitude,
        latitude
      );
      destinationArr.push(destination);
    });
    planItinerary(destinationArr, endTime, preferences.split(","));
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
  }
}

tripFlowAlgorithm("Ming Chun", "Food,Music", 480, 1320);
