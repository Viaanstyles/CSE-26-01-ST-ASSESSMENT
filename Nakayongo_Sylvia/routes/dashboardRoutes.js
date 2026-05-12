// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const upload = require("../middleware/upload");

// ====================== DISPLAY DASHBOARD ======================
router.get("/dashboard", async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.render("dashboard", { products });
  } catch (error) {
    console.error("Dashboard Error:", error);
    req.flash("error", "Error loading products");
    res.redirect("/dashboard");
  }
});

// ====================== ADD PRODUCT ======================
router.post("/add-product", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err);
      req.flash("error", err.message || "Image upload failed");
      return res.redirect("/dashboard");
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log("Received Form Data:", req.body);        // ← Debugging
    console.log("Received File:", req.file);             // ← Debugging

    const { name, description, price, category, stock } = req.body;

    // Basic Validation
    if (!name || !description || !price || !category || !stock) {
      req.flash("error", "All fields are required");
      return res.redirect("/dashboard");
    }

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock);

    if (isNaN(priceNum) || priceNum <= 0) {
      req.flash("error", "Price must be greater than 0");
      return res.redirect("/dashboard");
    }

    if (isNaN(stockNum) || stockNum < 0) {
      req.flash("error", "Stock cannot be negative");
      return res.redirect("/dashboard");
    }

    // Create Product
    const newProduct = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: priceNum,
      category: category.trim(),
      stock: stockNum,
      image: req.file ? req.file.filename : null,
    });

    console.log("✅ Product Created Successfully:", newProduct.id); // ← Success log

    req.flash("success", "Product added successfully!");
    res.redirect("/dashboard");

  } catch (error) {
    console.error("❌ Product Creation Error:", error);
    req.flash("error", "Failed to add product: " + error.message);
    res.redirect("/dashboard");
  }
});

module.exports = router;