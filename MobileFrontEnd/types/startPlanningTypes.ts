import { z } from "zod";
import { destinationType } from "./commonTypes";

/**
 * BIG types import directly from shared
 * SMALL types (schema/enum) must redefine an exact copy in frontend folders
 */
export const areasOfInterestEnum = z.enum([
  "Sports",
  "Music",
  "Outdoors",
  "Food",
  "Art",
  "Shopping",
  "Adventure",
  "Nature",
  "Culture",
]);

export const startPlanningOutputSchema = z.object({
  destinations: z.array(destinationType),
});
