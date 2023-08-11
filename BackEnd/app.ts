// import z from "zod";
import 'dotenv/config';
import { registrationDetailsType } from "../Shared/types";
import { 
  Destination, 
  generateDesirableDestinationsType 
} from "../Shared/types";


import express from 'express'
var cors = require('cors')
const app = express();

<<<<<<< HEAD
const { generateDesirableDestinations } = require('./Algorithm/main.ts');
const { registrationDetails } = require('./Algorithm/main.ts');
app.use(express.json());
app.use(cors())
=======
const { 
  generateDesirableDestinations, 
  registrationDetails,
  itineraryDetails
} = require('./Algorithm/main.ts');
>>>>>>> jinyang

app.use(express.json());
app.use(cors())

// Registration Page API
app.post('/api/register', async (req, res) => {
  try {
<<<<<<< HEAD
    const { username, startingTime, endingTime } = req.body;
    const inputData = {username, startingTime, endingTime};
    // registrationDetailsType.parse(inputData); // This line validates the type/shape of the input data
=======
    const { username, startingTime, endingTime, preferences } = req.body;
    const inputData = {username, startingTime, endingTime, preferences };
>>>>>>> jinyang
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
    const { departureLocation, endLocation, pace } = req.body;
    const inputData = {departureLocation, endLocation, pace};
    itineraryDetails(inputData);
    res.json({ message: 'Start Planning successful' });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API errpr '});
  }
})

app.post('/api/generate-destinations', async (req, res) => {
  try {
    const { preferences, numberOfDays, scheduleType } = req.body;
    const inputData = { preferences, numberOfDays, scheduleType };
    const destinations: Destination[] = await generateDesirableDestinations(inputData);
    res.json({ destinations });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error' });
  }
});

app.listen(3000, () => {
  console.log('Backend server is running on port 3000');
});

// define type in shared folder, export type, import type in backend, use zod to validate incoming response
// then if correct, proceed with API
