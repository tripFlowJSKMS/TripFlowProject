import { z } from "zod";
import {
  paxNumberEnum,
  dietaryPreferenceEnum,
  scheduleEnum,
  areasOfInterestEnum,
} from "../types";

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

export type StartPlanningOutputType = z.infer<typeof startPlanningOutputSchema>;

export const generateDesirableDestinationsSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  departureLocation: z.string(),
  destinationLocation: z.string(),
  paxNumber: paxNumberEnum,
  dietaryPreference: dietaryPreferenceEnum,
  pace: scheduleEnum,
  areasOfInterests: z.array(areasOfInterestEnum),
});

export type GenerateDesirableDestinationsType = z.infer<
  typeof generateDesirableDestinationsSchema
>;
