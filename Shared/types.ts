import z from "zod";

const PreferenceEnum = z.enum([
  "Sports",
  "Music",
  "Outdoors",
  "Food",
  "Art",
  "Shopping",
]);

export type PreferenceType = z.infer<typeof PreferenceEnum>;
