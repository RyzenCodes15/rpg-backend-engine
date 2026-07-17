-- 1. Update Rarity
UPDATE items SET rarity = 'RARE' WHERE rarity = 'UNCOMMON';
UPDATE items SET rarity = 'LEGENDARY' WHERE rarity = 'EPIC';

-- 2. Update Category
UPDATE items SET category = 'ARMOR' WHERE category = 'CHEST_ARMOR';

-- Delete unsupported item categories
DELETE FROM monster_loot WHERE item_id IN (SELECT id FROM items WHERE category NOT IN ('WEAPON', 'HELMET', 'ARMOR', 'BOOTS', 'CONSUMABLE', 'MATERIAL'));
DELETE FROM recipe_ingredients WHERE material_item_id IN (SELECT id FROM items WHERE category NOT IN ('WEAPON', 'HELMET', 'ARMOR', 'BOOTS', 'CONSUMABLE', 'MATERIAL'));
DELETE FROM recipe_ingredients WHERE recipe_id IN (SELECT id FROM recipes WHERE crafted_item_id IN (SELECT id FROM items WHERE category NOT IN ('WEAPON', 'HELMET', 'ARMOR', 'BOOTS', 'CONSUMABLE', 'MATERIAL')));
DELETE FROM recipes WHERE crafted_item_id IN (SELECT id FROM items WHERE category NOT IN ('WEAPON', 'HELMET', 'ARMOR', 'BOOTS', 'CONSUMABLE', 'MATERIAL'));
DELETE FROM inventory_slots WHERE item_id IN (SELECT id FROM items WHERE category NOT IN ('WEAPON', 'HELMET', 'ARMOR', 'BOOTS', 'CONSUMABLE', 'MATERIAL'));
DELETE FROM items WHERE category NOT IN ('WEAPON', 'HELMET', 'ARMOR', 'BOOTS', 'CONSUMABLE', 'MATERIAL');

-- 3. Update character_equipment schema
ALTER TABLE character_equipment RENAME COLUMN chest_item_id TO armor_item_id;
ALTER TABLE character_equipment DROP COLUMN IF EXISTS gloves_item_id;
ALTER TABLE character_equipment DROP COLUMN IF EXISTS shield_item_id;
ALTER TABLE character_equipment DROP COLUMN IF EXISTS ring_item_id;
ALTER TABLE character_equipment DROP COLUMN IF EXISTS amulet_item_id;
ALTER TABLE character_equipment DROP COLUMN IF EXISTS cape_item_id;
ALTER TABLE character_equipment DROP COLUMN IF EXISTS leg_armor_item_id;

-- 4. New Items (Progression)
-- WEAPONS
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_defense) VALUES 
('10000000-0000-0000-0000-000000000001', 'Training Sword', 'A basic training sword.', 'COMMON', 'WEAPON', 5, 1, 3, 0),
('10000000-0000-0000-0000-000000000002', 'Wooden Sword', 'A sturdy wooden sword.', 'COMMON', 'WEAPON', 10, 2, 8, 0),
('10000000-0000-0000-0000-000000000003', 'Knight Sword', 'A well-balanced knight sword.', 'RARE', 'WEAPON', 150, 10, 30, 0),
('10000000-0000-0000-0000-000000000004', 'Mithril Sword', 'A lightweight but deadly sword.', 'RARE', 'WEAPON', 500, 15, 55, 0),
('10000000-0000-0000-0000-000000000005', 'Dragon Sword', 'Forged from dragon bone.', 'LEGENDARY', 'WEAPON', 2000, 20, 100, 0),
('10000000-0000-0000-0000-000000000006', 'Legendary Sword', 'The ultimate weapon.', 'LEGENDARY', 'WEAPON', 5000, 25, 200, -10),
('10000000-0000-0000-0000-000000000007', 'Goblin Blade', 'A rusted goblin blade.', 'RARE', 'WEAPON', 30, 3, 12, 0),
('10000000-0000-0000-0000-000000000008', 'Goblin King''s Sword', 'The sword of the Goblin King.', 'LEGENDARY', 'WEAPON', 800, 12, 45, 0),
('10000000-0000-0000-0000-000000000009', 'Rusted Sword', 'An old, rusted sword.', 'COMMON', 'WEAPON', 8, 2, 5, 0),
('10000000-0000-0000-0000-000000000010', 'Warlord''s Axe', 'A massive, terrifying axe.', 'LEGENDARY', 'WEAPON', 1200, 18, 85, -5)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    rarity = EXCLUDED.rarity,
    category = EXCLUDED.category,
    value = EXCLUDED.value,
    required_level = EXCLUDED.required_level,
    bonus_attack = EXCLUDED.bonus_attack,
    bonus_defense = EXCLUDED.bonus_defense;

