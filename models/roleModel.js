const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true,"Role title is missing"],
    unique: true,
    minlength: [3, "RoleTitle length must be greater than 2"],
    maxlength: [255,"Role title length cannot exceed 255 characters"],
  },
  permissions: {
    user: {
      add: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      view: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    product: {
      add: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      view: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    role: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
      },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
