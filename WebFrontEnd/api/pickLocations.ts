import axios from "axios";
import { EditLocationsInputType } from "../../Shared/types/pickLocations";
import { editLocationsInputSchema } from "@/lib/types/pickLocationsTypes";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function pickLocations(selectedDestinations: EditLocationsInputType ) {
  const response = await axios.post(
    `${API_URL}/api/pick-locations-page`,
    {
      selectedDestinations
    },
  );

  if (!isValidBody(response.data.destinations, editLocationsInputSchema)) {
    throw new Error("Invalid response");
  }
  const destinations: DestinationType[] = response.data.destinations;
  return destinations;
}
