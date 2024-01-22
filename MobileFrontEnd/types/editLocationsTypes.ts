import { z } from "zod";
import { DestinationSchema } from "./commonTypes";

export const generatedItinerarySchema = z.object({
  itinerary: z.array(
    z.object({
      destination: DestinationSchema,
      stringDate: z.string(),
      startingTime: z.number(),
      endingTime: z.number(),
    }),
  ),
});
