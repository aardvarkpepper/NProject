const express = require("express");
const unit = express.Router();
const {
  getAllUnits,
  getUnit,
  createUnit,
  deleteUnit,
  updateUnit,
} = require("../queries/unit");
//const reviewsController = require("./reviewsController.js");
//units.use("/:unitId/reviews", reviewsController)

//const { checkName, checkBoolean } = require("../validations/checkUnits.js");

unit.get("/", async (req, res) => {
  const allUnits = await getAllUnits();
  if (allUnits[0]) {
    res.status(200).json(allUnits);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
unit.get("/:id", async (req, res) => {
  const { id } = req.params;
  const unit = await getUnit(id);
  if (unit) {
    res.json(unit);
  } else {
    res.status(404).json({ error: "not found" });
  }
});


// CREATE
unit.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const unit = await createUnit(req.body);
    res.json(unit);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

unit.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUnit = await deleteUnit(id);
  if (deletedUnit.id) {
    res.status(200).json(deletedUnit);
  } else {
    res.status(404).json("Unit not found");
  }
});

// UPDATE
unit.put("/:id",checkName, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedUnit = await updateUnit(id, req.body);
  res.status(200).json(updatedUnit);
});

module.exports = unit;
