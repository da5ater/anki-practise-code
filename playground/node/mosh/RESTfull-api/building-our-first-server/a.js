const express = require('express');
const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/courses', (req, res) => {
    res.send(JSON.stringify([1, 2, 3]));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});