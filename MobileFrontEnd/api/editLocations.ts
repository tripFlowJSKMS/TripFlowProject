import axios from "axios";
import { isValidBody } from "@/lib/utils";
import { DestinationType } from "../../Shared/types";
import { generatedItinerarySchema } from "@/types/editLocationsTypes";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function editLocations(selectedDestinations: DestinationType[]) {
  try {
    const response = await axios.post(`${API_URL}/api/planning-page`, {
      selectedDestinations,
    });

    if (!isValidBody(response.data, generatedItinerarySchema)) {
      throw new Error("Invalid response");
    }
    const itinerary = response.data.itinerary;

    return itinerary;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid input or API error");
  }
}
