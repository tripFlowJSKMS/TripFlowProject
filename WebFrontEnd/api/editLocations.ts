import axios from "axios";
import { TripFlowAlgorithmType } from "../../Shared/types/editLocations";
import { tripFlowAlgorithmSchema } from "@/lib/types/editLocationsTypes";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";

export async function editLocations(selectedDestinations: TripFlowAlgorithmType ) {
    const response = await axios.post(
        "http://localhost:3000/api/planning-page",
        {
            selectedDestinations
        },
    );

    if (!isValidBody(response.data.destinations, tripFlowAlgorithmSchema)) {
        return Response.json({ message: "Invalid response"});
    }
    const destinations: DestinationType[] = response.data.destinations;
    return destinations;
}