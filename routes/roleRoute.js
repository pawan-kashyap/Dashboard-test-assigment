const { verifyToken, hasPermission } = require("../middleware/authentication");
const {
  getRole,
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");
const router = require("express").Router();

router.post("/role", verifyToken, hasPermission("role", "add"), createRole);
router.get("/role/:id", verifyToken, hasPermission("role", "view"), getRole);
router.get("/roles", verifyToken, hasPermission("role", "view"), getAllRoles);
router.put("/role/:id", verifyToken, hasPermission("role", "edit"), updateRole);
router.delete("/role/:id", verifyToken, hasPermission("role", "delete"), deleteRole);

module.exports = router;
