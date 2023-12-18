import { z } from "zod";

export const gptPromptSchema= z.string();

export const gptResponseSchema = z.string();

export const gptScrapedEventSchema = z.object({
    date: z.string(),
    time: z.string(),
    event: z.string(),
})

