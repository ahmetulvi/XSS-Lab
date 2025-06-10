const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});
const Comment = mongoose.model("Comment", commentSchema);

// Vulnerable Page
router.get("/vulnerable", async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 });
  res.render("stored/vulnerable", { comments });
});

router.post("/vulnerable", async (req, res) => {
  console.log("Alınan Ham Yorum:", req.body.content);
  await Comment.create({ content: req.body.content });
  res.redirect("/stored/vulnerable");
});

// Secure Page
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

router.get("/secure", async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 });
  res.render("stored/secure", { comments, encodeHTML });
});

router.post("/secure", async (req, res) => {
  let content = req.body.content;
  if (!/^[a-zA-Z0-9 .,!?-]+$/.test(content)) {
    return res.status(400).send("Invalid entry!");
  }
  await Comment.create({ content });
  res.redirect("/stored/secure");
});

// Route to clear all comments
router.post("/clear-comments", async (req, res) => {
  try {
    await Comment.deleteMany({}); // Deletes all documents in the Comment collection
    // Redirect back to the page the user was on, or a default

    const referrer = req.header("Referer");
    if (
      referrer &&
      (referrer.includes("/stored/vulnerable") ||
        referrer.includes("/stored/secure"))
    ) {
      res.redirect(referrer.split("?")[0] + "?status=cleared");
    } else {
      res.redirect("/stored/vulnerable?status=cleared"); // Go to vulnerable page by default
    }
  } catch (err) {
    console.error("Error clearing comments:", err);

    const referrerOnError = req.header("Referer") || "/stored/vulnerable";
    res.redirect(referrerOnError + "?status=clear_error");
  }
});

module.exports = router;
