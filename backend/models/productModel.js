const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
    maxLength: [100, "Product name can't be more than 100 characters"],
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the category of the product"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "computer",
        "Accessories",
        "Headphones",
        "Food",
        "book",
        "clothes/shoes",
        "Beauty/Health",
        "Outdoor",
        "Home",
        "Sports",
      ],
      message: "Please select a correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter the seller of the product"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    max: [20, "Product stock cannot exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
