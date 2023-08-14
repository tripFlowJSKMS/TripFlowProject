// import z from "zod";
import 'dotenv/config';
import { Destination } from './Algorithm/Destination';
import { 
  generateDesirableDestinationsType, 
  RegistrationDetailsType,
  registrationDetailsType,
  ItineraryDetailsType,
  itineraryDetailsType,
  TripFlowAlgorithmType,
  tripFlowAlgorithmType,
  RecalibrateItineraryType,
  recalibrateItineraryType
} from "../Shared/types";


import express from 'express'
import { recalibrate, tripFlowAlgorithm } from './Algorithm/main';
var cors = require('cors')
const app = express();

import { 
  generateDesirableDestinations, 
  registrationDetails,
  itineraryDetails
} from './Algorithm/main';

app.use(express.json());
app.use(cors())

// Registration Page API
app.post('/api/register', async (req, res) => {
  try {
    const validatedDetails: RegistrationDetailsType = registrationDetailsType.parse(req.body);
    registrationDetails(validatedDetails);
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error' });
  }
});

// Start Planning Page API
app.post('/api/start-planning', async (req, res) => {
  try {
    const validatedDetails: ItineraryDetailsType = itineraryDetailsType.parse(req.body);
    const destinations: Destination[] = await itineraryDetails(validatedDetails);
    res.json({ destinations });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error '});
  }
});

// Pick Locations Page API
app.post('/api/pick-locations', async (req, res) => {
  try {
    const validatedDetails: TripFlowAlgorithmType = tripFlowAlgorithmType.parse(req.body);
    const itinerary: [Destination, number, number][] = await tripFlowAlgorithm(validatedDetails);
    res.json({ itinerary });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error '});
  } 
});

// Recalibration API
app.post('/api/recalibrate', async (req, res) => {
  try {
    const validatedDetails: RecalibrateItineraryType = recalibrateItineraryType.parse(req.body);
    const itinerary: [Destination, number, number][] = await recalibrate(validatedDetails);
    res.json({ itinerary });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error '});
  }
});

app.listen(3000, () => {
  console.log('Backend server is running on port 3000');
});

// define type in shared folder, export type, import type in backend, use zod to validate incoming response
// then if correct, proceed with API
