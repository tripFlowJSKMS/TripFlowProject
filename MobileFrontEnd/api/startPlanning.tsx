import axios from "axios";
import { GenerateDesirableDestinationsType } from "shared/types";

const destinationArray: [] = [];

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
    "http://localhost:3000/api/start-planning",
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

  generateDestinations(response);
}
