// import z from "zod";
import 'dotenv/config';
import {registrationDetailsType } from "../Shared/types";
import { generateDesirableDestinationsType } from "../Shared/types";


import express from 'express'
const app = express();

const { generateDesirableDestinations } = require('./Algorithm/main.ts');
const { registrationDetails } = require('./Algorithm/main.ts');
app.use(express.json());

app.post('/api/register', (req, res) => {
  try {
    const { username, startingTime, endingTime } = req.body;
    const inputData = {username, startingTime, endingTime};
    registrationDetailsType.parse(inputData); // This line validates the type/shape of the input data
    registrationDetails(username, startingTime, endingTime);
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error' });

  }
});

app.post('/api/generate-destinations'), async (req, res) => {
  try {
    const { preferences, numberOfDays, scheduleType } = req.body;
    const inputData = {preferences, numberOfDays, scheduleType};
    generateDesirableDestinationsType.parse(inputData);
    const destinations = await generateDesirableDestinations(inputData);
    res.json({ destinations });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input or API error' });
  }
};


app.listen(3000, () => {
  console.log('Backend server is running on port 3000');
});

// define type in shared folder, export type, import type in backend, use zod to validate incoming response
// then if correct, proceed with API
