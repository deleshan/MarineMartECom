const Shop = require("../models/shopModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken"); // I assume you have this helper
const sendEmail = require("../utils/email"); // For forgot password email

// User requests to create a shop
exports.createShopRequest = catchAsyncError(async (req, res, next) => {
  const { name, phone, address, email, password, shopName, category, description, status } = req.body;

  let avatar;
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.file) {
    avatar = `${BASE_URL}/uploads/shop/${req.file.originalname}`;
  }

  // Check if email already exists
  const existing = await Shop.findOne({ email });
  if (existing) {
    return next(new ErrorHandler("You already have a shop or a pending request", 400));
  }

  const shop = await Shop.create({
    name,
    phone,
    address,
    password,
    email,
    avatar,
    shopName,
    status,
    description,
    category,
  });

  res.status(201).json({
    success: true,
    message: "Shop creation request submitted. Awaiting admin approval.",
    shop,
  });
});

// Login User - /api/v1/shoplogin
exports.shopLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const shop = await Shop.findOne({ email }).select("+password");
  if (!shop) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await shop.isValidPassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(shop, 201, res);
});

// Logout User - /api/v1/shoplogout
exports.shopLogOut = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(201)
    .json({
      success: true,
      message: "You logged out successfully",
    });
};

// Forget password - /api/v1/shoppassword/forgot
exports.forgotShopPassword = catchAsyncError(async (req, res, next) => {
  const shop = await Shop.findOne({ email: req.body.email });
  if (!shop) {
    return next(new ErrorHandler("User not found with this Email", 404));
  }

  const resetToken = shop.getResetToken();
  await shop.save({ validateBeforeSave: false });

  let BASE_URL = process.env.FRONTEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  const resetUrl = `${BASE_URL}/shoppassword/reset/${resetToken}`;

  const message = `Click the link below to reset your password:\n\n${resetUrl}\n\nIf you have not requested this, please ignore this email.`;

  try {
    await sendEmail({
      email: shop.email,
      subject: "deleCart Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${shop.email}`,
    });
  } catch (error) {
    shop.resetPasswordToken = undefined;
    shop.resetPasswordTokenExpire = undefined;
    await shop.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password - /api/v1/shoppassword/reset/:token
exports.resetShopPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const shop = await Shop.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!shop) {
    return next(new ErrorHandler("Password reset token is invalid or expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  shop.password = req.body.password;
  shop.resetPasswordToken = undefined;
  shop.resetPasswordTokenExpire = undefined;
  await shop.save({ validateBeforeSave: false });

  sendToken(shop, 201, res);
});

// Get Shop Profile - /api/v1/shopprofile
exports.getShopProfile = catchAsyncError(async (req, res, next) => {
  const shop = await Shop.findById(req.shop.id);

  res.status(200).json({
    success: true,
    shop,
  });
});

// Change Password - /api/v1/shoppassword/change
exports.changeShopPassword = catchAsyncError(async (req, res, next) => {
  const shop = await Shop.findById(req.shop.id).select("+password");

  if (!(await shop.isValidPassword(req.body.oldPassword))) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  shop.password = req.body.password;
  await shop.save();

  res.status(200).json({
    success: true,
  });
});

// Update Profile - /api/v1/shopupdate
exports.updateShopProfile = catchAsyncError(async (req, res, next) => {
  const { name, phone, address, email, shopName, category, description } = req.body;
  let newShopData = { name, phone, address, email, shopName, category, description };

  let avatar;
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.file) {
    avatar = `${BASE_URL}/uploads/shop/${req.file.originalname}`;
    newShopData.avatar = avatar;
  }

  const shop = await Shop.findByIdAndUpdate(req.shop.id, newShopData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    shop,
  });
});

// Admin approves a shop
exports.approveShop = catchAsyncError(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    return next(new ErrorHandler("Shop not found", 404));
  }

  shop.status = "approved";
  await shop.save();

  res.status(200).json({
    success: true,
    message: "Shop has been approved.",
  });
});

// Admin views pending shops
exports.getPendingShops = catchAsyncError(async (req, res, next) => {
  const shops = await Shop.find({ status: "pending" });
  res.status(200).json({ success: true, shops });
});

// Admin views all approved shops
exports.getApprovedShops = catchAsyncError(async (req, res, next) => {
  const shops = await Shop.find({ status: "approved" });
  res.status(200).json({ success: true, shops });
});

// Shop owner closes shop
exports.closeShop = catchAsyncError(async (req, res, next) => {
  const shop = await Shop.findOne({ owner: req.user._id });

  if (!shop) {
    return next(new ErrorHandler("Shop not found", 404));
  }

  shop.status = "closed";
  await shop.save();

  res.status(200).json({
    success: true,
    message: "Shop closed successfully.",
  });
});

// Get shop orders
exports.getShopOrders = async (req, res) => {
  try {
    const shopId = req.shop.shopId; 
    
    if (!shopId) {
      return res.status(400).json({ success: false, message: "Shop ID not found in shop." });
    }

    // Fetch all orders
    const allOrders = await Order.find();

    // Filter orders that have at least one item from this shop
    const shopOrders = allOrders.filter(order =>
      order.orderItems.some(item => item.shop.toString() === shopId.toString())
    );

    // Calculate total sales for this shop
    let totalSalesAmount = 0;

    shopOrders.forEach(order => {
      order.orderItems.forEach(item => {
        if (item.shop.toString() === shopId.toString()) {
          totalSalesAmount += item.price * item.quantity;
        }
      });
    });
user
    res.status(200).json({
      success: true,
      orders: shopOrders,
      totalSalesAmount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




// Get shop products
exports.getShopProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({ shop: req.shop._id });
  res.status(200).json({ success: true, products });
});

// GET products for logged-in shop owner
exports.getShopOwnerProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({ shop: req.shop._id });
  res.status(200).json({ success: true, products });
});

// Admin delete shop by ID
exports.deleteShop = catchAsyncError( async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    await shop.deleteOne(); // or shop.remove()

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus === "Processing") {
      order.orderStatus = "Shipped";
    } else if (order.orderStatus === "Shipped") {
      order.orderStatus = "Delivered";
      order.deliveredAt = Date.now();
    } else {
      return res.status(400).json({ message: "Order is already delivered" });
    }

    await order.save();
    res.status(200).json({ message: "Order status updated successfully" });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};