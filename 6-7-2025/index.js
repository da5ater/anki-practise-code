const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const config = require('config');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


console.log(`pass is ${config.get('password')}`);

app.get('/', (req, res) => {
    res.render('temp', { title: 'Home', message: 'Welcome to the Home Page!', date: new Date().toLocaleDateString() });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});