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

    title: String,
    author: {
        type: Author.schema,
        required: true
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

async function createCourse(title, authorObj) {
    // Create a new course

    const course = new Course({
        title,
        author: authorObj
    });

    const result = await course.save();

    console.log(result);

}


async function listCourses() {
    // List all courses with their authors

    const courses = await Course.find({ 'author.name': 'John Doe' });

    console.log(courses);
}


// listCourses();


// updateCourse('683c480d93504901d18d01ca', {
//     title: 'Updated Node.js Course',
//     author: {
//         name: 'moahmed khater',
//         bio: 'A passionate JavaScript developer',
//         website: 'http://janedoe.com'
//     }
// });

// createCourse('Node.js Course', {
//     name: 'John Doe',
//     bio: 'A passionate Node.js developer',
//     website: 'http://johndoe.com'
// });

