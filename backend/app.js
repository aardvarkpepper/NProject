// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const abilityController = require("./controllers/abilityController.js");
const unitController = require("./controllers/unitController.js");
const unit_x_abilityController = require("./controllers/unit_x_abilityController.js");

app.use("/ability", abilityController);
app.use("/unit", unitController);
app.use("/unit_x_ability", unit_x_abilityController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Backend Home Page");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});
// EXPORT
module.exports = app;