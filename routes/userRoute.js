const { verifyToken, hasPermission, hasPermissionOrOwnResource} = require("../middleware/authentication");
const {createUser, registerUser, getUser, getMe, getAllUsers, updateUser, deleteUser, login} = require("../controllers/userController");
const router = require("express").Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", login);
router.post("/user",verifyToken, hasPermission("user", "add") ,  createUser);
router.delete("/user/:id", verifyToken, hasPermission("user", "delete"), deleteUser);

router.get("/user/:id", verifyToken, hasPermissionOrOwnResource("user", "view"), getUser);
router.get("/user/me", verifyToken, getMe);
router.get("/users", verifyToken, hasPermissionOrOwnResource("user", "view"), getAllUsers);
router.put("/user/:id", verifyToken, hasPermissionOrOwnResource("user", "edit"), updateUser);


module.exports = router;
