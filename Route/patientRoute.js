const express=require("express");
const router=express.Router();
var verify=require('../middleware/verifyToken');
var patientApi = require("../Api/patientApi");
router.post('/register', patientApi.register);
router.post('/login', patientApi.login);
router.post('/getdetails',verify.patientsToken,patientApi.getdetails);
router.post('/changePassword', patientApi.changePassword);
router.post('/paginate',patientApi.paginate);
router.post('/getPatientList',patientApi.getPatientList);





module.exports=router;