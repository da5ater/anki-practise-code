const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

// Course Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course must have at least one tag.'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('Course', courseSchema);



// Helper Functions
async function getCourses(pageNumber = 1, pageSize = 10) {
    try {
        const courses = await Course.find({ isPublished: true })
            .sort({ name: 1 })
            .select('name author price')
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);
        return courses;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
}

async function updateCourse(id, updateData) {
    try {
        const course = await Course.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        return course;
    } catch (error) {
        throw new Error(`Error updating course: ${error.message}`);
    }
}

async function createCourse(courseData) {
    try {
        const course = new Course(courseData);
        const savedCourse = await course.save();
        return savedCourse;
    } catch (error) {
        throw new Error(`Error creating course: ${error.message}`);
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dynamic', (req, res) => {
    const data = {
        title: 'Dynamic Pug Example',
        message: 'This is a dynamic message rendered using Pug!',
        currentTime: new Date().toLocaleTimeString(),
    };
    res.render('dynamic', data);
});

// API Routes for Courses
app.get('/api/courses', async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const courses = await getCourses(pageNumber, pageSize);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/courses', async (req, res) => {
    try {
        const course = await createCourse(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/courses/:id', async (req, res) => {
    try {
        const course = await updateCourse(req.params.id, req.body);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully', course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 404 handler - must come before error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware - must be last
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});




// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/courses`);
});