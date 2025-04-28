const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer setup for file upload (shop avatars)
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/shop"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const {
  createShopRequest,
  shopLogin,
  shopLogOut,
  forgotShopPassword,
  resetShopPassword,
  getShopProfile,
  changeShopPassword,
  updateShopProfile,
  approveShop,
  getPendingShops,
  getApprovedShops,
  closeShop,
  getShopOrders,
  getShopProducts,
  getShopOwnerProducts,
  deleteShop,
  updateOrderStatus
} = require("../controllers/shopController");

const { authUser, authorizeRoles, authShopOwner, authorizeShopRoles } = require("../middlewares/authenticate");

// Routes:

// Shop Creation Request (Anyone can create shop)
router.route("/createshop").post(upload.single("avatar"), createShopRequest);

// Shop Login/Logout
router.route("/shoplogin").post(shopLogin);
router.route("/shoplogout").get(shopLogOut);

// Password Recovery
router.route("/shoppassword/forgot").post(forgotShopPassword);
router.route("/shoppassword/reset/:token").post(resetShopPassword);

// Shop Profile Routes (Shop owner logged in)
router.route("/shopprofile")
  .get(authShopOwner, authorizeShopRoles("shopOwner"), getShopProfile);

router.route("/shoppassword/change")
  .put(authShopOwner, authorizeShopRoles("shopOwner"), changeShopPassword);

router.route("/shopupdate")
  .put(authShopOwner, authorizeShopRoles("shopOwner"), upload.single("avatar"), updateShopProfile);

// Shop Actions (Shop owner logged in)
router.put("/close", authShopOwner, authorizeShopRoles("shopOwner"), closeShop);
router.get("/shop/orders", authShopOwner, authorizeShopRoles("shopOwner"), getShopOrders);
router.get("/shop/products", authShopOwner, authorizeShopRoles("shopOwner"), getShopProducts);
router.get("/shopowner/products", authShopOwner, authorizeShopRoles("shopOwner"), getShopOwnerProducts);
router.route("/shop/orders/:id/status").put(authShopOwner, authorizeShopRoles("shopOwner"), updateOrderStatus);



// Admin Only Routes (Admin user logged in)
router.put("/admin/approve/:id", authUser, authorizeRoles("admin"), approveShop);
router.get("/admin/requests", authUser, authorizeRoles("admin"), getPendingShops);
router.get("/admin/shoplist", authUser, authorizeRoles("admin"), getApprovedShops);
router.delete("/admin/shop/:id", authUser, authorizeRoles("admin"), deleteShop);




module.exports = router;
