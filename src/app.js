require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const storedRoutes = require("./routes/stored");
const reflectedRoutes = require("./routes/reflected");
const domRoutes = require("./routes/dom");
const adminRoutes = require("./routes/admin");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

// Helmet middleware with a more permissive CSP for the lab
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
        "script-src-attr": ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

// EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/stored", storedRoutes);
app.use("/reflected", reflectedRoutes);
app.use("/dom", domRoutes);
app.use("/admin", adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("An error occurred!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
