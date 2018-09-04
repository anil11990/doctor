const express=require("express");
const router=express.Router();
const searchDoctorApi = require("../Api/searchDoctorApi");
router.post('/searchDoctor',searchDoctorApi.searchDoctor);
router.post('/createAppointment',searchDoctorApi.createAppointment);
router.post('/searchByAppointmentDate',searchDoctorApi.searchByAppointmentDate);



module.exports=router;