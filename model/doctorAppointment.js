var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var doctorAppointmentSchema=new Schema({
	
	doctorId:[{
		ref:"Doctor",
		type:String
	}],
	patientId:{
		ref:"Patient",
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