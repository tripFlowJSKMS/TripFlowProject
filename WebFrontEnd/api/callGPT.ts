import axios from "axios";
import { isValidBody } from "@/lib/utils";
import { GPTPromptType, GPTResponseType } from "../../Shared/types/callGPT";
import { gptPromptSchema } from "../lib/types/callGPT";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = "http://localhost:3000";

export async function callGPT(prompt: GPTPromptType) {
    const response = await axios.post(
        `${API_URL}/api/callGPT`,
        {
            prompt
        },
    );

    if (!isValidBody(response.data, gptPromptSchema)) {
        throw new Error("Invalid response");
    }
    
    const gptResponse: GPTResponseType = response.data;
    console.log(gptResponse);
    return gptResponse;
}