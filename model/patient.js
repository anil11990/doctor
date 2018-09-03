var mongoose=require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var Schema=mongoose.Schema;
var patientSchema=new Schema({
	name:{
		type:String
	},
	age:{
		type:Number
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
	dicease:{
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
patientSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Patient',patientSchema);
