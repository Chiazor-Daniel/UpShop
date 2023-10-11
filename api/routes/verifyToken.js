const jwt = require("jsonwebtoken")

const verify = (req, res, next) =>{
  const authHeader = req.headers.token;

  if(authHeader){
    const token = authHeader;
    jwt.verify(token, "bugz", (err, user)=>{
      if(err) res.status(401).json("Token is not Valid")
      req.user = user;
      next();
    });
  }else{
    return res.status(401);
  }
}

const Authorize = (req, res, next) => {
  verify(req, res, ()=>{
    if(req.user.id === req.params.id){
      next();
    }else{
      res.status(403).json("Not Authorized");
    }
  })
}

const AdminMe = (req, res, next) =>{
  verify(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }})
}

module.exports = {verify, Authorize, AdminMe}