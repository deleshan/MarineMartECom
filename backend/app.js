const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const errMiddleware = require("./middlewares/error");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));


//  ROUTES 
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payments = require("./routes/payments");
const shop = require("./routes/shop");
const sales = require("./routes/sales");

// ROUTE MOUNTING 
app.use("/api/v1/", products);    
app.use("/api/v1/", auth);            
app.use("/api/v1/", order);         
app.use("/api/v1/", payments);    
app.use("/api/v1/", shop);           
app.use("/api/v1/", sales);          

// FRONTEND (REACT) 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

//  ERROR HANDLING 
app.use(errMiddleware);

module.exports = app;
