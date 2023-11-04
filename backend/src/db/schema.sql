-- psql -U postgres -f src/db/schema.sql

DROP TABLE IF EXISTS unit CASCADE;

-- Create a table for "unit"
CREATE TABLE unit (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  type VARCHAR(20) NOT NULL,
  cost SMALLINT NOT NULL,
  move SMALLINT NOT NULL,
  attack_required_to_hit SMALLINT NOT NULL,
  defense_required_to_hit SMALLINT NOT NULL,
  number_of_attack_rolls SMALLINT NOT NULL,
  number_of_defense_rolls SMALLINT NOT NULL
);

CREATE TABLE ability (
  id SERIAL PRIMARY KEY,
  target_unit_id INT REFERENCES unit (id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(40) NOT NULL,
  phase SMALLINT NOT NULL,
  number_required SMALLINT NOT NULL,
  target_affiliation VARCHAR(20) NOT NULL,
  target_affected_count SMALLINT NOT NULL
);

CREATE TABLE unit_ability (
  id SERIAL PRIMARY KEY,
  unit_id INT REFERENCES unit (id) ON DELETE CASCADE NOT NULL,
  ability_id INT REFERENCES ability (id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(40) NOT NULL,
)
