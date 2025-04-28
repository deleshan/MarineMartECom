const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIfeatures = require("../utils/apiFeatures");

// GET products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 8;

  let query = Product.find();

  const features = new APIfeatures(query, req.query).search().filter();
  const filteredProductsCount = await features.query.clone().countDocuments();
  const totalProductsCount = await Product.countDocuments();

  const products = await features.paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: filteredProductsCount,
    resPerPage,
    products,
  });
});

// Create product
exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files?.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;
  req.body.shop = req.shop.id;

  // Set shop reference if the user is a shopOwner
  if (req.shop.role === "shopOwner") {
    req.body.shop = req.shop._id;
  }

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// GET single product
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("reviews.user", "name email")
    .populate("shop", "name")  
    .populate("user", "name");

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

// UPDATE product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });

  // Allow only shop owners to update their own products
  if (req.shop.role === "shopOwner" && product.shop?.toString() !== req.shop._id.toString()) {
    return next(new ErrorHandler("You are not authorized to update this product", 403));
  }

  let images = req.body.imagesCleared === "false" ? product.images : [];

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files?.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// DELETE product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });

  // Allow only shop owners to delete their own products
  if (req.shop.role === "shopOwner" && product.shop?.toString() !== req.shop?.toString()) {
    return next(new ErrorHandler("You are not authorized to delete this product", 403));
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "Product removed successfully" });
});

// Create review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  const review = {
    user: req.user.id,
    rating,
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find((review) => review.user.toString() === req.user.id.toString());

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

// Get reviews
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate("reviews.user", "name email");
  res.status(200).json({ success: true, reviews: product.reviews });
});

// Delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());
  const numOfReviews = reviews.length;

  let ratings = reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });

  res.status(200).json({ success: true });
});

// Admin or ShopOwner products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  let products;
  if (req.user.role === "admin") {
    products = await Product.find();
  } else if (req.shop.role === "shopOwner") {
    products = await Product.find({ shop: req.shop._id });
  } else {
    return next(new ErrorHandler("Not authorized", 403));
  }

  res.status(200).json({ success: true, products });
});

// GET products for logged-in shop owner
exports.getShopOwnerProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({ shop: req.shop._id });
  res.status(200).json({ success: true, products });
});