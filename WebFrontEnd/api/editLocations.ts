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
    // Note that the name itinerary is sensitive and based on the name of the array defined in the backend API
    if (!isValidBody(response.data.itinerary, generatedItinerarySchema)) {
        throw new Error("Invalid response");
    }
    const itinerary: Array<{ destination: DestinationType; startingTime: number; endingTime: number }> = response.data.itinerary;
    return itinerary;
}