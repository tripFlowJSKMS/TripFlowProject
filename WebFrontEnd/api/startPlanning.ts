import axios from "axios";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";
import { startPlanningOutputSchema } from "@/lib/types/startPlanningTypes";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = "http://localhost:3000";

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

  if (!isValidBody(response.data, startPlanningOutputSchema)) {
    throw new Error("Invalid response");
  }
  const destinations = response.data.destinations;
  return destinations;
}
