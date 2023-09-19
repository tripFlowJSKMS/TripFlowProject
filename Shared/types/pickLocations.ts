import { z } from "zod";
import {
  destinationType,
} from "../types";

export const pickLocationsOutputSchema = z.array(destinationType);

export type PickLocationsOutputType = z.TypeOf<typeof pickLocationsOutputSchema>;