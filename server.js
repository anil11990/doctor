// importing modules
const express = require('express');
const bodyParser = require('body-parser');
var mongoose=require("mongoose");

// intialize express app
const app = express();

var mongoosePaginate = require('mongoose-paginate');

// using bodyparser to parse json data
app.use(bodyParser());

//set up dafault connection
mongoose.connect("mongodb://localhost:27017/doctor",{useNewUrlParser: true})

// importing routes
var doctorRoute = require('./Route/doctorRoute');
var patientRoute = require('./Route/patientRoute');
var searchDoctorRoute=require('./Route/searchDoctorRoute');

// use user route when url matches /api/user/
app.use('/doctor',doctorRoute);
app.use('/patient',patientRoute);
app.use('/search',searchDoctorRoute);




// creating server
var port = 8000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
