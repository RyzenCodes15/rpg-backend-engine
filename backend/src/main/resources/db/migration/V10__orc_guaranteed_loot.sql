-- Update Orc's loot table (`cccccccc-3333-3333-3333-333333333333`) to 100% guaranteed drop for demo/portfolio purposes
UPDATE monster_loot 
SET drop_chance = 100.0 
WHERE monster_id = 'cccccccc-3333-3333-3333-333333333333' 
  AND item_id IN (
    SELECT id FROM items WHERE name IN ('Orc Tooth', 'Shiny Sword')
  );
