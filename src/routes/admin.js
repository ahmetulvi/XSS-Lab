const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import the Comment model (assuming it's defined elsewhere, e.g., in stored.js or a dedicated models file)
// If not defined globally, we might need to redefine or import it.
// For simplicity, let's try accessing the existing model.
let Comment;
try {
  Comment = mongoose.model("Comment");
} catch (error) {
  // Define schema and model if not already registered
  console.warn(
    "Comment model not found, attempting to define locally for admin route."
  );
  const commentSchema = new mongoose.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
  });
  Comment = mongoose.model("Comment", commentSchema);
}

router.get("/view-db", async (req, res, next) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.render("admin/view-db", {
      comments: comments,
      pageTitle: "Raw Database Comments", // Pass a title
    });
  } catch (err) {
    console.error("Error fetching comments for admin view:", err);
    res.status(500).send("Error fetching comments.");
    // Or render an error page: next(err);
  }
});

module.exports = router;
