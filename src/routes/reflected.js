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

// Zafiyetli (vulnerable) sayfa
router.get("/vulnerable", (req, res) => {
  res.render("reflected/vulnerable", { query: req.query.q });
});

// Güvenli (secure) sayfa
router.get("/secure", (req, res) => {
  res.render("reflected/secure", { query: req.query.q, encodeHTML });
});

module.exports = router;
