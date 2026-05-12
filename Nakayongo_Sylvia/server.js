// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const sequelize = require("./config/database");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ====================== DATABASE CONNECTION ======================
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL Database Connected Successfully");
    
    // ====================== SYNC MODELS ======================
    return sequelize.sync({ alter: true });   // ← This creates/updates the table
  })
  .then(() => {
    console.log("✅ Tables synced successfully (Product table created)");
  })
  .catch((err) => {
    console.error("❌ Database Error:", err);
  });

// ====================== MIDDLEWARE ======================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "inventorysecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ====================== ROUTES ======================
app.use("/", dashboardRoutes);

// ====================== START SERVER ======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});