const db = require("../db/dbConfig.js");
// 2023 Nov 8 - later fix this so it requires version.
// see bookmarksApr30 for validation, multiple routes in one (bookmarks query and controller)


const getAllUnits = async () => {
  try {
    const allUnits = await db.any("SELECT * FROM unit");
    return allUnits;
  } catch (error) {
    return error;
  }
};

const getUnit = async (id) => {
  try {
    const oneUnit = await db.one("SELECT * FROM unit WHERE id=$1", id);
    return oneUnit;
  } catch (error) {
    return error;
  }
};

//bootlegcode
// const getUnitReviews = async (id) => {
//   try {
//     const unitReviews = await db.any("SELECT * FROM reviews WHERE unit_id=$1", id);
//     return unitsReviews;
//   } catch (error) {
//     return error;
//   }
// };

// CREATE

//(environment_id, combatphase_id_attack, combatphase_id_defense, name, cost, move, attack_required_to_hit, defense_required_to_hit, number_of_attack_rolls, number_of_defense_rolls)
const createUnit = async (unit) => {
  try {
    const newUnit = await db.one(
      "INSERT INTO unit (environment_id, combatphase_id_attack, combatphase_id_defense, name, cost, move, attack_required_to_hit, defense_required_to_hit, number_of_attack_rolls, number_of_defense_rolls) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [unit.environment_id, unit.combatphase_id_attack, unit.combatphase_id_defense, unit.name, unit.cost, unit.move, unit.attack_required_to_hit, unit.defense_required_to_hit, unit.number_of_attack_rolls, unit.number_of_defense_rolls]
    );
    return newUnit;
  } catch (error) {
    return error;
  }
};

const deleteUnit = async (id) => {
  try {
    const deletedUnit = await db.one(
      "DELETE FROM unit WHERE id = $1 RETURNING *",
      id
    );
    return deletedUnit;
  } catch (error) {
    return error;
  }
};

const updateUnit = async (id, unit) => {
  try {
    const updatedUnit = await db.one(
      "UPDATE unit SET environment_id=$1, combatphase_id_attack=$2, combatphase_id_defense=$3, name=$4, cost=$5, move=$6, attack_required_to_hit=$7, defense_required_to_hit=$8, number_of_attack_rolls=$9, number_of_defense_rolls=$10 where id=$11 RETURNING *",
      [unit.environment_id, unit.combatphase_id_attack, unit.combatphase_id_defense, unit.name, unit.cost, unit.move, unit.attack_required_to_hit, unit.defense_required_to_hit, unit.number_of_attack_rolls, unit.number_of_defense_rolls, id]
    );
    return updatedUnit;
  } catch (error) {
    return error;
  }
};


module.exports = { getAllUnits, createUnit, getUnit, deleteUnit, updateUnit };