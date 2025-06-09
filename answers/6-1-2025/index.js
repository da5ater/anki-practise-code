const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/ankiPractisePlayGround')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: async function (v) {
                setTimeout(() => {
                    console.log('Validating tags...');
                    return v && v.length > 0;
                }, 1000); // Simulate async validation delay
            },
            message: 'course should have at least one tag from the predefined list' // custom error message for enum validation
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});
const Course = mongoose.model('Course', courseSchema);

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

