import { z } from "zod";
import { destinationType } from "./commonTypes";

export const generatedItinerarySchema = z.array(z.object({
    destination: destinationType,
    startingTime: z.number(),
    endingTime: z.number(),  
  }));

export const tripFlowAlgorithmSchema = z.array(destinationType);
