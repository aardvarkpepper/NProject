-- psql -U postgres -f src/db/schema.sql

-- "Drop table" required where database cannot be dropped (e.g. render(?))
-- DROP TABLE IF EXISTS environment CASCADE;
-- DROP TABLE IF EXISTS faction CASCADE;
-- DROP TABLE IF EXISTS combatphase CASCADE;
-- DROP TABLE IF EXISTS unit CASCADE;
-- DROP TABLE IF EXISTS ability CASCADE;
-- DROP TABLE IF EXISTS unit_x_ability CASCADE;

-- rename database when changing from dev to production.  Hm.  Why not just name it production to begin with?

DROP DATABASE IF EXISTS nproject_dev;
CREATE DATABASE nproject_dev;

\c nproject_dev;

CREATE TABLE environment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE faction (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
)

CREATE TABLE combatphase (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  description VARCHAR(400) NOT NULL
);

CREATE TABLE unit (
  id SERIAL PRIMARY KEY,
  environment_id INT REFERENCES type (id) ON DELETE CASCADE NOT NULL,
  combatphase_id_attack INT REFERENCES combatphase (id) ON DELETE CASCADE NOT NULL,
  combatphase_id_defense INT REFERENCES combatphase (id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(40) NOT NULL,
  cost SMALLINT NOT NULL,
  move SMALLINT NOT NULL,
  attack_required_to_hit SMALLINT NOT NULL,
  defense_required_to_hit SMALLINT NOT NULL,
  number_of_attack_rolls SMALLINT NOT NULL,
  number_of_defense_rolls SMALLINT NOT NULL
);

CREATE TABLE ability (
  id SERIAL PRIMARY KEY,
  faction_id_affected INT REFERENCES faction (id) ON DELETE CASCADE NOT NULL,
  remove_unit_id INT REFERENCES unit (id) ON DELETE CASCADE NOT NULL,
  add_unit_id INT REFERENCES unit (id) ON DELETE CASCADE NOT NULL,
  phase_id INT REFERENCES phase (id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(40) NOT NULL,
  number_required SMALLINT NOT NULL,
  target_affected_count SMALLINT NOT NULL
);

CREATE TABLE unit_x_ability (
  id SERIAL PRIMARY KEY,
  unit_id INT REFERENCES unit (id) ON DELETE CASCADE NOT NULL,
  ability_id INT REFERENCES ability (id) ON DELETE CASCADE NOT NULL,
);
