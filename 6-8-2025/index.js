const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/mydatabase')

    .then(() => console.log('MongoDB connected...'))

    .catch(err => console.log(err));



const courseSchema = new mongoose.Schema({

    name: String,

    author: String,

    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },

    isPublished: Boolean,

    price: Number

});



const Course = mongoose.model('Course', courseSchema);