import { z } from "zod";

export type GPTPromptType = z.infer<typeof gptPromptSchema>;

export const gptPromptSchema= z.string();

export type GPTResponseType = z.infer<typeof gptResponseSchema>;

export const gptResponseSchema = z.string();
