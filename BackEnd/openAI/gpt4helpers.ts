// Function to create a text prompt from the JSON data
export default function createPromptFromData(data) {
    // Serialize the JSON object into a string in a way that makes sense for your use case
    // For example, you could create a summary, a list of events, etc.
    // This is a simple example that creates a list of events:
    let prompt = "Here is the schedule of events:\n";
    data.forEach(item => {
        prompt += `Date: ${item[" "] || "Not specified"}, Time: ${item["時間"]}, Location: ${item["地點"]}, Activity: ${item["活動"]}, Attendees: ${item["我行參加人員"] || item["客戶主要參加人員"] || "Not specified"}\n`;
    });
    return prompt;
}

