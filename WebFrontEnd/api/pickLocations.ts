import axios from "axios";
import { PickLocationsOutputType } from "../../Shared/types/pickLocations";
import { EditLocationsInputType } from "../../Shared/types/pickLocations";
import { editLocationsInputSchema } from "@/lib/types/pickLocationsTypes";


export async function pickLocations(selectedDestinations: EditLocationsInputType ) {
  const response = await axios.post(
    "http://localhost:3000/api/pick-locations-page",
    {
      selectedDestinations
    },
  );

  console.log(response);

  // Not the correct typing here. need to change
  const destinations: EditLocationsInputType = editLocationsInputSchema.parse(response.data.destinations);
  return destinations;
}
