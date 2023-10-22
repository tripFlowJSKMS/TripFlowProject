import axios from "axios";
import { TripFlowAlgorithmType } from "../../Shared/types/editLocations";
import { tripFlowAlgorithmSchema } from "@/lib/types/editLocationsTypes";
import { isValidBody } from "@/lib/utils";

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
    return response.data.destinations;
}