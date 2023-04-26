const { verifyToken, hasPermission, hasPermissionOrOwnResource} = require("../middleware/authentication");
const {createUser, registerUser, getUser, getAllUsers, updateUser, deleteUser, login} = require("../controllers/userController");
const router = require("express").Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", login);
router.post("/user",verifyToken, hasPermission("user", "add") ,  createUser);
router.delete("/user/:id", verifyToken, hasPermission("user", "delete"), deleteUser);

//Routes can be accessed by own user or any user with permissions
router.get("/user/:id", verifyToken, hasPermissionOrOwnResource("user", "view"), getUser);
router.get("/users", verifyToken, hasPermissionOrOwnResource("user", "view"), getAllUsers);
router.put("/user/:id", verifyToken, hasPermissionOrOwnResource("user", "edit"), updateUser);
router.put("/user/:id", verifyToken, hasPermissionOrOwnResource("user", "edit"), updateUser);

module.exports = router;
