import { z } from "zod";

export const startPlanningOutputSchema = z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      weight: z.number(),
      openingTime: z.number(),
      closingTime: z.number(),
      tourDuration: z.number(),
      characteristics: z.array(z.string()),
      longitude: z.number(),
      latitude: z.number(),
      TIME_SLOT: z.number(),
      DIST_TIME_RATIO: z.number(),
    })
  );