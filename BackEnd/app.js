const express = require('express');
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
