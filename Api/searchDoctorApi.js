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
// 					// var diceases=success.diceases
// 					// Doctor.find({"specilization" : { $regex:deceases,$options:'i' }}
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

 
// save appointment using doctorId and patientid

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

//populate(multi populate) by appointmrntDate
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
			

//find doctor list by patientId	
//doctor specilization match with patient diceases
module.exports.doctorIdList=function(req,res){
			Patient.findById({"_id":req.body._id},function(err,success){
				if(err){
					res.send(err);
				}
				else if(!success){ 
					res.send({"msg":"id not found"})
				}
				else{
					// console.log(success);
					
					var diceases=success.dicease
					// console.log(diceases);
					Doctor.find({"specilization" : { $regex:diceases,$options:'i' }},function(err,success){

						if(err){
						res.send(err)  
						}
						else{
							console.log(success);
	//push doctorid in an array[] from array object[{},{}]
					   var arr=[];
						for (var i = 0; i < success.length; i++) {
 						var entry = success[i];
						arr.push(entry._id);
						}
						// console.log(arr);
						var obj ={
							patientId:req.body._id,
							doctorId:arr,
							date:req.body.date,
							appointmentDate:req.body.date,
							duration :req.body.duration
						}					
						var saveAppointment=new Appointment(obj);
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
					})	
				}
			})
		}		


