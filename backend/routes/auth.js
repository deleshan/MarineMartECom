const express = require("express");
const multer = require("multer");
const path = require("path");

//for images upload
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/user"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const {
  registerUser,
  loginUser,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/authConroller");
const router = express.Router();
const { authUser, authorizeRoles } = require("../middlewares/authenticate");

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/myprofile").get(authUser, getUserProfile);
router.route("/password/change").put(authUser, changePassword);
router.route("/update").put(authUser, upload.single("avatar"), updateProfile);

//admin routes
router.route("/admin/users").get(authUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(authUser, authorizeRoles("admin"), getUser);
router.route("/admin/user/:id").put(authUser, authorizeRoles("admin"), updateUser);
router
  .route("/admin/user/:id")
  .delete(authUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
