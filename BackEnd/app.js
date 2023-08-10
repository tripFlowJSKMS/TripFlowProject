import z from "zod";
import 'dotenv/config';
import {registrationDetailsType } from "../Shared/types.js";

import express from 'express'
const app = express();

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
  }
});


app.listen(3000, () => {
  console.log('Backend server is running on port 3000');
});

// define type in shared folder, export type, import type in backend, use zod to validate incoming response
// then if correct, proceed with API