-- ARMORS
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_health) VALUES 
('20000000-0000-0000-0000-000000000001', 'Tattered Shirt', 'Barely offers protection.', 'COMMON', 'ARMOR', 5, 1, 2, 10),
('20000000-0000-0000-0000-000000000002', 'Iron Armor', 'Heavy iron plates.', 'RARE', 'ARMOR', 100, 8, 20, 50),
('20000000-0000-0000-0000-000000000003', 'Dragon Mail', 'Impenetrable dragon scales.', 'LEGENDARY', 'ARMOR', 2500, 20, 80, 200),
('20000000-0000-0000-0000-000000000004', 'Heavy Armor Plate', 'Thick armor plate.', 'RARE', 'ARMOR', 120, 10, 25, 40)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    rarity = EXCLUDED.rarity,
    category = EXCLUDED.category,
    value = EXCLUDED.value,
    required_level = EXCLUDED.required_level,
    bonus_defense = EXCLUDED.bonus_defense,
    bonus_health = EXCLUDED.bonus_health;

-- HELMETS
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_mana) VALUES 
('30000000-0000-0000-0000-000000000001', 'Leather Cap', 'A simple leather cap.', 'COMMON', 'HELMET', 5, 1, 1, 5),
('30000000-0000-0000-0000-000000000002', 'Iron Helmet', 'A sturdy iron helmet.', 'RARE', 'HELMET', 80, 8, 15, 20),
('30000000-0000-0000-0000-000000000003', 'Crown of the Magi', 'A legendary crown.', 'LEGENDARY', 'HELMET', 3000, 22, 40, 150),
('30000000-0000-0000-0000-000000000004', 'Bone Helmet', 'A helmet made of bone.', 'RARE', 'HELMET', 50, 5, 8, 10),
('30000000-0000-0000-0000-000000000005', 'Cursed Skull', 'A legendary cursed skull helmet.', 'LEGENDARY', 'HELMET', 1500, 15, 25, 100)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    rarity = EXCLUDED.rarity,
    category = EXCLUDED.category,
    value = EXCLUDED.value,
    required_level = EXCLUDED.required_level,
    bonus_defense = EXCLUDED.bonus_defense,
    bonus_mana = EXCLUDED.bonus_mana;

-- BOOTS
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_speed, bonus_dodge_chance) VALUES 
('40000000-0000-0000-0000-000000000001', 'Cloth Shoes', 'Basic cloth shoes.', 'COMMON', 'BOOTS', 5, 1, 1, 2, 0.0),
('40000000-0000-0000-0000-000000000002', 'Hunter Boots', 'Agile and silent.', 'RARE', 'BOOTS', 90, 9, 10, 15, 0.05),
('40000000-0000-0000-0000-000000000003', 'Boots of Swiftness', 'Move like the wind.', 'LEGENDARY', 'BOOTS', 2800, 21, 30, 45, 0.15),
('40000000-0000-0000-0000-000000000004', 'War Boots', 'Heavy combat boots.', 'RARE', 'BOOTS', 110, 11, 15, 5, 0.0)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    rarity = EXCLUDED.rarity,
    category = EXCLUDED.category,
    value = EXCLUDED.value,
    required_level = EXCLUDED.required_level,
    bonus_defense = EXCLUDED.bonus_defense,
    bonus_speed = EXCLUDED.bonus_speed,
    bonus_dodge_chance = EXCLUDED.bonus_dodge_chance;

-- MATERIALS & CONSUMABLES
INSERT INTO items (id, name, description, rarity, category, value, required_level) VALUES
('50000000-0000-0000-0000-000000000001', 'Goblin Jelly', 'A common goblin drop.', 'COMMON', 'MATERIAL', 2, 1),
('50000000-0000-0000-0000-000000000002', 'Goblin Tooth', 'A common goblin drop.', 'COMMON', 'MATERIAL', 3, 1),
('50000000-0000-0000-0000-000000000003', 'Alpha Wolf Pelt', 'A legendary wolf pelt.', 'LEGENDARY', 'MATERIAL', 500, 10),
('50000000-0000-0000-0000-000000000004', 'Ancient Bone', 'A common skeleton drop.', 'COMMON', 'MATERIAL', 4, 1),
('50000000-0000-0000-0000-000000000005', 'Green Jelly', 'A common slime drop.', 'COMMON', 'MATERIAL', 2, 1),
('50000000-0000-0000-0000-000000000006', 'Blue Jelly', 'A rare slime drop.', 'RARE', 'MATERIAL', 15, 3),
('50000000-0000-0000-0000-000000000007', 'Primal Slime Core', 'A legendary slime drop.', 'LEGENDARY', 'MATERIAL', 400, 10)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    rarity = EXCLUDED.rarity,
    category = EXCLUDED.category,
    value = EXCLUDED.value,
    required_level = EXCLUDED.required_level;

