const Product = require("../models/productModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create a new Product
module.exports.createProduct = catchAsyncError(async (req, res, next) => { 
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    data: product,
  });
});

// Get All Product
module.exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  let products = await Product.find();
  res.status(200).json({
    success: true,
    data: products
  });
});


// Get Product Details
module.exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin
module.exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

module.exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});
