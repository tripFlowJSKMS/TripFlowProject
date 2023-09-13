// import z from "zod";
import "dotenv/config";
import { Destination } from "./Algorithm/Destination";
import {
  RegistrationDetailsType,
  registrationDetailsType,
  TripFlowAlgorithmType,
  tripFlowAlgorithmType,
  RecalibrateItineraryType,
  recalibrateItineraryType,
  BumpNeglectedPreferencesType,
  bumpNeglectedPreferencesType,
} from "../Shared/types";
import { GenerateDesirableDestinationsType } from "../Shared/types/startPlanning";
import { generateDesirableDestinationsSchema } from "../Shared/types/startPlanning";

import express from "express";
import { recalibrate, tripFlowAlgorithm } from "./Algorithm/main";
var cors = require("cors");
const app = express();

import {
  generateDesirableDestinations,
  registrationDetails,
  bumpNeglectedPreferences,
} from "./Algorithm/main";

app.use(express.json());
app.use(cors());

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
app.post("/api/start-planning", async (req, res) => {
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
    const validatedDetails: BumpNeglectedPreferencesType =
      bumpNeglectedPreferencesType.parse(req.body);
    const destinations: Destination[] = await bumpNeglectedPreferences(
      validatedDetails
    );
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
      req.body
    );
    const itinerary: Array<{
      destination: Destination;
      startingTime: number;
      endingTime: number;
    }> = await tripFlowAlgorithm(validatedDetails);
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

app.listen(3000, () => {
  console.log("Backend server is running on port 3000");
});

// define type in shared folder, export type, import type in backend, use zod to validate incoming response
// then if correct, proceed with API
