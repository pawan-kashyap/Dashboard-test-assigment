const jwt = require("jsonwebtoken");
const Roles = require("../models/roleModel");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(401).json({success: false , message: "Token is not valid!"});
      }else{
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({success: false, message:"Authentication failed"});
  }
};

const hasPermission = (model, operation) => {
  return async function (req, res, next) {
    console.log(req.user);
    const roleData = await Roles.find({role : req.user.roleName});
    console.log(JSON.stringify(roleData),model,operation);
    console.log(roleData, roleData[0].permissions[model][operation]);
    roleData[0].permissions[model][operation]
      ? next()
      : res.status(401).json({success: false, message:"You are not authorized to do perform this operation"});
  };
};

const hasPermissionOrOwnResource = (model, operation) => {
  return async function (req, res, next) {
    const roleData = await Roles.find({ role: req.user.roleName });
    console.log(req.user.roleName , {roleData},model,operation);
    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
    console.log(roleData, roleData[0].permissions[model][operation]);
    console.log(roleData[0].permissions[model][operation] , req.user._id === req.params.id);
    if(roleData[0].permissions[model][operation] | req.user._id === req.params.id){
      next()
    }else{
      res.status(401).json({success: false, message:"You are not authorized to do perform this operation"});
    }
  };
};

module.exports = {
  verifyToken,
  hasPermission,
  hasPermissionOrOwnResource
};
