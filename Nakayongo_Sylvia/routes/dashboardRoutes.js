// dashboardRoute.js

const express = require("express");
const router = express.Router();

/**
 * Dashboard route
 * You can protect this route later with authentication middleware
 */

// GET /dashboard
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the dashboard",
    data: {
      stats: {
        users: 120,
        sales: 45,
        visits: 300,
      },
    },
  });
});


// Example POST route (e.g. update dashboard settings)
router.post("/settings", (req, res) => {
  const settings = req.body;

  // Normally you'd save to DB here

  res.status(200).json({
    success: true,
    message: "Settings updated successfully",
    updatedSettings: settings,
  });
});

module.exports = router; 
