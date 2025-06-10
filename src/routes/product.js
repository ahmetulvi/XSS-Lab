const express = require("express");
const router = express.Router();

// Sample comment data (in English)
let comments = [
  {
    id: 1,
    name: "Alex Doe",
    comment:
      "This piezoelectric bracelet is amazing! It charges my phone on the go.",
    date: "2024-03-10",
  },
  {
    id: 2,
    name: "Jamie Smith",
    comment:
      "Innovative technology! I love the design and the concept of generating power from movement. <b>Very cool!</b>",
    date: "2024-03-08",
  },
  {
    id: 3,
    name: "Casey Brown",
    comment:
      "Looks great and is surprisingly lightweight. The charging is a bit slow, but it's a fantastic backup.",
    date: "2024-03-05",
  },
];

// Piezoelectric Bracelet product page
router.get("/", (req, res) => {
  res.render("product/bracelet", {
    title: "Piezoelectric Energy Bracelet", // Updated title
    comments: comments,
  });
});

// Add comment (XSS vulnerability here!)
router.post("/comment", (req, res) => {
  const { name, comment } = req.body;

  const newComment = {
    id: comments.length + 1,
    name: name,
    comment: comment, // XSS Vulnerability!
    date: new Date().toISOString().split("T")[0],
  };

  comments.push(newComment);

  res.redirect("/product");
});

// Clear all comments endpoint
router.post("/clear-comments", (req, res) => {
  try {
    // Reset comments to original sample data
    comments = [
      {
        id: 1,
        name: "Alex Doe",
        comment:
          "This piezoelectric bracelet is amazing! It charges my phone on the go.",
        date: "2024-03-10",
      },
      {
        id: 2,
        name: "Jamie Smith",
        comment:
          "Innovative technology! I love the design and the concept of generating power from movement. <b>Very cool!</b>",
        date: "2024-03-08",
      },
      {
        id: 3,
        name: "Casey Brown",
        comment:
          "Looks great and is surprisingly lightweight. The charging is a bit slow, but it's a fantastic backup.",
        date: "2024-03-05",
      },
    ];

    console.log("Product page comments cleared - reset to original samples");
    res.redirect("/product?status=cleared");
  } catch (err) {
    console.error("Error clearing product comments:", err);
    res.redirect("/product?status=clear_error");
  }
});

module.exports = router;
