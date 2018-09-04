var Patient=require('../model/patient');
var Doctor=require('../model/doctor');
var Appointment=require('../model/doctorAppointment');

//-----doctor match by patient deceases-------------//

// module.exports.searchDoctor=function(req,res){
// 			Patient.findById({"_id":req.body._id},function(err,success){
// 				if(err){
// 					res.send(err);
// 				}
// 				else if(!success){ 
// 					res.send({"msg":"id not found"})
// 				}
// 				else{
// 					// console.log(success);
// 					// var deceases=success.deceases
// 					// Doctor.find({"specilizatiom" : { $regex:deceases,$options:'i' }}
// 				var state=success.address.state;
// 				Doctor.find({"address.state" : { $regex:state,$options:'i' }},function(err,success){
// 						if(err){
// 						res.send(err)  
// 						}
// 						else{
// 					   res.send(success)
// 						}
// 					})	
// 				}
// 			})
// 		}
   
// find by patient's id if any address of patient matched doctor address gives doctor list//
module.exports.searchDoctor=function(req,res){
			Patient.findById({"_id":req.body._id},function(err,success){
				if(err){
					res.send(err);
				}
				else if(!success){ 
					res.send({"msg":"id not found"})
				}
				else{
					var state=success.address.state;
					var city=success.address.city;
				Doctor.find({$or: [{"address.state":state},{"address.city":city}]},function(err,success){
						if(err){
						res.send(err)  
						}
						else{
					   res.send(success)
						}
					})	
				}
			})
		}

 
// save appointment using doctorId and patient id

module.exports.createAppointment=function(req,res){
	var saveAppointment=new Appointment(req.body);
		saveAppointment.save(function(err,success){
			if(err){
				console.log("err")
				res.send(err);
			}
			else {
				console.log("saveAppointment")
				res.send(success);
			}
		});
	}

//populate by appointmrntDate
//only show doctor and patient name use name key or select:"name"
module.exports.searchByAppointmentDate=function(req,res){
	Appointment.find({"appointmentDate":req.body.appointmentDate}).populate({path:"doctorId patientId",select:"name"}).exec(function(err,success){
		if(err){
			res.send(err)  
			}
			else{
				res.send(success)
				}
			})	
		}
			
			