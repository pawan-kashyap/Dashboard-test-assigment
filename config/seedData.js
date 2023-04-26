const Role = require("../models/roleModel");
const User = require("../models/userModel");
const async = require("async")

const users = [
  new User({
    username: "admin",
    email: "admin@gmail.com",
    password: "admin",
    roleName: "admin",
  }),
  new User({
    username: "subAdmin",
    email: "subAdmin@gmail.com",
    password: "subAdmin",
    roleName: "sub-admin",
  }),
  new User({
    username: "manager",
    email: "manager@gmail.com",
    password: "manager",
    roleName: "manager",
  }),
  new User({
    username: "user",
    email: "user@gmail.com",
    password: "user",
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
