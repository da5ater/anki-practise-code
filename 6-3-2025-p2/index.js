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

    price: Number

});



const Course = mongoose.model('Course', courseSchema);


async function updateCourse(id, update) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            name: update.name || name,
            author: update.author || author,
            tags: update.tags || tags,
            isPublished: update.isPublished || isPublished,
            price: update.price || price
        }
    });

    console.log(result);
}

async function createCourse(name, author, tags, isPublished, price) {
    const course = new Course({
        name,
        author,
        tags,
        isPublished,
        price
    });

    const result = await course.save();
    console.log(result);
}


createCourse('Node.js Course', 'John Doe', ['node', 'backend'], true, 29.99);
