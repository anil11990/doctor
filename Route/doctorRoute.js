const express=require("express");
const router=express.Router();
var verify=require('../middleware/verifyToken');
const doctorApi = require("../Api/doctorApi");
router.post('/signup', doctorApi.signup);
router.post('/login', doctorApi.login);
router.post('/getDoctorlist',verify.doctorsToken,doctorApi.getDoctorlist);
router.post('/findByIdAndUpdate',doctorApi.findByIdAndUpdate);
router.post('/changePassword',doctorApi.changePassword);
router.post('/getDoctorDetails',doctorApi.getDoctorDetails);









module.exports=router;