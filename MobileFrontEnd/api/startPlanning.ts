import axios from "axios";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";
import { startPlanningOutputSchema } from "@/types/startPlanningTypes";

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

  if (!isValidBody(response.data, startPlanningOutputSchema)) {
    return Response.json({ message: "Invalid response" });
  }
  const destinations: DestinationType[] = response.data.destinations;

  return response.data.destinations;
}
