const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your shop contact number"],
  },
  address: {
    type: String,
    required: [true, "Please enter your shop address"],
  },
  email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    maxLength: [8, "Password cannot exceed 8 characters"],
    select: false,
  },
  shopName: {
    type: String,
    required: [true, "Please enter your shop name"],
    trim: true,
  },
  
  category: {
    type: String,
    required: [true, "Please enter your shop category"],
  },
  description: {
    type: String,
    required: [true, "Please enter your shop description"],
  },
  avatar: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "closed"],
    default: "pending",
  },
  role: {
    type: String,
    default: "shopOwner",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

//Hash password before saving
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Generate JWT token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Compare password
shopSchema.methods.isValidPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
shopSchema.methods.getResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return token;
};
module.exports = mongoose.model("Shop", shopSchema);
