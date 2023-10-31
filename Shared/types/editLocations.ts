import { z } from "zod";
import {
  destinationType,
} from "../types";

export const tripFlowAlgorithmSchema = z.array(destinationType);

export type TripFlowAlgorithmType = z.infer<typeof tripFlowAlgorithmSchema>;

export const editLocationsOutputSchema = z.array(destinationType);

export type EditLocationsOutputType = z.infer<typeof editLocationsOutputSchema>;