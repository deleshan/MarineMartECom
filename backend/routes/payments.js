const express = require("express");
const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");
const { authUser } = require("../middlewares/authenticate");
const router = express.Router();

router.route("/payment/process").post(authUser, processPayment);
router.route("/stripeapi").get(authUser, sendStripeApi);

module.exports = router;