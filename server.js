

// Require Express to run server and routes
const express = require("express");
const app = express();
// Start up an instance of app


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Body parser to access JSON
const bodyParser = require("body-parser");
app.use(bodyParser.json());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static('website'));


app.post('/add', async (req, res) => {
    const info = await req.body;
    projectData = info;
    res.send(projectData);
});


app.get("/all", async (req, res) => {
    if(projectData){
        res.send(projectData);
    }
});


const port = 3500;

// function to test the server 
const listening = () =>
console.log(`Server running at on port ${port}`);


app.listen(port, listening);