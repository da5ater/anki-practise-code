const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/mydatabase')

    .then(() => console.log('MongoDB connected...'))

    .catch(err => console.log(err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: async function (v) {
                return new Promise((resolve) => {
                    resolve(v.length > 0); // tags must be an array with at least one element
                });
            },
            message: 'course should have at least one tag from the predefined list' // custom error message for enum validation
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});
const Course = mongoose.model('Course', courseSchema);