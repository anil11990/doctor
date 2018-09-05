var Doctor=require('../model/doctor')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var generateHash1 = require("../middleware/bcrypt");
var comparePassword=require("../middleware/bcrypt");
module.exports.signup=function(req,res){

	if( ! req.body.hasOwnProperty("emailId")){
		res.send("emailId is required")
	}
	else if(! req.body.hasOwnProperty("password")){
		res.send("password is required")
	}
	else if(req.body.password.length<8){
		res.send("password must be greater 8 charecter")
	}
	else {
		Doctor.findOne({"emailId":req.body.emailId ,"password":req.body.password},function(err,success){
        if(err){
			res.send(err);
		}
		else if(success){
			console.log("already registered")
			res.send(success);
		}
		else{
			//generate hash 
				generateHash1.generateHash(req.body.password,function(err,hash){
					console.log(err,hash)
				req.body.password = hash;
				//save newUser object to database
				var saveData=new Doctor(req.body);
				saveData.save(function(err,success){
				if(err){
				console.log("err")
				res.send(err);
				}
				 else {
						console.log("saveData")
						res.send(success);
						}
					})
				})
		       }
		     })
				
			  }
		 }

		

	module.exports.login = function (req,res) {
	if(!req.body.hasOwnProperty("emailId")){
		res.send("emailId is required")	
	}
	else if(!req.body.hasOwnProperty("password")){
		res.send("password is required")
	}
	else{
		 Doctor.findOne({"emailId":req.body.emailId,"password":req.body.password},function(err,success){
        if(err){
			console.log("err")
			res.send(err);
		}
		else if(success){
			console.log("login successfull");
			// console.log(success);
		
			//genarate token//

			var token = jwt.sign(success.toJSON(), 'vfderb');
			res.send({"success":success,"token":token});
		}
		else{
			console.log("Register first")
			res.send({"msg":"Register first"});
		}
	})
	}
}

// module.exports.login=function(req, res) {

//   Doctor.findOne({ emailId: req.body.emailId }, function (err, user) {
//     if (err) return res.status(500).send('Error on the server.');
//     if (!user) return res.status(404).send('No user found.');

//     var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

//     var token = jwt.sign({ id: user._id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });

//     res.status(200).send({ auth: true, token: token });
//   });

// };
		



	module.exports.changePassword=function(req,res){
	if(!req.body.hasOwnProperty("emailId")){
		res.send("emailId is required");
	}
	else if(!req.body.hasOwnProperty("password")){
		res.send("password required");
	}
	else if(!req.body.hasOwnProperty("newpassword")){
		res.send("newpassword required");
	}
	else{
		Doctor.findOne({"emailId":req.body.emailId},function(err,success){
		if(err){
			res.send(err)
		}
		else if(success){
			if(success.password==req.body.password){
				Doctor.findOneAndUpdate({"emailId":req.body.emailId},{$set:{"password":req.body.newpassword}},function(err,success){
					if(err){
						res.send(err)
					}
					else{
						res.send(success)
					}
				})
			}
			else{
				res.send("plese inter correct password")
			}

		}
		else{
				res.send("please enter correct emailId")
			}
	})
}
	}


	module.exports.getDoctorlist=function(req,res){
    
    if(!req.body.hasOwnProperty("specilization")){
    	res.send({msg:"specilization is required"})
    }
    if(!req.body.hasOwnProperty("city")){
    	res.send({msg:"city is required"})
    }
    else{
    	Doctor.find({"specilization":req.body.specilization,"address.city":req.body.city},function(err,success){
		if(err){
			res.send(err)
		}
		else {
			res.send(success)
		}
	})
	}
    }	

//search doctor by id and update gender and name

   module.exports.findByIdAndUpdate=function(req,res){
	if(!req.body.hasOwnProperty("_id")){
		res.send("_id required");
	}
	else{
		Doctor.findByIdAndUpdate({"_id":req.body._id},{$set:{"gender":req.body.gender,"name":req.body.name}},function(err,success){
		if(err){
			res.send(err)
		}
		else if(success){
			res.send(success)
		}
		else{
			res.send("id not found")
			console.log("msg:id not found");
		}
	})
	}
}


module.exports.getDoctorDetails= function(req,res){
	if(!req.body.hasOwnProperty("name")){
      res.send("name is required")
	}
	else if(!req.body.hasOwnProperty("specilization")){
		res.send("specilization is required");
	}
	else{
		Doctor.findOne({"name":req.body.name,"specilization":req.body.specilization},function(err,success){
		if(err){
			res.send(err)
		}
			else {
				res.send(success)
			}	
	})
	}
	}  

