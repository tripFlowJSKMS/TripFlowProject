import axios from "axios";
// import { PickLocationsOutputType } from "../../Shared/types/pickLocations";
import { EditLocationsInputType } from "../../Shared/types/pickLocations";
import { editLocationsInputSchema } from "@/lib/types/pickLocationsTypes";
import { isValidBody } from "@/lib/utils";


export async function pickLocations(body: EditLocationsInputType ) {
  const { selectedDestinations } = body;
  const response = await axios.post(
    "http://localhost:3000/api/pick-locations-page",
    {
      selectedDestinations
    },
  );

  console.log(response.data.destinations);
  // Not the correct typing here. need to change
  if (!isValidBody(response.data.destinations, editLocationsInputSchema)) {
    return Response.json({ message: "Invalid response"});
  }

  console.log(response.data.destinations);
  return response.data.destinations;

  // const destinations: EditLocationsInputType = editLocationsInputSchema.parse(response.data.destinations);
  // return destinations;
}
