import { z } from "zod";
import {
  destinationSchema,
} from "../types";

export const tripFlowAlgorithmType = z.array(destinationSchema);

export const pickLocationsOutputSchema = z.array(destinationSchema);

export type PickLocationsOutputType = z.TypeOf<typeof pickLocationsOutputSchema>;

export const editLocationsInputSchema = z.array(destinationSchema);

export type EditLocationsInputType = z.TypeOf<typeof editLocationsInputSchema>;