const { verifyToken, hasPermission } = require("../middleware/authentication");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails
} = require("../controllers/productController");
const router = require("express").Router();

router.post("/product", verifyToken, hasPermission("product", "add"), createProduct);
router.get("/product/:id", verifyToken, hasPermission("product", "view"), getProductDetails);
router.get("/products", verifyToken, hasPermission("product", "view"), getAllProducts);
router.put("/product/:id", verifyToken, hasPermission("product", "edit"), updateProduct);
router.delete("/product/:id", verifyToken, hasPermission("product", "delete"), deleteProduct);

module.exports = router;
