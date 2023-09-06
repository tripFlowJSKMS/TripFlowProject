import { z } from "zod";
import { Destination } from "../BackEnd/Algorithm/Destination";

export type DestinationType = Destination;

// If there is an error related to this, please look at BackEnd/Algorithm/main.ts tripflowAlgorithm function
// Am i using zod correctly since Zod's destinationType isnt the same as Destination class
export const destinationType = z.object({
  id: z.number(),
  name: z.string(),
  openingTime: z.number(),
  closingTime: z.number(),
  tourDuration: z.number(),
  characteristics: z.array(z.string()),
  longitude: z.number(),
  latitude: z.number(),
});

export const areasOfInterestEnum = z.enum(["Sports", "Music","Outdoors", "Food", "Art", "Shopping"]);

export const dietaryPreferenceEnum = z.enum(["Normal", "Halal", "Vegetarian", "Vegan"]);

export const paxNumberEnum = z.enum(["1", "2", "3-5", "6 or more"]);

const scheduleEnum = z.enum(["Relaxed", "Normal", "Packed"]);

const recalibrateEnum = z.enum(["EarlyOrLate"]);

export const registrationDetailsType = z.object({
  username: z.string(),
});

export const generateDesirableDestinationsType = z.object({
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

export const tripFlowAlgorithmType = z.object({
  destinationArr: z.array(destinationType),
});

export const recalibrateItineraryType = z.object({
  issue: recalibrateEnum,
  destinationsVisitedSoFar: z.array(destinationType),
  currentTime: z.number(),
});

export const bumpNeglectedPreferencesType = z.object({
  selectedDestinationArr: z.array(destinationType),
});

export type AreasOfInterestType = z.infer<typeof areasOfInterestEnum>;
export type DietaryPreferenceType = z.infer<typeof dietaryPreferenceEnum>;
export type ScheduleType = z.infer<typeof scheduleEnum>;
export type RecalibrateType = z.infer<typeof recalibrateEnum>;
export type RegistrationDetailsType = z.infer<typeof registrationDetailsType>;
export type GenerateDesirableDestinationsType = z.infer<
  typeof generateDesirableDestinationsType
>;
export type TripFlowAlgorithmType = z.infer<typeof tripFlowAlgorithmType>;
export type RecalibrateItineraryType = z.infer<typeof recalibrateItineraryType>;
export type BumpNeglectedPreferencesType = z.infer<
  typeof bumpNeglectedPreferencesType
>;
