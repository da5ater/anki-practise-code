const express = require('express');
const app = express();
const morgan = require('morgan');
const winston = require('winston');
const config = require(`./config/${process.env.NODE_ENV || 'development'}.json`);

// Move courses array to the top
let courses = [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Science" },
    { id: 3, name: "History" }
];

if (process.env.NODE_ENV == 'production') {
    // Winston is for logging, not middleware
    const logger = winston.createLogger({
        format: winston.format.json(),
        transports: [new winston.transports.Console()]
    });
} else {
    app.use(morgan('combined'));
}

app.use(express.json());

console.log("app name is: " + config.appName);
console.log("app description is: " + config.appDescription);

app.post("/api/courses/:id", (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseName = req.body.name;
    if (!courseName || courseName.length < 3) {
        return res.status(400).json({ error: "Course name is required and must be at least 3 characters long" });
    }
    const course = { id: courseId, name: courseName };
    // Simulate saving to a database
    courses.push(course);
    res.status(201).json(course);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ error: "Course not found" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

