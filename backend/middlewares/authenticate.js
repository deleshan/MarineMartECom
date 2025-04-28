const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const Shop = require("../models/shopModel");  
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

// Authenticate logged-in user (customer or admin)
exports.authUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("You need to login to access this page.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  if (!req.user) {
    return next(new ErrorHandler("User not found.", 404));
  }
  next();
});

// Authenticate logged-in shop owner
exports.authShopOwner = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("You need to login as a shop owner.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.shop = await Shop.findById(decoded.id);
  if (!req.shop) {
    return next(new ErrorHandler("Shop not found.", 404));
  }
  next();
});

// Role-based authorization for User (admin, customer)
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not authorized to access this resource.`,
          403
        )
      );
    }
    next();
  };
};

// Role-based authorization for Shop Owner
exports.authorizeShopRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.shop.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.shop.role}) is not authorized to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
