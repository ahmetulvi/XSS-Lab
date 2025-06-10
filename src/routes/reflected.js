const express = require("express");
const router = express.Router();

function encodeHTML(str) {
  return str.replace(/[&<>"'/]/g, function (s) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
    }[s];
  });
}

// Vulnerable Page
router.get("/vulnerable", (req, res) => {
  res.render("reflected/vulnerable", { query: req.query.q });
});

// Secure Page
router.get("/secure", (req, res) => {
  res.render("reflected/secure", { query: req.query.q, encodeHTML });
});

module.exports = router;
