const express = require("express");
const app = express();
const PORT = 3000;
const courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
];

// code here 

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});