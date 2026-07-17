-- Fix swapped monster IDs between Slime and Orc from earlier migrations in existing databases
UPDATE monster_loot SET monster_id = (SELECT id FROM monsters WHERE name = 'Slime' LIMIT 1)
WHERE item_id IN (SELECT id FROM items WHERE name IN ('Green Jelly', 'Blue Jelly', 'Mana Jelly', 'Primal Slime Core'));

UPDATE monster_loot SET monster_id = (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1)
WHERE item_id IN (SELECT id FROM items WHERE name IN ('Orc Axe', 'Heavy Armor Plate', 'War Boots', 'Warlord''s Axe'));

-- Clean up any incorrectly assigned Orc Tooth or Shiny Sword entries across all monsters
DELETE FROM monster_loot WHERE item_id IN (SELECT id FROM items WHERE name IN ('Orc Tooth', 'Shiny Sword'));

-- Attach Orc Tooth and Shiny Sword exclusively to Orc (`name = 'Orc'`) with 100% guaranteed drop chance for demo/portfolio
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES 
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1), (SELECT id FROM items WHERE name = 'Orc Tooth' LIMIT 1), 100.0),
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1), (SELECT id FROM items WHERE name = 'Shiny Sword' LIMIT 1), 100.0);
