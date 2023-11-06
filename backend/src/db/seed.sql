-- psql -U postgres -f src/db/seed.sql
-- node src/db/init-db.js

INSERT INTO environment
(name)
VALUES
('Land'),
('Sea'),
('Air');

INSERT INTO faction
(name)
VALUES
('Self'),
('Friendly'),
('Unfriendly');


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
(environment_id, combatphase_id_attack, combatphase_id_defense, name, cost, move, attack_required_to_hit, defense_required_to_hit, number_of_attack_rolls, number_of_defense_rolls)
VALUES
(1, 6, 6, 'Infantry', 3, 1, 1, 2, 1, 1),           
(1, 6, 6, 'Artillery', 4, 1, 2, 2, 1, 1),
(1, 6, 6, 'Tank', 6, 2, 3, 3, 1, 1),
(1, 0, 2, 'Antiaircraft Gun', 5, 1, 0, 1, 0, 3),
(1, 0, 2, 'Industrial Complex', 15, 0, 0, 1, 0, 3),
(2, 0, 0, 'Transport', 7, 2, 0, 0, 0, 0),
(2, 4, 4, 'Submarine', 6, 2, 2, 1, 1, 1),
(2, 6, 6, 'Destroyer', 8, 2, 2, 2, 1, 1),
(2, 6, 6, 'Aircraft Carrier', 14, 2, 1, 2, 1, 1),
(2, 6, 6, 'Cruiser', 12, 3, 3, 1, 1),
(2, 6, 6, 'Battleship', 20, 2, 4, 4, 1, 1),
(3, 6, 6, 'Fighter', 10, 4, 3, 4, 1, 1),
(3, 6, 6, 'Bomber', 12, 6, 4, 1, 1, 1);
(1, 6, 6, 'Infantry, Buffed', 3, 1, 2, 2);
(2, 6, 6, 'Submarine, Debuffed', 6, 2, 2, 1, 1, 1),
(2, 6, 6, 'Battleship, Damage Counter', 0, 2, 0, 0, 0, 0);

INSERT INTO ability
(faction_id_affected, remove_unit_id, add_unit_id, phase_id, name, number_required, target_affected_count)
VALUES
(1, 1, 14, 5, 'Boost Infantry', 1, 1),
(3, 7, 15, 3, 'Debuff Submarine', 1, -1),
(1, 0, 16, 1, 'Battleship Damage Counter', 1, 1);

INSERT INTO unit_x_ability
(unit_id, ability_id)
VALUES
(2, 1),
(8, 2),
(11, 3);