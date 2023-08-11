import { z } from "zod";

export class Destination {
  constructor(
    public id: number, 
    public name: string, 
    public openingTime: number, 
    public closingTime: number, 
    public tourDuration: number, 
    public characteristics: string[],
    public longitude: number, 
    public latitude: number
    ) {} 
}

export const destinationType = z.object({
  id: z.number(),
  name: z.string(),
  openingTime: z.number(),
  closingTime: z.number(),
  tourDuration: z.number(),
  characteristics: z.array(z.string()),
  longitude: z.number(),
  latitude: z.number()
});

const PreferenceEnum = z.enum([
  "Sports",
  "Music",
  "Outdoors",
  "Food",
  "Art",
  "Shopping",
]);

const scheduleEnum = z.enum([
  "Relaxed",
  "Normal",
  "Packed",
]);

export const registrationDetailsType = z.object({
  username: z.string(),
  startingTime: z.number(),
  endingTime: z.number(),
  preferences: z.array(z.string())
});

export const generateDesirableDestinationsType = z.object({
  // Number will indicate how many days they will spend on vacation. Default is 1 for MVP
  numberOfDays: z.number(),
  scheduleType: z.string()
}); 

export const itineraryDetailsType = z.object({
  departureLocation: z.string(),
  endLocation: z.string(),
  scheduleType: z.string()
});

export const tripFlowAlgorithmType = z.object({
  destinationArr: z.array(destinationType)
});

export type PreferenceType = z.infer<typeof PreferenceEnum>;
export type scheduleType = z.infer<typeof scheduleEnum>;
export type RegistrationDetailsType = z.infer<typeof registrationDetailsType>;
export type GenerateDesirableDestinationsType = z.infer<typeof generateDesirableDestinationsType>;
export type ItineraryDetailsType = z.infer<typeof itineraryDetailsType>;
export type TripFlowAlgorithmType = z.infer<typeof tripFlowAlgorithmType>;