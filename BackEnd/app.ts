// import z from "zod";
import 'dotenv/config';
import { registrationDetailsType } from "../Shared/types";
import { 
  Destination, 
  generateDesirableDestinationsType 
} from "../Shared/types";


import express from 'express'
import { tripFlowAlgorithm } from './Algorithm/main';
var cors = require('cors')
const app = express();

const { 
  generateDesirableDestinations, 
  registrationDetails,
  itineraryDetails
} = require('./Algorithm/main.ts');

app.use(express.json());
app.use(cors())

// Registration Page API
app.post('/api/register', async (req, res) => {
  try {
    const { username, startingTime, endingTime, preferences } = req.body;
    const inputData = {username, startingTime, endingTime, preferences };
    registrationDetails(inputData);
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error' });
  }
});

// Start Planning Page API
app.post('/api/start-planning', async (req, res) => {
  try {
    const { departureLocation, endLocation, scheduleType } = req.body;
    const inputData = {departureLocation, endLocation, scheduleType};
    const destinations: Destination[] = await itineraryDetails(inputData);
    res.json({ destinations });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error '});
  }
});

// Pick Locations Page API
app.post('/api/pick-locations', async (req, res) => {
  try {
    const { destinationArr } = req.body;
    const inputData = { destinationArr };
    const itinerary: [Destination, number, number] = await tripFlowAlgorithm(inputData);
    res.json({ itinerary });
  } catch (error) {
    console.error('Validation errror:', error);
    res.status(400).json({ error: 'Invalid input or API error '});
  }
  
});

// app.post('/api/generate-destinations', async (req, res) => {
//   try {
//     const { preferences, numberOfDays, scheduleType } = req.body;
//     const inputData = { preferences, numberOfDays, scheduleType };
//     const destinations: Destination[] = await generateDesirableDestinations(inputData);
//     res.json({ destinations });
//   } catch (error) {
//     console.error('Validation error:', error);
//     res.status(400).json({ error: 'Invalid input or API error' });
//   }
// });

app.listen(3000, () => {
  console.log('Backend server is running on port 3000');
});

// define type in shared folder, export type, import type in backend, use zod to validate incoming response
// then if correct, proceed with API
