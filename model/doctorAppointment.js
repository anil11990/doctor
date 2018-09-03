var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var doctorAppointmentSchema=new Schema({
	
	doctorId:{
		type:String
	},
	patientId:{
		type:String
	},
	date:{
		type:Date
	},
	appointmentDate:{
		type:Date
	},
	duration:{
		type:String
	},
	status:{
		type:Boolean
	},
})




module.exports = mongoose.model('Appointment', doctorAppointmentSchema);