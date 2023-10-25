import { z } from "zod"

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


