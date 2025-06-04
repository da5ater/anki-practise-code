const express = require('express');
const config = require('config');
const pug = require('pug');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// console.log('name is :', config.get('name'));

console.log('Database Password:', config.get('database.password'));

app.get('/dynamic', (req, res) => {
    res.render('index', {
        title: 'Dynamic Pug Example',
        date: new Date().toLocaleDateString(),
        message: 'This is a dynamic message rendered using Pug!'
    });
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
