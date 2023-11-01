import axios from "axios";
import { generatedItinerarySchema } from "../lib/types/editLocationsTypes";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";

export async function editLocations(selectedDestinations: DestinationType[] ) {
    const response = await axios.post(
        "http://localhost:3000/api/planning-page",
        {
            selectedDestinations
        },
    );

    if (!isValidBody(response.data.destinations, generatedItinerarySchema)) {
        throw new Error("Invalid response");
    }
    const destinations: Array<{ destination: DestinationType; startingTime: number; endingTime: number }> = response.data.destinations;
    return destinations;
}