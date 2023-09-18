import { z } from "zod";
import {
  paxNumberEnum,
  dietaryPreferenceEnum,
  scheduleEnum,
  areasOfInterestEnum,
  destinationType,
} from "../types";

export const startPlanningOutputSchema = z.array(destinationType);

export type StartPlanningOutputType = z.TypeOf<typeof startPlanningOutputSchema>;

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

export type GenerateDesirableDestinationsType = z.TypeOf<typeof generateDesirableDestinationsSchema>;
