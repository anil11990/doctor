var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var doctorSchema=new Schema({
	name:{
		type:String
	},
	gender:{
		type:String
	},
	phoneNumber:{
		type:Number
	},
	emailId:{
		type:String
	},
	password:{
		type:String
	},
	specilization:{
		type:String
		
	},
	address:{
		street:{
			type:String
		},
		city:{
			type:String
		},
		state:{
			type:String
		},
		pinCode:{
			type:Number
		},
	}
	})

module.exports = mongoose.model('Doctor', doctorSchema);
