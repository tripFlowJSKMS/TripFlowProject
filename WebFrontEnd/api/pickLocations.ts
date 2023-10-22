import axios from "axios";
import { EditLocationsInputType } from "../../Shared/types/pickLocations";
import { editLocationsInputSchema } from "@/lib/types/pickLocationsTypes";
import { isValidBody } from "@/lib/utils";


export async function pickLocations(selectedDestinations: EditLocationsInputType ) {
  const response = await axios.post(
    "http://localhost:3000/api/pick-locations-page",
    {
      selectedDestinations
    },
  );

  if (!isValidBody(response.data.destinations, editLocationsInputSchema)) {
    return Response.json({ message: "Invalid response"});
  }

  return response.data.destinations;
}
