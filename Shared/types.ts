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

const 

export type PreferenceType = z.infer<typeof PreferenceEnum>;
export type scheduleType = z.infer<typeof scheduleEnum>;