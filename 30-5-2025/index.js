const mongoose = require('mongoose');
const { default: test } = require('node:test');

mongoose.connect('mongodb://localhost:27017/mydatabase')

const courseSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    date: { type: Date, default: Date.now }
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses(n) {
    let pageNumber = n || 1;
    let pageSize = 5;
    const courses = await Course.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)

    console.log(courses);
};

async function testPagination() {
    await getCourses(1);
    console.log('-------------------');
    await getCourses(2);
    console.log('-------------------');
    await getCourses(3);
}
testPagination();
