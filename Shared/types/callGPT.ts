import { z } from "zod";

export type GPTPromptType = z.infer<typeof gptPromptSchema>;

export const gptPromptSchema= z.string();

export type GPTResponseType = z.infer<typeof gptResponseSchema>;

export const gptResponseSchema = z.string();

export type GPTScrapedEventType = z.infer<typeof gptScrapedEventSchema>;

export const gptScrapedEventSchema = z.object({
    date: z.string(),
    time: z.string(),
    event: z.string(),
})

