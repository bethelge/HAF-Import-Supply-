// routes/index.js
const express = require("express");
const router = express.Router();
const productRoutes = require("./routes/productRoutes");
const mediaRoutes = require("./mediaRoutes");
const adminRoutes = require("./admin");

router.use("/media", mediaRoutes);
router.use("/admin", adminRoutes);
router.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));


module.exports = router;
