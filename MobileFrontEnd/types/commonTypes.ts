import { z } from "zod";

export const AreasOfInterestEnum = z.enum([
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

export const DestinationSchema = z.object({
  id: z.number(),
  name: z.string(),
  openingTime: z.number(),
  closingTime: z.number(),
  tourDuration: z.number(),
  characteristics: z.array(AreasOfInterestEnum),
  longitude: z.number(),
  latitude: z.number(),
  TIME_SLOT: z.number(),
  DIST_TIME_RATIO: z.number(),
});
