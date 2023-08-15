import { z } from "zod";
import { Destination } from "../BackEnd/Algorithm/Destination";
import { Preference } from "../MobileFrontEnd/store/onboardingStore";

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

export const preferenceEnum = z.enum([
  "Sports",
  "Music",
  "Outdoors",
  "Food",
  "Art",
  "Shopping",
]);

const scheduleEnum = z.enum(["Relaxed", "Normal", "Packed"]);

const recalibrateEnum = z.enum(["EarlyOrLate"]);

export const registrationDetailsType = z.object({
  username: z.string(),
  startingTime: z.number(),
  endingTime: z.number(),
  preferences: z.array(z.string()),
});

export const generateDesirableDestinationsType = z.object({
  // Number will indicate how many days they will spend on vacation. Default is 1 for MVP
  numberOfDays: z.number(),
  scheduleType: z.string(),
});

export const itineraryDetailsType = z.object({
  departureLocation: z.string(),
  endLocation: z.string(),
  scheduleType: z.string(),
});

export const tripFlowAlgorithmType = z.object({
  destinationArr: z.array(destinationType),
});

export const recalibrateItineraryType = z.object({
  issue: recalibrateEnum,
  destinationsVisitedSoFar: z.array(destinationType),
  currentTime: z.number(),
});

export type PreferenceType = z.infer<typeof preferenceEnum>;
export type ScheduleType = z.infer<typeof scheduleEnum>;
export type RecalibrateType = z.infer<typeof recalibrateEnum>;
export type RegistrationDetailsType = z.infer<typeof registrationDetailsType>;
export type GenerateDesirableDestinationsType = z.infer<
  typeof generateDesirableDestinationsType
>;
export type ItineraryDetailsType = z.infer<typeof itineraryDetailsType>;
export type TripFlowAlgorithmType = z.infer<typeof tripFlowAlgorithmType>;
export type RecalibrateItineraryType = z.infer<typeof recalibrateItineraryType>;
