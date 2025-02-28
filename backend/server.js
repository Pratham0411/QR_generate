// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const { checkAndAddMachine } = require('./db');
const path = require('path');
const cors = require('cors');  

dotenv.config();

const app = express();

app.use(cors()); 

app.use(express.json());
app.use(express.static(path.join(__dirname, 'qr')));

app.post('/api/register-machine', async (req, res) => {
  const { id } = req.body;
  try {
    const message = await checkAndAddMachine(id);
    res.status(200).json({ message });
  } catch (err) {
    console.error("Server Error:", err); 
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port 5000');
});
