import 'dotenv/config';
import express from 'express'
const app = express();

const { registrationDetails } = require('./Algorithm/main.ts');
app.use(express.json());

// Define an API endpoint to receive data from the frontend
app.post('/api/register', (req, res) => {
    const { username, startingTime, endingTime } = req.body;
    registrationDetails(username, startingTime, endingTime);
    res.json({ message: 'Registration successful' });
});


app.listen(3000, () => {
  console.log('Backend server is running on port 3000');
});

// define type in shared folder, export type, import type in backend, use zod to validate incoming response
// then if correct, proceed with API
