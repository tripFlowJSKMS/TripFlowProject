import z from "zod";

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
  endingTime: z.number()
});

export type PreferenceType = z.infer<typeof PreferenceEnum>;
export type scheduleType = z.infer<typeof scheduleEnum>;
export type RegistrationDetailsType = z.infer<typeof registrationDetailsType>;