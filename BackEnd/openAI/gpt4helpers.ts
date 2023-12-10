// Function to create a text prompt from the JSON data
export default function createPromptFromData(data) {
    // Serialize the JSON object into a string in a way that makes sense for your use case
    // For example, you could create a summary, a list of events, etc.
    // This is a simple example that creates a list of events:
    let question = "Attached below is an itinerary plan. Could you list down each item in the following format if the details are available: Date, Time, Event\n";
    return question + data.prompt;
}

