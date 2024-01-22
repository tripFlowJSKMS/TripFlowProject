import axios from "axios";
import { isValidBody } from "@/lib/utils";
import { GPTPromptType } from "../../Shared/types/callGPT";
import { gptPromptSchema } from "@/types/callGPT";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function callGPT(prompt: GPTPromptType) {
  try {
    const response = await axios.post(`${API_URL}/api/callGPT`, {
      prompt,
    });

    if (!isValidBody(response.data, gptPromptSchema)) {
      throw new Error("Invalid response");
    }
    const gptResponse = response.data;

    return gptResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid input or API error");
  }
}
