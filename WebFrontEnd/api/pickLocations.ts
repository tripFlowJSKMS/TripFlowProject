import axios from "axios";
import { EditLocationsInputType } from "../../Shared/types/pickLocations";
import { editLocationsInputSchema } from "@/lib/types/pickLocationsTypes";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";


export async function pickLocations(selectedDestinations: EditLocationsInputType ) {
  const response = await axios.post(
    "http://localhost:3000/api/pick-locations-page",
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
