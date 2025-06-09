const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json()); // middleware to parse the request body
const courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
];


app.post("/api/cources", (req, res) => {
    const course = req.body;
    // check if the course is valid
    if (!course.name || course.name.length < 3) {
        return res.status(400).send("course name is required and should be at least 3 characters");
    }
    // add the course to the courses array
    courses.push(course);
    // return the course
    res.send(course);
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});