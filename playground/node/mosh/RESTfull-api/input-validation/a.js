const express = require('express') // Import express module
const joi = require('joi') // Import Joi for validation
const app = express() // Create express app instance


app.use(express.json()) // Parse incoming JSON requests


const courses = [ // In-memory array of course objects
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]


app.post('/api/courses', (req, res) => {

    // answer :
    //----------------------
    const schema = joi.object({ // Define validation schema
        name: joi.string().min(3).required() // Name must be a string, min length 3, required
    })
    const result = schema.validate(req.body) // Validate request body against schema
    if (result.error) return res.status(400).send(result.error.details[0].message) // 400 if invalid

    //----------------
    const course = {
        id: courses.length + 1, // Generate new id
        name: req.body.name // Get name from request body
    }
    courses.push(course) // Add course to array
    res.send(courses) // Return updated courses
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})