const express = require("express");
const app = express();
const PORT = 3000;
const courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
];


app.get("/api/cources/:id", (req, res) => {
    // get the id from the request
    const id = parseInt(req.params.id);
    // search for the course by id
    const course = courses.find((course) => course.id === id);
    // check if the course was found
    if (!course) {
        return res.status(404).send("course not found");
    }
    // return the course
    res.send(course);
});


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});