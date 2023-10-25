import axios from "axios";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";
import { startPlanningOutputSchema } from "@/lib/types/startPlanningTypes";
import { isValidBody } from "@/lib/utils";

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
    "http://localhost:3000/api/start-planning-page",
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
    return Response.json({ message: "Invalid response"});
  }
  return response.data.destinations;
}