-- 5. Monster Loot (Expanded drops for Goblin, Wolf, Skeleton, Slime, Orc)
DELETE FROM monster_loot;

-- Goblin
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES 
(gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', (SELECT id FROM items WHERE name = 'Goblin Jelly' LIMIT 1), 40.0), -- Goblin Jelly
(gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', (SELECT id FROM items WHERE name = 'Goblin Tooth' LIMIT 1), 30.0), -- Goblin Tooth
(gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', (SELECT id FROM items WHERE name = 'Goblin Blade' LIMIT 1), 10.0), -- Goblin Blade
(gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', (SELECT id FROM items WHERE name = 'Goblin King''s Sword' LIMIT 1), 1.0);  -- Goblin King's Sword

-- Wolf
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES 
(gen_random_uuid(), 'dddddddd-4444-4444-4444-444444444444', (SELECT id FROM items WHERE name = 'Wolf Fur' LIMIT 1), 40.0),
(gen_random_uuid(), 'dddddddd-4444-4444-4444-444444444444', (SELECT id FROM items WHERE name = 'Sharp Fang' LIMIT 1), 30.0),
(gen_random_uuid(), 'dddddddd-4444-4444-4444-444444444444', (SELECT id FROM items WHERE name = 'Hunter Boots' LIMIT 1), 10.0), -- Hunter Boots
(gen_random_uuid(), 'dddddddd-4444-4444-4444-444444444444', (SELECT id FROM items WHERE name = 'Alpha Wolf Pelt' LIMIT 1), 1.0);  -- Alpha Wolf Pelt

-- Skeleton
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES 
(gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', (SELECT id FROM items WHERE name = 'Ancient Bone' LIMIT 1), 40.0), -- Ancient Bone
(gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', (SELECT id FROM items WHERE name = 'Rusted Sword' LIMIT 1), 30.0), -- Rusted Sword
(gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', (SELECT id FROM items WHERE name = 'Bone Helmet' LIMIT 1), 10.0), -- Bone Helmet
(gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', (SELECT id FROM items WHERE name = 'Cursed Skull' LIMIT 1), 1.0);  -- Cursed Skull

-- Slime (`cccccccc-3333-3333-3333-333333333333`)
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES 
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Slime' LIMIT 1), (SELECT id FROM items WHERE name = 'Green Jelly' LIMIT 1), 40.0), -- Green Jelly
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Slime' LIMIT 1), (SELECT id FROM items WHERE name = 'Blue Jelly' LIMIT 1), 30.0), -- Blue Jelly
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Slime' LIMIT 1), (SELECT id FROM items WHERE name = 'Mana Jelly' LIMIT 1), 10.0),
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Slime' LIMIT 1), (SELECT id FROM items WHERE name = 'Primal Slime Core' LIMIT 1), 1.0);  -- Primal Slime Core

-- Orc (`eeeeeeee-5555-5555-5555-555555555555`)
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES 
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1), (SELECT id FROM items WHERE name = 'Orc Axe' LIMIT 1), 30.0),
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1), (SELECT id FROM items WHERE name = 'Heavy Armor Plate' LIMIT 1), 30.0), -- Heavy Armor Plate
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1), (SELECT id FROM items WHERE name = 'War Boots' LIMIT 1), 10.0), -- War Boots
(gen_random_uuid(), (SELECT id FROM monsters WHERE name = 'Orc' LIMIT 1), (SELECT id FROM items WHERE name = 'Warlord''s Axe' LIMIT 1), 1.0);  -- Warlord's Axe

-- 6. Add New Hero Skills
-- Warrior
INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, icon, animation_name) VALUES 
(gen_random_uuid(), 'Whirlwind', 'Spin around hitting everything.', 'WARRIOR', 5, 20, 3, 25, 'PHYSICAL', 'whirlwind', 'slash_anim'),
(gen_random_uuid(), 'Earth Shatter', 'Slam the ground.', 'WARRIOR', 10, 35, 5, 50, 'PHYSICAL', 'earth_shatter', 'heavy_strike'),
(gen_random_uuid(), 'Charge', 'Rush into the enemy.', 'WARRIOR', 2, 10, 2, 15, 'PHYSICAL', 'charge', 'dash_anim'),
(gen_random_uuid(), 'Execute', 'A devastating finishing blow.', 'WARRIOR', 20, 50, 8, 100, 'PHYSICAL', 'execute', 'heavy_strike'),
(gen_random_uuid(), 'Berserk', 'Go into a frenzy.', 'WARRIOR', 15, 40, 10, 0, 'PHYSICAL', 'berserk', 'buff_anim'),
(gen_random_uuid(), 'Battle Cry', 'A terrifying cry.', 'WARRIOR', 8, 25, 6, 0, 'PHYSICAL', 'battle_cry', 'buff_anim'),
(gen_random_uuid(), 'Shield Wall', 'Block incoming damage.', 'WARRIOR', 12, 30, 8, 0, 'PHYSICAL', 'shield_wall', 'buff_anim'),
(gen_random_uuid(), 'Blade Storm', 'The ultimate warrior attack.', 'WARRIOR', 25, 80, 12, 150, 'PHYSICAL', 'blade_storm', 'slash_anim')
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    mana_cost = EXCLUDED.mana_cost,
    cooldown = EXCLUDED.cooldown,
    base_damage = EXCLUDED.base_damage;

-- Mage
INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type) VALUES 
(gen_random_uuid(), 'Lightning Bolt', 'Zap the enemy.', 'MAGE', 2, 15, 2, 22, 'MAGIC', 'LIGHTNING', 'lightning_bolt', 'lightning_anim', NULL),
(gen_random_uuid(), 'Meteor', 'Call down a meteor.', 'MAGE', 20, 80, 10, 120, 'MAGIC', 'FIRE', 'meteor', 'fireball_anim', 'BURN'),
(gen_random_uuid(), 'Blizzard', 'Summon a freezing storm.', 'MAGE', 12, 45, 6, 60, 'MAGIC', 'ICE', 'blizzard', 'ice_anim', 'FREEZE'),
(gen_random_uuid(), 'Chain Lightning', 'Lightning strikes multiple times.', 'MAGE', 15, 50, 5, 75, 'MAGIC', 'LIGHTNING', 'chain_lightning', 'lightning_anim', NULL),
(gen_random_uuid(), 'Magic Shield', 'Create a barrier.', 'MAGE', 8, 30, 8, 0, 'MAGIC', 'ARCANE', 'magic_shield', 'buff_anim', NULL),
(gen_random_uuid(), 'Teleport', 'Evade attacks.', 'MAGE', 10, 40, 8, 0, 'MAGIC', 'ARCANE', 'teleport', 'dash_anim', NULL),
(gen_random_uuid(), 'Arcane Explosion', 'A massive burst of energy.', 'MAGE', 25, 100, 12, 160, 'MAGIC', 'ARCANE', 'arcane_explosion', 'arcane_anim', NULL),
(gen_random_uuid(), 'Mana Burst', 'Unleash raw mana.', 'MAGE', 5, 25, 3, 30, 'MAGIC', 'ARCANE', 'mana_burst', 'arcane_anim', NULL)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    mana_cost = EXCLUDED.mana_cost,
    cooldown = EXCLUDED.cooldown,
    base_damage = EXCLUDED.base_damage;

