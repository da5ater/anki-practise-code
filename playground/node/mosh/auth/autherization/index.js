const config = require('config');
const express = require('express');
const app = express();
const port = 3000;
const users = require('./routes/users');
const mongoose = require('mongoose');
const auth = require('./routes/auth');


if (!config.get('jwtPrivateKey')) { // Ensure the JWT private key is set in the config
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1); // Exit the application if the key is not set
}

mongoose.connect('mongodb://localhost:27017/vidly')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));





app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/genres', require('./routes/genres'));



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
