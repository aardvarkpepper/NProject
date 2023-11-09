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

-- 2023 Nov 8 note:
-- later create ruleset_x_combatphase, ruleset_x_unit, ruleset_x_ability, ruleset_x_unit_x_ability
-- for now remember, just has to ship.

CREATE TABLE ruleset (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL
);

CREATE TABLE environment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE faction (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

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
  attack_targets_environment_id INT REFERENCES type (id) ON DELETE CASCADE NOT NULL,
  defense_targets_environment_id INT REFERENCES type (id) ON DELETE CASCADE NOT NULL,
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

CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL,
  email VARCHAR(120),
  salted_password_hash VARCHAR(80) NOT NULL,
  profile_picture_source VARCHAR (120),
  role VARCHAR(40)
);

CREATE TABLE client_to_registration_datetime (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES client (id) ON DELETE CASCADE NOT NULL,
  registration_datetime DATE NOT NULL,
);

CREATE TABLE language (
  id SERIAL PRIMARY KEY,
  created_datetime DATE NOT NULL,
  name VARCHAR(20) NOT NULL,
  image VARCHAR(80) NOT NULL
);

CREATE TABLE login_attempt (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES client (id) ON DELETE CASCADE NOT NULL,
  login_attempt_datetime DATE NOT NULL,
  successful BOOLEAN NOT NULL,
);

CREATE TABLE client_to_user_setting (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES client (id) ON DELETE CASCADE NOT NULL,
  language_id INT REFERENCES language (id) ON DELETE CASCADE NOT NULL,
  regional_datetime_settings VARCHAR(20) NOT NULL,
  regional_currency VARCHAR(30) NOT NULL,
  email_notifications BOOLEAN NOT NULL,
  push_notifications BOOLEAN NOT NULL,
  privacy_settings VARCHAR(20) NOT NULL,
  data_sharing_preferences VARCHAR(20) NOT NULL,
  data_visibility VARCHAR(20) NOT NULL,
  color_contrast_preferences VARCHAR(30) NOT NULL,
  screen_reader_integration BOOLEAN NOT NULL,
  email_preferences VARCHAR(20) NOT NULL,
  newsletter VARCHAR(20) NOT NULL,
  marketing VARCHAR(20) NOT NULL,
  display_density VARCHAR(20) NOT NULL,
  sound_volume SMALLINT NOT NULL,
  video_autoplay_setting BOOLEAN NOT NULL,
  media_playback_quality VARCHAR(20) NOT NULL,
);

CREATE TABLE client_to_theme (
  id SERIAL PRIMARY KEY,
  primary_color VARCHAR(20) NOT NULL,
  secondary_color VARCHAR(20) NOT NULL,
  tertiary_color VARCHAR(20) NOT NULL,
  text_font VARCHAR(30) NOT NULL,
  text_color VARCHAR(20) NOT NULL,
  text_size SMALLINT NOT NULL, -- this overlaps with 'setting'
  link_color VARCHAR(20) NOT NULL,
  followed_link_color VARCHAR(20) NOT NULL,
  image_overlay_source VARCHAR(120)
);