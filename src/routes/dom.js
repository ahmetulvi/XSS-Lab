const express = require("express");
const router = express.Router();

// Vulnerable Page
router.get("/vulnerable", (req, res) => {
  res.render("dom/vulnerable");
});

// Secure Page
router.get("/secure", (req, res) => {
  res.render("dom/secure");
});

module.exports = router;
