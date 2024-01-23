import axios from "axios";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";
import { isValidBody } from "@/lib/utils";
import { startPlanningOutputSchema } from "@/types/startPlanningTypes";

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
  try {
    const response = await axios.post(`${API_URL}/api/start-planning-page`, {
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
    });

    if (!isValidBody(response.data, startPlanningOutputSchema)) {
      throw new Error("Invalid response body");
    }
    const destinations = response.data.destinations;

    return destinations;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid input or API error");
  }
}
