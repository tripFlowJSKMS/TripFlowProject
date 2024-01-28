import axios from "axios";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = "http://localhost:3000";

export async function processFile(formData: FormData) {
    try {
        const response = await axios.post(
            `${API_URL}/api/processFile`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data.textContent
    } catch (error) {
        console.error("Error calling processFile API:", error);
    }
}