const authorSchema = new mongoose.Schema({

    name: String,

    bio: String,

    website: String

});



const Author = mongoose.model('Author', authorSchema);



const Course = mongoose.model('Course', new mongoose.Schema({

    name: String,

    authors: {

        type: [authorSchema], // Array of embedded documents

        required: true

    }

}));



async function removeAuthor() {
    const course = Course.findById(courseId);
    course.authors.pull(authorId);
    await course.save();
    console.log('Author removed from course');
}