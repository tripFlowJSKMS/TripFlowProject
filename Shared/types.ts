import { z } from "zod";

export const areasOfInterestEnum = z.enum([
  "Sports",
  "Music",
  "Outdoors",
  "Food",
  "Art",
  "Shopping",
  "Adventure",
  "Nature",
  "Culture"
]);

export const dietaryPreferenceEnum = z.enum([
  "Normal",
  "Halal",
  "Vegetarian",
  "Vegan",
]);

export const destinationType = z.object({
  id: z.number(),
  name: z.string(),
  openingTime: z.number(),
  closingTime: z.number(),
  tourDuration: z.number(),
  characteristics: z.array(areasOfInterestEnum),
  longitude: z.number(),
  latitude: z.number(),
  TIME_SLOT: z.number(),
  DIST_TIME_RATIO: z.number(),
});


export const paxNumberEnum = z.enum(["1", "2", "3-5", "6 or more"]);

export const scheduleEnum = z.enum(["Relaxed", "Normal", "Packed"]);

const recalibrateEnum = z.enum(["EarlyOrLate"]);

export const registrationDetailsType = z.object({
  username: z.string(),
});

export const tripFlowAlgorithmType = z.object({
  destinationArr: z.array(destinationType),
});

export const recalibrateItineraryType = z.object({
  issue: recalibrateEnum,
  destinationsVisitedSoFar: z.array(destinationType),
  currentTime: z.number(),
});

export type AreasOfInterestType = z.infer<typeof areasOfInterestEnum>;
export type TripFlowAlgorithmType = z.infer<typeof tripFlowAlgorithmType>;
export type PaxNumberType = z.infer<typeof paxNumberEnum>;
export type DestinationType = z.infer<typeof destinationType>;
export type DietaryPreferenceType = z.infer<typeof dietaryPreferenceEnum>;
export type RecalibrateItineraryType = z.infer<typeof recalibrateItineraryType>;
export type RecalibrateType = z.infer<typeof recalibrateEnum>;
export type RegistrationDetailsType = z.infer<typeof registrationDetailsType>;
export type ScheduleType = z.infer<typeof scheduleEnum>;
