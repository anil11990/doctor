const express=require("express");
const router=express.Router();
var verify=require('../middleware/verifyToken');
const doctorApi = require("../Api/doctorApi");
router.post('/signup', doctorApi.signup);
// router.post('/register',doctorApi.register);
router.post('/login', doctorApi.login);
router.post('/getDoctorlist',verify.doctorsToken,doctorApi.getDoctorlist);
router.post('/findByIdAndUpdate',doctorApi.findByIdAndUpdate);
router.post('/changePassword',doctorApi.changePassword);
router.post('/getDoctorDetails',doctorApi.getDoctorDetails);







// export module to allow it to be imported in other files
module.exports=router;