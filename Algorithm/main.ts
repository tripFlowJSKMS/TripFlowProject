import "dotenv/config";
import { getAllItinerary } from "../Shared/prisma/prismaCode/main";

async function generateItinerary() {
  try {
    const itineraryData = await getAllItinerary();
    console.log(itineraryData);
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
  }
}

generateItinerary();