-- Archer
INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, icon, animation_name) VALUES 
(gen_random_uuid(), 'Explosive Arrow', 'An arrow that explodes.', 'ARCHER', 8, 20, 4, 35, 'PHYSICAL', 'explosive_arrow', 'shoot_anim'),
(gen_random_uuid(), 'Rapid Fire', 'Shoot very quickly.', 'ARCHER', 12, 35, 5, 55, 'PHYSICAL', 'rapid_fire', 'multi_anim'),
(gen_random_uuid(), 'Piercing Shot', 'Ignores armor.', 'ARCHER', 5, 15, 3, 25, 'PHYSICAL', 'piercing_shot', 'shoot_anim'),
(gen_random_uuid(), 'Sniper Shot', 'A precise, deadly shot.', 'ARCHER', 20, 50, 8, 110, 'PHYSICAL', 'sniper_shot', 'shoot_anim'),
(gen_random_uuid(), 'Rain of Arrows', 'Arrows fall from the sky.', 'ARCHER', 15, 45, 6, 70, 'PHYSICAL', 'rain_of_arrows', 'multi_anim'),
(gen_random_uuid(), 'Camouflage', 'Hide from enemies.', 'ARCHER', 10, 30, 10, 0, 'PHYSICAL', 'camouflage', 'buff_anim'),
(gen_random_uuid(), 'Falcon Strike', 'Call a falcon to attack.', 'ARCHER', 2, 12, 2, 18, 'PHYSICAL', 'falcon_strike', 'shoot_anim'),
(gen_random_uuid(), 'Poison Volley', 'Multiple poisoned arrows.', 'ARCHER', 25, 60, 10, 90, 'PHYSICAL', 'poison_volley', 'multi_anim')
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    mana_cost = EXCLUDED.mana_cost,
    cooldown = EXCLUDED.cooldown,
    base_damage = EXCLUDED.base_damage;
