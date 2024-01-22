import axios from "axios";
import { generatedItinerarySchema } from "../lib/types/editLocationsTypes";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = "http://localhost:3000"

export async function editLocations(selectedDestinations: DestinationType[] ) {
    const response = await axios.post(
        `${API_URL}/api/planning-page`,
        {
            selectedDestinations
        },
    );
    // Note that the name itinerary is sensitive and based on the name of the array defined in the backend API
    if (!isValidBody(response.data.itinerary, generatedItinerarySchema)) {
        throw new Error("Invalid response");
    }
    const itinerary: Array<{ destination: DestinationType; stringDate: string; startingTime: number; endingTime: number }> = response.data.itinerary;
    return itinerary;
}