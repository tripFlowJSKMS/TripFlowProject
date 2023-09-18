import { z } from "zod";

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
]);

export const startPlanningOutputSchema = z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      weight: z.number(),
      openingTime: z.number(),
      closingTime: z.number(),
      tourDuration: z.number(),
      characteristics: z.array(areasOfInterestEnum),
      longitude: z.number(),
      latitude: z.number(),
      TIME_SLOT: z.number(),
      DIST_TIME_RATIO: z.number(),
    })
  );