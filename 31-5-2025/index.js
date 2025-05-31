const express = require("express");
const app = express();
const PORT = 3000;
const courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
];

// code here
app.get("/courses/:id", (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).send("Course not found");
    }

    res.json(course);
});

app.get("/", (req, res) => {
    res.send("Welcome to the Courses API");
});





const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

server.on("connection", (socket) => {
    console.log(`New connection established: ${socket.remoteAddress}`);
});
