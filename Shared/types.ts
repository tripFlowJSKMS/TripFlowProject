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
  "Culture",
]);

export const dietaryPreferenceEnum = z.enum([
  "Normal",
  "Halal",
  "Vegetarian",
  "Vegan",
]);

export const destinationSchema = z.object({
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

export const itinerarySchema = z.array(
  z.object({
    destination: destinationSchema,
    stringDate: z.string(),
    startingTime: z.number(),
    endingTime: z.number(),
  })
);

export const paxNumberEnum = z.enum(["1", "2", "3-5", "6 or more"]);

export const scheduleEnum = z.enum(["Relaxed", "Normal", "Packed"]);

const recalibrateEnum = z.enum(["EarlyOrLate"]);

export const registrationDetailsType = z.object({
  username: z.string(),
});

export const recalibrateItineraryType = z.object({
  issue: recalibrateEnum,
  destinationsVisitedSoFar: z.array(destinationSchema),
  currentTime: z.number(),
});

export type AreasOfInterestType = z.infer<typeof areasOfInterestEnum>;
export type PaxNumberType = z.infer<typeof paxNumberEnum>;
export type DestinationType = z.infer<typeof destinationSchema>;
export type DietaryPreferenceType = z.infer<typeof dietaryPreferenceEnum>;
export type RecalibrateItineraryType = z.infer<typeof recalibrateItineraryType>;
export type RecalibrateType = z.infer<typeof recalibrateEnum>;
export type RegistrationDetailsType = z.infer<typeof registrationDetailsType>;
export type ScheduleType = z.infer<typeof scheduleEnum>;
export type ItineraryType = z.infer<typeof itinerarySchema>;
