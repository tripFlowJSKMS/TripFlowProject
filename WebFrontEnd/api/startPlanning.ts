import axios from "axios";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";
import { startPlanningOutputSchema } from "@/lib/types/startPlanningTypes";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function startPlanning({
  startDate,
  endDate,
  startTime,
  endTime,
  departureLocation,
  destinationLocation,
  paxNumber,
  dietaryPreference,
  pace,
  areasOfInterests,
}: GenerateDesirableDestinationsType) {

  console.log("error arrives here");
  console.log(`${API_URL}/api/start-planning-page`);
  const response = await axios.post(
    `${API_URL}/api/start-planning-page`,
    {
      startDate,
      endDate,
      startTime,
      endTime,
      departureLocation,
      destinationLocation,
      paxNumber,
      dietaryPreference,
      pace,
      areasOfInterests,
    },
  );

  if (!isValidBody(response.data.destinations, startPlanningOutputSchema)) {
    throw new Error("Invalid response");
  }
  const destinations: DestinationType[] = response.data.destinations;
  return destinations;
}
