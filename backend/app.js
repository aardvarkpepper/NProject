// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const bookmarksController = require("./controllers/bookmarkController.js");
//Reviews ROUTES (added below May 1, commented out May 2 per class instructions)
// const reviewsController = require("./controllers/reviewsController.js");
// app.use("/reviews", reviewsController);
app.use("/bookmarks", bookmarksController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});
// EXPORT
module.exports = app;