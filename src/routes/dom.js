const express = require("express");
const router = express.Router();

// Zafiyetli (vulnerable) sayfa
router.get("/vulnerable", (req, res) => {
  res.render("dom/vulnerable");
});

// Güvenli (secure) sayfa
router.get("/secure", (req, res) => {
  res.render("dom/secure");
});

module.exports = router;
