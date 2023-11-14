const express = require("express");
const unit_x_ability = express.Router();
const {
  getAllUnit_x_abilities,
  getUnit_x_ability,
  createUnit_x_ability,
  deleteUnit_x_ability,
  updateUnit_x_ability,
} = require("../queries/unit_x_ability");
//const reviewsController = require("./reviewsController.js");
//unit_x_abilitys.use("/:unit_x_abilityId/reviews", reviewsController)

//const { checkName, checkBoolean } = require("../validations/checkUnit_x_abilitys.js");

unit_x_ability.get("/", async (req, res) => {
  const allUnit_x_abilities = await getAllUnit_x_abilities();
  if (allUnit_x_abilities[0]) {
    res.status(200).json(allUnit_x_abilities);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
unit_x_ability.get("/:id", async (req, res) => {
  const { id } = req.params;
  const unit_x_ability = await getUnit_x_ability(id);
  if (unit_x_ability) {
    res.json(unit_x_ability);
  } else {
    res.status(404).json({ error: "not found" });
  }
});


// CREATE
unit_x_ability.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const unit_x_ability = await createUnit_x_ability(req.body);
    res.json(unit_x_ability);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

unit_x_ability.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUnit_x_ability = await deleteUnit_x_ability(id);
  if (deletedUnit_x_ability.id) {
    res.status(200).json(deletedUnit_x_ability);
  } else {
    res.status(404).json("Unit_x_ability not found");
  }
});

// UPDATE
unit_x_ability.put("/:id",checkName, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedUnit_x_ability = await updateUnit_x_ability(id, req.body);
  res.status(200).json(updatedUnit_x_ability);
});

module.exports = unit_x_ability;
