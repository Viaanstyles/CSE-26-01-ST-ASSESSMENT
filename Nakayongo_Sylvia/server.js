<<<<<<< HEAD
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
=======
// Dependancies
const express = require("express");
// const expressSsession = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config(); // for accessing the .env file

// Importing routes
const indexRoute = require("./routes/dashboardRoutes");
// instantiations
const app = express();
const port = 3003;

// configurations
// setting up database connections
mongoose.connect(process.env.DATABASE); //process is the currently running project and then looks for .env file
mongoose.connection
  .once("open", () => {
    console.log("Mongoose Connection Open");
  })
  .on("error", (err) => {
    console.error(`Connection Error ${err.message}`);
  });

//set the view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); //specifies the views directory

// middleware
// To parse URL encoded data
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false })); // this helps to parse data from forms
app.use("/public/uploads", express.static(__dirname + "/public/uploads")); // first path specify where images are going to be stored and the 2nd path describes where to find them
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // IMPORTANT for local dev (HTTP)
    },
  }),
);

//  routes
app.use("/", dashboardRoutes);

app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

// bootstraping server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
>>>>>>> 2e075f145860fa2af2c0cbd499c5d9759c505376
