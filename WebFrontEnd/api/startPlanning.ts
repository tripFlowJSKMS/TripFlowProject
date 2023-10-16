import axios from "axios";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";
import { StartPlanningOutputType } from "../../Shared/types/startPlanning";
import { startPlanningOutputSchema } from "@/lib/types/startPlanningTypes";

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

  const destinations: StartPlanningOutputType = startPlanningOutputSchema.parse(response.data.destinations);
  return destinations;
}
