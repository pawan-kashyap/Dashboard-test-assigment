const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require('./roleModel')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      default: "",
    },
    firstName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    roleName:{
      type: String,
      required: true,
      trim: true,
      default: "user",
    },
    rolePermission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if(this.rolePermission == null){
    const roleData = await Role.findOne({role: this.roleName});
    this.rolePermission = roleData._id;
  } 
  next()
})


module.exports = mongoose.model("User", UserSchema);
