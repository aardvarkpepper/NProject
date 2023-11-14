const db = require("../db/dbConfig.js");
// 2023 Nov 8 - later fix this so it requires version.
// see bookmarksApr30 for validation, multiple routes in one (bookmarks query and controller)


const getAllUnit_x_abilities = async () => {
  try {
    const allUnit_x_abilities = await db.any("SELECT * FROM unit_x_ability");
    return allUnit_x_abilities;
  } catch (error) {
    return error;
  }
};

const getUnit_x_ability = async (id) => {
  try {
    const oneUnit_x_ability = await db.one("SELECT * FROM unit_x_ability WHERE id=$1", id);
    return oneUnit_x_ability;
  } catch (error) {
    return error;
  }
};

//bootlegcode
// const getUnit_x_abilityReviews = async (id) => {
//   try {
//     const unit_x_abilityReviews = await db.any("SELECT * FROM reviews WHERE unit_x_ability_id=$1", id);
//     return unit_x_abilitysReviews;
//   } catch (error) {
//     return error;
//   }
// };

// CREATE

//(environment_id, combatphase_id_attack, combatphase_id_defense, name, cost, move, attack_required_to_hit, defense_required_to_hit, number_of_attack_rolls, number_of_defense_rolls)
const createUnit_x_ability = async (unit_x_ability) => {
  try {
    const newUnit_x_ability = await db.one(
      "INSERT INTO unit_x_ability (unit_id, ability_id) VALUES($1, $2) RETURNING *",
      [unit_x_ability.unit_id, unit_x_ability.ability_id]
    );
    return newUnit_x_ability;
  } catch (error) {
    return error;
  }
};

const deleteUnit_x_ability = async (id) => {
  try {
    const deletedUnit_x_ability = await db.one(
      "DELETE FROM unit_x_ability WHERE id = $1 RETURNING *",
      id
    );
    return deletedUnit_x_ability;
  } catch (error) {
    return error;
  }
};

const updateUnit_x_ability = async (id, unit_x_ability) => {
  try {
    const updatedUnit_x_ability = await db.one(
      "UPDATE unit_x_ability SET unit_id=$1, ability_id=$2 where id=$3 RETURNING *",
      [unit_x_ability.unit_id, unit_x_ability.ability_id, id]
    );
    return updatedUnit_x_ability;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllUnit_x_abilities, createUnit_x_ability, getUnit_x_ability, deleteUnit_x_ability, updateUnit_x_ability };