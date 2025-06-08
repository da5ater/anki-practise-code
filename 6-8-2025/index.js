const express = require('express');
const app = express();
const debugserver = require('debug')('app:server');
const debugdb = require('debug')('app:db');
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/mydatabase')

    .then(() => console.log('MongoDB connected...'))

    .catch(err => console.log(err));



const courseSchema = new mongoose.Schema({

    name: String,

    author: String,

    tags: [String],

    date: { type: Date, default: Date.now },

    isPublished: Boolean,

    price: Number,
    age: { type: Number, min: 18, max: 65, required: true }

});



const Course = mongoose.model('Course', courseSchema);


async function getCourses() {
    const courses = await Course.find({ age : {$in: [18, 20, 22] } });
    return courses;
}



// //server logic
// debugserver('Starting server...');


// //database logic 
// debugdb('Connecting to database...');

app.get('/api/posts/:year/:month', (req, res) => {
    const { year, month } = req.params;
    res.send(`Posts for ${month}/${year}`);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});