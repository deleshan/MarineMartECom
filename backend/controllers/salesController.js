const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Get Sales Report for Shop Owner
exports.getSalesReport = catchAsyncError(async (req, res, next) => {
  const shopId = req.user.shop;

  if (!shopId) {
    return next(new ErrorHandler("No shop associated with this user", 400));
  }

  const { startDate, endDate } = req.query;
  let dateFilter = {};

  if (startDate && endDate) {
    dateFilter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  // Find all orders that include this shop's products
  const orders = await Order.find({
    "orderItems.shop": shopId,
    ...dateFilter,
  });

  let totalSales = 0;
  let totalOrders = 0;
  let productsSold = {};

  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      if (item.shop?.toString() === shopId.toString()) {
        totalSales += item.price * item.quantity;
        totalOrders += 1;

        if (!productsSold[item.product]) {
          productsSold[item.product] = {
            quantity: 0,
            name: item.name,
          };
        }

        productsSold[item.product].quantity += item.quantity;
      }
    });
  });

  res.status(200).json({
    success: true,
    totalSales,
    totalOrders,
    productsSold,
    orders,
  });
});