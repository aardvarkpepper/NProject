-- psql -U postgres -f src/db/seed.sql
-- node src/db/init-db.js

INSERT INTO unit
(name, type, cost, move, attack_required_to_hit, defense_required_to_hit, number_of_attack_rolls, number_of_defense_rolls)
VALUES
('Infantry', 'Land', 3, 1, 1, 2, 1, 1),           
('Artillery', 'Land', 4, 1, 2, 2, 1, 1),
('Tank', 'Land', 6, 2, 3, 3, 1, 1),
-- ('Antiaircraft Gun');

--   id SERIAL PRIMARY KEY,
--   name VARCHAR(40) NOT NULL,
--   type VARCHAR(20) NOT NULL,
--   cost SMALLINT NOT NULL,
--   move SMALLINT NOT NULL,
--   attack_required_to_hit SMALLINT NOT NULL,
--   number_of_attack_rolls SMALLINT NOT NULL,
--   defense_required_to_hit SMALLINT NOT NULL,
--   number_of_defense_rolls SMALLINT NOT NULL