var jwt = require('jsonwebtoken');

module.exports.patientsToken=function(req,res,next){
	if(!req.headers.hasOwnProperty("token")){
		res.send("token required");
	}
	else{
		jwt.verify(req.headers.token,"asdfhj",function(err,token){
  if(err){
  res.send(err)
  }
  else{
  	next()  
  }
})
}
}

module.exports.doctorsToken=function(req,res,next){
  if(!req.headers.hasOwnProperty("token")){
    res.send("token required");
  }
  else{
    jwt.verify(req.headers.token,"vfderb",function(err,token){
  if(err){
    res.send(err)
  }
  else{
    // res.send(token)
    next()   
  }
})
}
}