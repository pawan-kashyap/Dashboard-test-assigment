const User = require("../models/userModel");
const catchAsyncErr = require("../middleware/catchAsyncError");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

exports.registerUser = catchAsyncErr(async (req, res, next) => {
  let userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return next(new ErrorHandler("User already exists", 409));
  } else {
    const newUser = new User({
      ...req.body,
      roleName: "user",
      rolePermissions: null,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    const savedUser = await newUser.save();
    const accessToken = jwt.sign({ ...savedUser._doc }, process.env.JWT_SEC);
    // const { password, ...others } = savedUser._doc;
    res.status(201).json({ sucess: true, accessToken , user : savedUser});
  }
});

exports.createUser = catchAsyncErr(async (req, res) => {
  const newUser = new User({
    ...req.body,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  const savedUser = await newUser.save();
  res.status(201).json({ sucess: true, data: savedUser });
});

exports.login = catchAsyncErr(async (req, res, next) => {
  const { email, password: pwd } = req.body;
  if (!email || !pwd) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).populate("rolePermission");
  if (!user) {
    return next(new ErrorHandler("Email does not exist", 404));
  }
  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SEC
  );
  const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  if (OriginalPassword !== req.body.password) {
    return next(new ErrorHandler("Wrong password entered", 401));
  }
  const accessToken = jwt.sign({ ...user._doc }, process.env.JWT_SEC);
  const { password, ...others } = user._doc;
  res
    .status(200)
    .json({
      success: true,
      permissions: user.rolePermission.permissions,
      user: others,
      accessToken
    });
});

exports.updateUser = catchAsyncErr(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  
  res.status(200).json({success: true , data: updatedUser});
});

exports.deleteUser = catchAsyncErr(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if(!user){
    return next( new ErrorHandler("User does not exist", 404))
  }
  res.status(200).json({success : true, message: "User has been deleted..."});
});

exports.getUser = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if(!user){
    return next( new ErrorHandler("User does not exist", 404))
  }
  const { password, ...others } = user._doc;
  res.status(200).json(others);
});
exports.getMe = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("rolePermission");
  if(!user){
    return next( new ErrorHandler("User does not exist", 404))
  }
  const { password, ...others } = user._doc;
  res.status(200).json(others);
});

exports.getAllUsers = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});
