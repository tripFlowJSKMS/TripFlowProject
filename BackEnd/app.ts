import { Destination } from "./Algorithm/Destination";
import {
  RegistrationDetailsType,
  registrationDetailsType,
  RecalibrateItineraryType,
  recalibrateItineraryType,
} from "../Shared/types";
import { GenerateDesirableDestinationsType } from "../Shared/types/startPlanning";
import { generateDesirableDestinationsSchema } from "../Shared/types/startPlanning";
import { EditLocationsInputType, tripFlowAlgorithmType } from "../Shared/types/pickLocations";
import { editLocationsInputSchema } from "../Shared/types/pickLocations";
// import xlsx from 'xlsx';
import express from "express";
// import multer from "multer";
import { recalibrate, storePrePlannedEvents, tripFlowAlgorithm } from "./Algorithm/main";
// import OpenAI from "openai";

var cors = require("cors");
const app = express();
// const upload = multer({ dest: 'uploads/' });


// // On Mac, go BackEnd and run export OPENAI_API_KEY=...
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

import {
  generateDesirableDestinations,
  registrationDetails,
  bumpNeglectedPreferences,
} from "./Algorithm/main";
import { TripFlowAlgorithmType } from "../Shared/types/editLocations";
import { GPTScrapedEventType } from "../Shared/types/callGPT";


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json("BACKEND IS RUNNING ON AWS!")
});

// Registration Page API
app.post("/api/register", async (req, res) => {
  try {
    const validatedDetails: RegistrationDetailsType =
      registrationDetailsType.parse(req.body);
    registrationDetails(validatedDetails);
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Validation error:", error);
    res.status(400).json({ error: "Invalid input or API error" });
  }
});

// Start Planning Page API
app.post("/api/start-planning-page", async (req, res) => {
  try {
    const validatedDetails: GenerateDesirableDestinationsType =
      generateDesirableDestinationsSchema.parse(req.body); 
    const destinations: Destination[] = await generateDesirableDestinations(
      validatedDetails
    );
    res.json({ destinations });
  } catch (error) {
    console.error("Validation error:", error);
    res.status(400).json({ error: "Invalid input or API error " });
  }
});

// Pick Locations Page API
app.post("/api/pick-locations-page", async (req, res) => {
  try {
    const validatedDetails: EditLocationsInputType = editLocationsInputSchema.parse(req.body.selectedDestinations);
    const destinations: Destination[] = await bumpNeglectedPreferences(validatedDetails);
    res.json({ destinations });
  } catch (error) {
    console.error("Validation error:", error);
    res.status(400).json({ error: "Invalid input or API error " });
  }
});

// Planning Page API
app.post("/api/planning-page", async (req, res) => {
  try {
    const validatedDetails: TripFlowAlgorithmType = tripFlowAlgorithmType.parse(
      req.body.selectedDestinations
    );
    const itinerary: Array<{
      destination: Destination;
      stringDate: string;
      startingTime: number;
      endingTime: number;
    }> = await tripFlowAlgorithm(validatedDetails);
    console.log("LOG: Itinerary generated in app.ts Planning Page API");
    console.log(itinerary);
    res.json({ itinerary });
  } catch (error) {
    console.error("Validation error:", error);
    res.status(400).json({ error: "Invalid input or API error " });
  }
});

// Recalibration API
app.post("/api/recalibrate", async (req, res) => {
  try {
    const validatedDetails: RecalibrateItineraryType =
      recalibrateItineraryType.parse(req.body);
    const itinerary: Array<{
      destination: Destination;
      startingTime: number;
      endingTime: number;
    }> = await recalibrate(validatedDetails);
    res.json({ itinerary });
  } catch (error) {
    console.error("Validation error:", error);
    res.status(400).json({ error: "Invalid input or API error " });
  }
});

// Takes in user-uploaded file and parses the text content 
// app.post("/api/processFile", upload.single("file"), async (req, res) => {
//   try {
//     const uploadedFile = req.file;
//     if (!uploadedFile) {
//       return res.status(500).send('Uploaded file is undefined in backend');
//     } 
//     const fileName = uploadedFile.originalname
//     if (!fileName) {
//       return res.status(500).send('Uploaded file name is undefined in backend');
//     }
//     const fileType = fileName.split('.').pop()?.toLowerCase();

//     let textContent = "";
//     if (fileType === 'xlsx' || fileType === 'xls') {
//       const workbook = xlsx.readFile(uploadedFile.path);
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = xlsx.utils.sheet_to_json(worksheet);
//       textContent = JSON.stringify(jsonData, null, 2);
//     } else if (fileType === 'docx') {
//       // Process Word file
//     } else if (fileType === 'pdf') {
//       // Process PDF file
//     } else {
//       res.status(500).send('Unsupported file type');
//       return;
//     }

//     res.json({ textContent });
//     // // ...file processing logic...

//   } catch (error) {
//     console.error("Error receiving uploaded file:", error);
//     res.status(500).send('Error receiving uploaded file');
//   }
// });

// // File Upload into GPT API 
// app.post("/api/callGPT", async (req, res) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           "role": "system",
//           "content": "You will be given an itinerary plan. List down each itinerary item in the following format: Date (YYYY-MM-DD format), Timeslot (HH:MM-HH:MM format), Event. Infer the details if any information is unavailable and never leave a field empty. Start time and End time should never be the same. Enumerate the items with a dash."
//         },
//         {
//           "role": "user",
//           "content": JSON.stringify(req.body)
//         }
//       ],
//       temperature: 0.1,
//       max_tokens: 500,
//     });

//     let message: string = '';
//     let individualEventArr: GPTScrapedEventType[] = [];
//     if (response.choices) {
//       if (response.choices[0].message.content) {
//         message = response.choices[0].message.content;
//       }
//     }

//     const responseSegmented: string[] = message.split("\n");
//     responseSegmented.forEach((item) => {
//       const itemSegmented: string[] = item.split(",").map(item => item.trim());
//       // remove the leading '- '
//       let date: string = itemSegmented[0].substring(2,);
//       // Can deal with the (.approx) more meaningfully after MVP
//       let time: string = itemSegmented[1].replace(/\(\.approx\)/g, "");
//       let event: string = itemSegmented[2];
//       const individualEvent: GPTScrapedEventType = {date, time, event};
//       individualEventArr.push(individualEvent);
//     });

//     console.log(individualEventArr);

//     storePrePlannedEvents(individualEventArr);
//     // dispatch(setIndividualEventArr(individualEventArr));
//     // console.log("successfully dispatched");
//     // res.json(message);

//   } catch (error) {
//     console.error("Error calling GPT:", error);
//     res.status(400).json({ error: "Invalid input or API error" });
//   }
// });


app.listen(3000, () => {
  console.log("Backend server is running on port 3000");
});

// define type in shared folder, export type, import type in backend, use zod to validate incoming response
// then if correct, proceed with API
