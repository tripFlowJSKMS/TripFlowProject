import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import z from "zod";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberToTime(num: number) {
  if (num < 0) {
    return null;
  }
  let numInOneDay = num;
  if (num >= 1440) {
    numInOneDay = num % 1440;
  }
  const rawHours = Math.floor(numInOneDay / 60);
  const minutes = numInOneDay % 60;
  let hours = rawHours;
  let suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}

export async function register(
  username,
  startingTime,
  endingTime,
  preferences,
) {
  preferences = preferences
    .filter((preference) => preference.selected)
    .map((preferences) => preferences.name);
  const response = await axios.post("http://localhost:3000/api/register", {
    username,
    startingTime,
    endingTime,
    preferences,
  });
}

const startPlanningOutputSchema = z.array(
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
  }),
);

export async function startPlanning({
  startDate,
  endDate,
  startTime,
  endTime,
  departureLocation,
  destinationLocation,
  paxNumber,
  dietaryPreference,
  pace,
  areasOfInterests,
}: GenerateDesirableDestinationsType) {
  const response = await axios.post(
    "http://localhost:3000/api/start-planning",
    {
      startDate,
      endDate,
      startTime,
      endTime,
      departureLocation,
      destinationLocation,
      paxNumber,
      dietaryPreference,
      pace,
      areasOfInterests,
    },
  );
  const destinations = startPlanningOutputSchema.parse(
    response.data.destinations,
  );
  return destinations;
}
