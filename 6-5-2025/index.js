const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});
const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
}));


async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'New Author';

    const result = await course.save();
    console.log(result);
}


async function updateCourseByQuery(id) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            isPublished: true,
            author: 'New Author'
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


async function getCourses() {
    const courses = await Course
        .find({ age: { $gte: 30 }, author: 'john' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });

    console.log(courses);
}