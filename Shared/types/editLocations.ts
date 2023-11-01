import { z } from "zod";
import {
  destinationSchema,
} from "../types";

export const generatedItinerarySchema = z.array(z.object({
  destination: destinationSchema,
  startingTime: z.number(),
  endingTime: z.number(),  
}));

export type GeneratedItineraryType = z.infer<typeof generatedItinerarySchema>;

export const tripFlowAlgorithmSchema = z.array(destinationSchema);

export type TripFlowAlgorithmType = z.infer<typeof tripFlowAlgorithmSchema>;

export const editLocationsOutputSchema = z.array(destinationSchema);

export type EditLocationsOutputType = z.infer<typeof editLocationsOutputSchema>;