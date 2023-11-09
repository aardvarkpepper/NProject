const express = require("express");
const ability = express.Router();
const {
  getAllAbilities,
  getAbility,
  createAbility,
  deleteAbility,
  updateAbility,
} = require("../queries/ability");
//const reviewsController = require("./reviewsController.js");
//abilitys.use("/:abilityId/reviews", reviewsController)

//const { checkName, checkBoolean } = require("../validations/checkAbilitys.js");

ability.get("/", async (req, res) => {
  const allAbilities = await getAllAbilities();
  if (allAbilities[0]) {
    res.status(200).json(allAbilities);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
ability.get("/:id", async (req, res) => {
  const { id } = req.params;
  const ability = await getAbility(id);
  if (ability) {
    res.json(ability);
  } else {
    res.status(404).json({ error: "not found" });
  }
});


// CREATE
ability.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const ability = await createAbility(req.body);
    res.json(ability);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

ability.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedAbility = await deleteAbility(id);
  if (deletedAbility.id) {
    res.status(200).json(deletedAbility);
  } else {
    res.status(404).json("Ability not found");
  }
});

// UPDATE
ability.put("/:id",checkName, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedAbility = await updateAbility(id, req.body);
  res.status(200).json(updatedAbility);
});

module.exports = ability;
