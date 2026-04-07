const express = require("express");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const mediaRoutes = require("./routes/mediaRoutes");
const productRoutes = require("./routes/productRoutes");  
const seoRoutes = require("./routes/seoRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/product", productRoutes); 
app.use("/api/seo", seoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
