const path = require('path');
const express = require('express');
const dotenv = require('dotenv'); // global variables
const cors = require('cors');
const connectDB = require('./config/db');
const { response } = require('express');

// load enviornment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

app.get('/api/v1/wells', (req, res) => {
  res.send('Hello');
});

// Set static folder (public folder)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/wells', require('./routes/wells'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);