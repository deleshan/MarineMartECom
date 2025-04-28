const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
  getShopOwnerProducts,
} = require("../controllers/productController");
const { authUser, authorizeRoles, authShopOwner, authorizeShopRoles } = require("../middlewares/authenticate");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer Setup
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// Public Product Routes
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(authUser, createReview);

// Admin Product Routes
router.route("/admin/product/new")
  .post(authUser, authorizeRoles("admin"), upload.array("images"), newProduct);

router.route("/admin/products")
  .get(authUser, authorizeRoles("admin"), getAdminProducts);

router.route("/admin/product/:id")
  .put(authUser, authorizeRoles("admin"), upload.array("images"), updateProduct)
  .delete(authUser, authorizeRoles("admin"), deleteProduct);

router.route("/admin/reviews")
  .get(authUser, authorizeRoles("admin"), getReviews);

router.route("/admin/review")
  .delete(authUser, authorizeRoles("admin"), deleteReview);

// Shop Owner Product Routes
router.route("/shop/product/new")
  .post(authShopOwner, authorizeShopRoles("shopOwner"), upload.array("images"), newProduct);

router.route("/shop/products")
  .get(authShopOwner, authorizeShopRoles("shopOwner"), getShopOwnerProducts);

router.route("/shop/product/:id")
  .put(authShopOwner, authorizeShopRoles("shopOwner"), upload.array("images"), updateProduct)
  .delete(authShopOwner, authorizeShopRoles("shopOwner"), deleteProduct);

module.exports = router;
