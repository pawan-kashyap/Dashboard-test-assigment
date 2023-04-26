const Role = require("../models/roleModel");
const catchAsyncErr = require("../middleware/catchAsyncError");
const errorHandler = require("../utils/errorHandler");

exports.createRole = catchAsyncErr(async (req, res) => {
  const newRole = new Role(req.body);
  const createdRole = await newRole.save();
  res.status(200).json(createdRole);
});

exports.deleteRole = catchAsyncErr(async (req, res, next) => {
  const deletedRole = await Role.findByIdAndDelete(req.params.id);
  if(!deletedRole){
    return next(new errorHandler("Role does not exist.", 404))
  }
  res.status(200).json({success: true , message: "deleted successfully." });
});

exports.updateRole = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  const { role, permissions } = req.body;

  const updatedRole = await Role.findByIdAndUpdate(
    id,
    { role, permissions },
    { new: true }
  );
  res.json(updatedRole);
  res
    .status(200)
    .json(updatedRole);
});

exports.getRole = catchAsyncErr(async (req, res) => {
  const roleData = await Role.findById(req.params.id);
  if (!roleData) {
    return next(new errorHandler("Role not found", 404));
  }
  res.status(200).json({success: true, data:roleData});
});
exports.getAllRoles = catchAsyncErr(async (req, res) => {
  const roleData = await Role.find();
  res.status(200).json({success: true, data:roleData});
});
