-- 1. Insert Legendary Consumable: Orc Tooth
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_health, bonus_mana) VALUES 
('60000000-0000-0000-0000-000000000001', 'Orc Tooth', 'An enormous tooth ripped from a mighty Orc. Restores vitality and magical energy.', 'LEGENDARY', 'CONSUMABLE', 500, 5, 0, 50, 50)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    rarity = EXCLUDED.rarity,
    category = EXCLUDED.category,
    value = EXCLUDED.value,
    required_level = EXCLUDED.required_level,
    bonus_health = EXCLUDED.bonus_health,
    bonus_mana = EXCLUDED.bonus_mana;

-- 2. Insert Legendary Weapon: Shiny Sword
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_defense) VALUES 
('10000000-0000-0000-0000-000000000011', 'Shiny Sword', 'A beautifully forged sword that radiates power.', 'LEGENDARY', 'WEAPON', 1000, 5, 20, 0)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    rarity = EXCLUDED.rarity,
    category = EXCLUDED.category,
    value = EXCLUDED.value,
    required_level = EXCLUDED.required_level,
    bonus_attack = EXCLUDED.bonus_attack;

-- 3. Add to Orc's Loot Table (using subquery by name 'Orc' to ensure exact monster match) with 100% guaranteed drop for demo/portfolio
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES 
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1), (SELECT id FROM items WHERE name = 'Orc Tooth' LIMIT 1), 100.0),
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1), (SELECT id FROM items WHERE name = 'Shiny Sword' LIMIT 1), 100.0);
