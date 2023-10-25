import { DietaryPreferenceType, ScheduleType } from "../../Shared/types";

export const dietaryPreferenceOptions: Array<{
  name: string;
  value: DietaryPreferenceType;
}> = [
  { name: "Normal", value: "Normal" },
  { name: "Halal", value: "Halal" },
  { name: "Vegetarian", value: "Vegetarian" },
  { name: "Vegan", value: "Vegan" },
];

export const scheduleOptions: Array<{
  name: string;
  value: ScheduleType;
}> = [
  { name: "Relaxed", value: "Relaxed" },
  { name: "Normal", value: "Normal" },
  { name: "Packed", value: "Packed" },
];
