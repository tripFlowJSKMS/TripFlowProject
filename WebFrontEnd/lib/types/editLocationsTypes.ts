import { z } from "zod";
import { destinationType } from "./commonTypes";

export const generatedItinerarySchema = z.object({
  itinerary: z.array(
    z.object({
      destination: destinationType,
      stringDate: z.string(),
      startingTime: z.number(),
      endingTime: z.number(),
    }),
  ),
});
export const tripFlowAlgorithmSchema = z.array(destinationType);
