-- psql -U postgres -f src/db/seed.sql
-- node src/db/init-db.js

INSERT INTO type
(name)
VALUES
('Land'),
('Sea'),
('Air');

INSERT INTO combatphase
(name, description)
VALUES
('One-Time Enhancement', '(E.g. battleship create temporary unit)'),
('One-Time Combat', '(E.g. AA gun, IC AA)'),
('First Strike Enhancement', '(E.g. destroyer debuff enemy sub)'),
('First Strike Combat', '(E.g. submarine surprise strike)'),
('Regular Enhancement', '(E.g. artillery buff infantry)'),
('Regular Combat', '(E.g. infantry and fighters vs infantry)'),
('Resolve Subphase', '(E.g. all units on one side destroyed OR sides can no longer hit one another, attacker retreat, attacker partial retreat (amphib), repeat from First Strike Enhancement)'),
('Cleanup', 'E.g. remove battleship temporary unit, remove boosted infantry, otherwise revert temporary changes'); 

INSERT INTO unit
(name, type_id, combatphase_id_attack, combatphase_id_defense, cost, move, attack_required_to_hit, defense_required_to_hit, number_of_attack_rolls, number_of_defense_rolls)
VALUES
('Infantry', 1, 6, 6, 3, 1, 1, 2, 1, 1),           
('Artillery', 1, 6, 6, 4, 1, 2, 2, 1, 1),
('Tank', 1, 6, 6, 6, 2, 3, 3, 1, 1),
('Antiaircraft Gun', 1, 0, 2, 5, 1, 0, 1, 0, 3),
('Industrial Complex', 1, 0, 2, 15, 0, 0, 1, 0, 3),
('Transport', 2, 0, 0, 7, 2, 0, 0, 0, 0),
('Submarine', 2, 4, 4, 6, 2, 2, 1, 1, 1),
('Destroyer', 2, 6, 6, 8, 2, 2, 2, 1, 1),
('Aircraft Carrier', 2, 6, 6, 14, 2, 1, 2, 1, 1),
('Cruiser', 2, 6, 6, 12, 3, 3, 1, 1),
('Battleship', 2, 6, 6, 20, 2, 4, 4, 1, 1),
('Fighter', 3, 6, 6, 10, 4, 3, 4, 1, 1),
('Bomber', 3, 6, 6, 12, 6, 4, 1, 1, 1);
('Infantry, Boosted', 1, 1, 1, 3, 1, 2, 2);
('Submarine, Restricted', 2, 6, 6, 6, 2, 2, 1, 1, 1);


INSERT INTO ability
(unit_id, removes_unit_id, replacement_unit_id, name, phase_applied, number_required, target_affiliation, target_affected_count, unit_replaced, unit_created)
VALUES
(2, 1, 14, 'Boost Infantry', 5, 1, 'Self', 1, 1, 14),
()

CREATE TABLE ability (
  id SERIAL PRIMARY KEY,
  target_unit_id INT REFERENCES unit (id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(40) NOT NULL,
  phase SMALLINT NOT NULL,
  number_required SMALLINT NOT NULL,
  target_affiliation VARCHAR(20) NOT NULL,
  target_affected_count SMALLINT NOT NULL
);