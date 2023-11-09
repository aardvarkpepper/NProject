const db = require("../db/dbConfig.js");
// 2023 Nov 8 - later fix this so it requires version.
// see bookmarksApr30 for validation, multiple routes in one (bookmarks query and controller)


const getAllAbilities = async () => {
  try {
    const allAbilities = await db.any("SELECT * FROM ability");
    return allAbilities;
  } catch (error) {
    return error;
  }
};

const getAbility = async (id) => {
  try {
    const oneAbility = await db.one("SELECT * FROM ability WHERE id=$1", id);
    return oneAbility;
  } catch (error) {
    return error;
  }
};

//bootlegcode
// const getAbilityReviews = async (id) => {
//   try {
//     const abilityReviews = await db.any("SELECT * FROM reviews WHERE ability_id=$1", id);
//     return abilitysReviews;
//   } catch (error) {
//     return error;
//   }
// };

// CREATE

//(environment_id, combatphase_id_attack, combatphase_id_defense, name, cost, move, attack_required_to_hit, defense_required_to_hit, number_of_attack_rolls, number_of_defense_rolls)
const createAbility = async (ability) => {
  try {
    const newAbility = await db.one(
      "INSERT INTO ability (faction_id_affected, remove_unit_id, add_unit_id, phase_id, name, number_required, target_affected_count) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [ability.faction_id_affected, ability.remove_unit_id, ability.add_unit_id, ability.phase_id, ability.name, ability.number_required, ability.target_affected_count]
    );
    return newAbility;
  } catch (error) {
    return error;
  }
};

const deleteAbility = async (id) => {
  try {
    const deletedAbility = await db.one(
      "DELETE FROM ability WHERE id = $1 RETURNING *",
      id
    );
    return deletedAbility;
  } catch (error) {
    return error;
  }
};

const updateAbility = async (id, ability) => {
  try {
    const updatedAbility = await db.one(
      "UPDATE ability SET faction_id_affected=$1, remove_unit_id=$2, add_unit_id=$3, phase_id=$4, name=$5, number_required=$6, target_affected_count=$7 where id=$8 RETURNING *",
      [ability.faction_id_affected, ability.remove_unit_id, ability.add_unit_id, ability.phase_id, ability.name, ability.number_required, ability.target_affected_count, id]
    );
    return updatedAbility;
  } catch (error) {
    return error;
  }
};


module.exports = { getAllAbilities, createAbility, getAbility, deleteAbility, updateAbility };