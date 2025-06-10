const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const users = require('./routes/users');
const app = express();
app.use(express.json());
app.use('/api/users', users);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vidly')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Set the port
const port = process.env.PORT || 3000;
// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
