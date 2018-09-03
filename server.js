const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mongoose=require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
app.use(bodyParser());
mongoose.connect("mongodb://localhost:27017/doctor",{useNewUrlParser: true})
var doctorRoute = require('./Route/doctorRoute');
var patientRoute = require('./Route/patientRoute');
var searchDoctorRoute=require('./Route/searchDoctorRoute');

app.use('/doctor',doctorRoute);
app.use('/patient',patientRoute);
app.use('/search',searchDoctorRoute);





var port = 8000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
