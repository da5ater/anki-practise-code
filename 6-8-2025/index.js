const authorSchema = new mongoose.Schema({

    name: String,

    bio: String,

    website: String

});



const Author = mongoose.model('Author', authorSchema);



const Course = mongoose.model('Course', new mongoose.Schema({

    name: String,

    author: {

        type: authorSchema,

        required: true

    }

}));


async function updateAuthor(courseId, authorData) {
    const course = await Course.updateOne(        { _id: courseId },
        { $set: { author: authorData } });
}