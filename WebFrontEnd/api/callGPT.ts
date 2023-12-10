import axios from "axios";
import { isValidBody } from "@/lib/utils";
import { GPTPromptType, GPTResponseType } from "../../Shared/types/callGPT";
import { gptPromptSchema } from "../lib/types/callGPT";

export async function callGPT(prompt: GPTPromptType) {
    console.log("API call initiated");
    const response = await axios.post(
        "http://localhost:3000/api/callGPT",
        {
            prompt
        },
    );
    console.log(response);

    // is it response or sth nested in response?
    if (!isValidBody(response, gptPromptSchema)) {
        throw new Error("Invalid response");
    }
    const gptResponse: GPTResponseType = response;
    return gptResponse;
}