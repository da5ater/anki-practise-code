const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/playground')

    .then(() => console.log('Connected to MongoDB...'))

    .catch(err => console.error('Could not connect to MongoDB...', err));



const Author = mongoose.model('Author', new mongoose.Schema({

    name: String,

    bio: String,

    website: String

}));



const Course = mongoose.model('Course', new mongoose.Schema({

    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));


async function updateCourse(id, updates) {
    // Update a course by id with partial updates

    const course = await Course.findById(id);

    if (!course) return;

    // Apply all provided updates to the course
    Object.assign(course, updates);

    const result = await course.save();

    console.log(result);
}

async function createCourse(author, name, tags, price, isPublished) {
    // Create a new course

    const course = new Course({
        author,
        name,
        tags,
        price,
        isPublished
    });

    const result = await course.save();

    console.log(result);

}


// createCourse('John Doe', 'Node.js Course', ['node', 'backend'], 20, true);
// updateCourse('683c44fe104722c8691112bf', {
//     name: 'Updated Node.js Course',
//     price: 25,
//     isPublished: false,
//     author: 'mohamed'
// })
//     .then(() => console.log('Course updated successfully'))
//     .catch(err => console.error('Error updating course:', err));