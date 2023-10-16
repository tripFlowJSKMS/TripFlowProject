import { z } from "zod";
import { destinationType } from "./commonTypes";

export const pickLocationsOutputSchema = z.array(destinationType);

export const editLocationsInputSchema = z.object({
    selectedDestinationArr: z.array(destinationType),
});