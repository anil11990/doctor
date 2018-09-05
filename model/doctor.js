var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var doctorSchema=new Schema({
	name:{
		type:String,
		required: true
	},
	gender:{
		type:String,
		required: true
	},
	phoneNumber:{
		type:Number,
		required: true
	},
	emailId:{
		type:String,
		required: true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},
	specilization:{
		type:String,
		required:true	
	},
	address:{
		street:{
			type:String,
			required:true
		},
		city:{
			type:String,
			required:true
		},
		state:{
			type:String,
			required:true
		},
		pinCode:{
			type:Number,
			required:true
		},
	}
	})

module.exports = mongoose.model('Doctor', doctorSchema);
