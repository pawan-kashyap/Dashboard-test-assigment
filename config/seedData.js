const Role = require("../models/roleModel");
const User = require("../models/userModel");
const async = require("async");
const CryptoJS = require("crypto-js");

const users = [
  new User({
    username: "admin",
    email: "admin@gmail.com",
    password: CryptoJS.AES.encrypt(
      "admin",
      process.env.PASS_SEC
    ).toString(),
    roleName: "admin",
  }),
  new User({
    username: "subadmin",
    email: "subadmin@gmail.com",
    password: CryptoJS.AES.encrypt(
      "subadmin",
      process.env.PASS_SEC
    ).toString(),
    roleName: "sub-admin",
  }),
  new User({
    username: "manager",
    email: "manager@gmail.com",
    password: CryptoJS.AES.encrypt(
      "manager",
      process.env.PASS_SEC
    ).toString(),
    roleName: "manager",
  }),
  new User({
    username: "user",
    email: "user@gmail.com",
    password: CryptoJS.AES.encrypt(
      "user",
      process.env.PASS_SEC
    ).toString(),
    roleName: "manager",
    roleName: "user",
  }),
];
const roles = [
  new Role({
    role: "admin",
    permissions: {
      user: {
        add: true,
        edit: true,
        view: true,
        delete: true,
      },
      product: {
        add: true,
        edit: true,
        view: true,
        delete: true,
      },
      role: {
        add: true,
        edit: true,
        view: true,
        delete: true,
      },
    },
  }),
  new Role({
    role: "sub-admin",
    permissions: {
      user: {
        add: true,
        edit: true,
        view: true,
        delete: true,
      },
      product: {
        add: true,
        edit: true,
        view: true,
        delete: true,
      },
      role: {
        add: false,
        edit: false,
        view: false,
        delete: false,
      },
    },
  }),
  new Role({
    role: "manager",
    permissions: {
      user: {
        add: false,
        edit: false,
        view: false,
        delete: false,
      },
      product: {
        add: true,
        edit: true,
        view: true,
        delete: true,
      },
      role: {
        add: false,
        edit: false,
        view: false,
        delete: false,
      },
    },
  }),
  new Role({
    role: "user",
    permissions: {
      user: {
        add: false,
        edit: false,
        view: false,
        delete: false,
      },
      product: {
        add: false,
        edit: false,
        view: true,
        delete: false,
      },
      role: {
        add: false,
        edit: false,
        view: false,
        delete: false,
      },
    },
  }),
];

const seedData = async () => {
  try {
    await Role.deleteMany({});
    // for (let i = 0; i < roles.length; i++) {
    async.forEachSeries (roles, function(role,cb) {
      role.save(function (err, result) {
        if (err) {
          console.log(err);
          cb();
        }else{
          cb();
        }
      });
    },async () => {
    await User.deleteMany({});
    for (let i = 0; i < users.length; i++) {
      users[i].save(function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    }
  }
    )
  } catch (err) {
    console.log(err);
  }

  console.log("Mock data is seeded from seed script.");
};

module.exports = { seedData };
