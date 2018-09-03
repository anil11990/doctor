var Patient=require('../model/patient')
var jwt = require('jsonwebtoken');
module.exports.register = function (req,res) {
	if( ! req.body.hasOwnProperty("name")){
		res.send("name is required")
	}
	else if(! req.body.hasOwnProperty("age")){
		res.send("age is required")
	}
	else if(! req.body.hasOwnProperty("gender")){
		res.send("gender is required")
	}
	
	else {
		Patient.findOne({"name":req.body.name ,"age":req.body.age,"gender":req.body.gender},function(err,success){
        if(err){
			res.send(err);
		}
		else if(success){
			console.log("already registered")
			res.send(success);
		}
		else{
		var saveData=new Patient(req.body);
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
		 Patient.findOne({"emailId":req.body.emailId,"password":req.body.password},function(err,success){
        if(err){
			console.log("err")
			res.send(err);
		}
		else if(success){
			console.log("login successfull");
			console.log(success)

			//genarate token//

			var token = jwt.sign(success.toJSON(), 'asdfhj');
			res.send({"success":success,"token":token});
		}
		else{
			console.log("Register first")
			res.send({"msg":"Register first"});
		}
	})
	}
	}
	


module.exports.getdetails= function(req,res){
	if(!req.body.hasOwnProperty("_id")){
      res.send("id is required")
	}
	else{
		Patient.findById({"_id":req.body._id},{password:0},function(err,success){
		if(err){
			res.send(err)
		}
			else if(success){
				res.send(success)
			}

			else{
				res.send({"msg":"id not found"})
			}	
	})
	}
	}

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
		Patient.findOne({"emailId":req.body.emailId},function(err,success){
		if(err){
			res.send(err)
		}
		else if(success){
			if(success.password==req.body.password){
				Patient.findOneAndUpdate({"emailId":req.body.emailId},{$set:{"password":req.body.newpassword}},function(err,success){
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


module.exports.paginate=function(req,res){
	Patient.paginate({"dicease":{$regex:req.body.dicease,$options:'i'}},{page:1,limit:2},function(err,success){  
        if(err){  
            console.log(err); 
            res.send(err); 
        }  
        else  
        {  
            res.send(success); 
        }  
    });
}	
	

module.exports.getPatientList=function(req,res){
	if(!req.body.hasOwnProperty("dicease")){
		res.send("dicease is required");
	}
	Patient.find({"dicease":req.body.dicease},{password:0},function(err,success){
		if(err){
			res.send(err);
		}
		else if(success){
			console.log(success)
			res.send(success);
		}
		else{
			res.send({"msg":"dicease not available"});
		}
	})
}



