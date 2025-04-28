const express = require("express");
const router = express.Router();

const {
  getSalesReport ,
} = require("../controllers/salesController");

const { authUser, authorizeRoles } = require("../middlewares/authenticate");

// DETAILED SALES REPORT (shop overview, product stats, orders)
router.get(
  "/shop/sales-report",
  authUser,
  authorizeRoles("shopOwner"),
  getSalesReport
);



module.exports = router;
