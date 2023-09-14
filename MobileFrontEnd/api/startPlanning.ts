import axios from "axios";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";

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

  const destinations = response.data.destinations;
}
