-- 1. Add dodge_chance to characters
ALTER TABLE characters ADD COLUMN dodge_chance DECIMAL(5,2) NOT NULL DEFAULT 0.00;

-- 2. Add bonus_dodge_chance to items
ALTER TABLE items ADD COLUMN bonus_dodge_chance DECIMAL(5,2) NOT NULL DEFAULT 0.00;

-- 3. Add new equipment slots
ALTER TABLE character_equipment ADD COLUMN shield_item_id UUID REFERENCES items(id) ON DELETE SET NULL;
ALTER TABLE character_equipment ADD COLUMN ring_item_id UUID REFERENCES items(id) ON DELETE SET NULL;
ALTER TABLE character_equipment ADD COLUMN amulet_item_id UUID REFERENCES items(id) ON DELETE SET NULL;
ALTER TABLE character_equipment ADD COLUMN cape_item_id UUID REFERENCES items(id) ON DELETE SET NULL;
ALTER TABLE character_equipment ADD COLUMN leg_armor_item_id UUID REFERENCES items(id) ON DELETE SET NULL;

-- 4. Add items

-- Weapns
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_speed)
VALUES ('11111111-0000-0000-0000-000000000001', 'Steel Sword', 'A sharp and reliable sword.', 'UNCOMMON', 'WEAPON', 50, 5, 20, 2) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_speed, bonus_critical_chance)
VALUES ('11111112-0000-0000-0000-000000000002', 'Mithril Sword', 'Incredibly light and sharp.', 'RARE', 'WEAPON', 150, 10, 45, 5, 5.0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_critical_chance)
VALUES ('11111113-0000-0000-0000-000000000003', 'Dragon Sword', 'Forged in dragon fire.', 'EPIC', 'WEAPON', 500, 20, 100, 10.0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_mana)
VALUES ('11111114-0000-0000-0000-000000000004', 'Mage Staff', 'Channels magical energies.', 'UNCOMMON', 'WEAPON', 60, 5, 10, 30) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_mana, bonus_critical_chance)
VALUES ('11111115-0000-0000-0000-000000000005', 'Ancient Staff', 'Emanates pure arcane power.', 'EPIC', 'WEAPON', 450, 18, 25, 100, 5.0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_speed)
VALUES ('11111116-0000-0000-0000-000000000006', 'Long Bow', 'Good range and power.', 'UNCOMMON', 'WEAPON', 50, 5, 18, 5) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_speed, bonus_critical_chance)
VALUES ('11111117-0000-0000-0000-000000000007', 'Composite Bow', 'High tension, deadly arrows.', 'RARE', 'WEAPON', 200, 12, 50, 8, 8.0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_speed, bonus_critical_chance)
VALUES ('11111118-0000-0000-0000-000000000008', 'Dagger', 'Quick and deadly.', 'COMMON', 'WEAPON', 15, 2, 8, 10, 5.0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_defense)
VALUES ('11111119-0000-0000-0000-000000000009', 'Spear', 'Keeps enemies at bay.', 'UNCOMMON', 'WEAPON', 40, 4, 15, 5) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_speed)
VALUES ('11111110-0000-0000-0000-000000000010', 'Axe', 'Heavy chopping power.', 'COMMON', 'WEAPON', 20, 2, 12, -2) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack, bonus_speed)
VALUES ('11111111-0000-0000-0000-000000000011', 'Hammer', 'Crushing blows.', 'UNCOMMON', 'WEAPON', 45, 6, 25, -5) ON CONFLICT DO NOTHING;

-- Helmets
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense)
VALUES ('22222221-0000-0000-0000-000000000001', 'Leather Cap', 'Basic head protection.', 'COMMON', 'HELMET', 10, 1, 3) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense)
VALUES ('22222222-0000-0000-0000-000000000002', 'Iron Helm', 'Solid iron helmet.', 'UNCOMMON', 'HELMET', 35, 5, 10) ON CONFLICT DO NOTHING;

-- Leg Armor
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense)
VALUES ('33333331-0000-0000-0000-000000000001', 'Leather Pants', 'Basic leg protection.', 'COMMON', 'LEG_ARMOR', 12, 1, 4) ON CONFLICT DO NOTHING;

-- Boots
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_speed, bonus_dodge_chance)
VALUES ('44444441-0000-0000-0000-000000000001', 'Leather Boots', 'Basic footwear.', 'COMMON', 'BOOTS', 8, 1, 2, 2, 1.0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_speed, bonus_dodge_chance)
VALUES ('44444442-0000-0000-0000-000000000002', 'Swift Boots', 'Light and incredibly fast.', 'RARE', 'BOOTS', 120, 8, 5, 15, 5.0) ON CONFLICT DO NOTHING;

-- Gloves
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_attack)
VALUES ('55555551-0000-0000-0000-000000000001', 'Leather Gloves', 'Protects hands.', 'COMMON', 'GLOVES', 8, 1, 2, 1) ON CONFLICT DO NOTHING;

-- Shields
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_health)
VALUES ('66666661-0000-0000-0000-000000000001', 'Wooden Shield', 'A flimsy wooden shield.', 'COMMON', 'SHIELD', 15, 1, 8, 10) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_health, bonus_dodge_chance)
VALUES ('66666662-0000-0000-0000-000000000002', 'Iron Shield', 'A heavy iron shield.', 'UNCOMMON', 'SHIELD', 60, 6, 20, 30, -2.0) ON CONFLICT DO NOTHING;

-- Rings
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_mana, bonus_critical_chance)
VALUES ('77777771-0000-0000-0000-000000000001', 'Ring of Magic', 'Increases mana.', 'UNCOMMON', 'RING', 75, 5, 20, 1.0) ON CONFLICT DO NOTHING;

-- Amulets
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health, bonus_dodge_chance)
VALUES ('88888881-0000-0000-0000-000000000001', 'Amulet of Vitality', 'Pulses with life energy.', 'RARE', 'AMULET', 150, 10, 50, 2.0) ON CONFLICT DO NOTHING;

-- Capes
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense, bonus_dodge_chance)
VALUES ('99999991-0000-0000-0000-000000000001', 'Traveler Cape', 'Keeps the wind out.', 'COMMON', 'CAPE', 20, 1, 2, 1.0) ON CONFLICT DO NOTHING;

-- Consumables
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health)
VALUES ('aaaaaa01-0000-0000-0000-000000000001', 'Health Potion', 'Restores health.', 'COMMON', 'CONSUMABLE', 15, 3, 0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_mana)
VALUES ('aaaaaa02-0000-0000-0000-000000000002', 'Mana Potion', 'Restores mana.', 'COMMON', 'CONSUMABLE', 15, 3, 0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health, bonus_mana)
VALUES ('aaaaaa03-0000-0000-0000-000000000003', 'Elixir', 'Restores health and mana.', 'RARE', 'CONSUMABLE', 50, 5, 0, 0) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('aaaaaa04-0000-0000-0000-000000000004', 'Strength Potion', 'Temporarily boosts attack.', 'UNCOMMON', 'CONSUMABLE', 30, 4) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('aaaaaa05-0000-0000-0000-000000000005', 'Defense Potion', 'Temporarily boosts defense.', 'UNCOMMON', 'CONSUMABLE', 30, 4) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('aaaaaa06-0000-0000-0000-000000000006', 'Bread', 'Restores a small amount of health.', 'COMMON', 'CONSUMABLE', 2, 1) ON CONFLICT DO NOTHING;

-- Materials
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb1-0000-0000-0000-000000000001', 'Goblin Ear', 'A disgusting ear.', 'COMMON', 'MATERIAL', 5, 1) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb2-0000-0000-0000-000000000002', 'Rusty Dagger', 'Barely usable for crafting.', 'COMMON', 'MATERIAL', 3, 1) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb3-0000-0000-0000-000000000003', 'Torn Leather', 'Scrap leather.', 'COMMON', 'MATERIAL', 2, 1) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb4-0000-0000-0000-000000000004', 'Wolf Fur', 'Warm fur.', 'UNCOMMON', 'MATERIAL', 10, 2) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb5-0000-0000-0000-000000000005', 'Sharp Fang', 'A sharp wolf fang.', 'UNCOMMON', 'MATERIAL', 12, 2) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb6-0000-0000-0000-000000000006', 'Bone', 'A dry bone.', 'COMMON', 'MATERIAL', 4, 1) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb7-0000-0000-0000-000000000007', 'Ancient Rib', 'Emanates dark energy.', 'RARE', 'MATERIAL', 25, 4) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb8-0000-0000-0000-000000000008', 'Orc Axe', 'Heavy and crude.', 'UNCOMMON', 'MATERIAL', 15, 3) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbbb9-0000-0000-0000-000000000009', 'Heavy Armor Scrap', 'Thick metal pieces.', 'UNCOMMON', 'MATERIAL', 18, 3) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbb10-0000-0000-0000-000000000010', 'Slime Gel', 'Sticky gel.', 'COMMON', 'MATERIAL', 4, 1) ON CONFLICT DO NOTHING;
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('bbbbbb11-0000-0000-0000-000000000011', 'Mana Jelly', 'Concentrated mana slime.', 'RARE', 'MATERIAL', 30, 5) ON CONFLICT DO NOTHING;

-- Quest Items / Keys / Scrolls / Magic / Treasure
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('ccccccc1-0000-0000-0000-000000000001', 'Golden Key', 'Opens a special chest.', 'EPIC', 'KEY', 100, 1) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('ccccccc2-0000-0000-0000-000000000002', 'Scroll of Identify', 'Identifies magic items.', 'UNCOMMON', 'SCROLL', 20, 1) ON CONFLICT DO NOTHING;

-- 5. Monster drops

-- Add items to specific monsters from V3 schema (Goblin, Skeleton, Orc, Wolf, Slime)
-- Monster IDs:
-- Goblin: aaaaaaaa-1111-1111-1111-111111111111
-- Skeleton: bbbbbbbb-2222-2222-2222-222222222222
-- Orc: cccccccc-3333-3333-3333-333333333333
-- Wolf: dddddddd-4444-4444-4444-444444444444
-- Slime: eeeeeeee-5555-5555-5555-555555555555

INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', (SELECT id FROM items WHERE name = 'Goblin Ear'), 50.0);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', (SELECT id FROM items WHERE name = 'Rusty Dagger'), 25.0);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', (SELECT id FROM items WHERE name = 'Torn Leather'), 30.0);

INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'dddddddd-4444-4444-4444-444444444444', (SELECT id FROM items WHERE name = 'Wolf Fur'), 40.0);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'dddddddd-4444-4444-4444-444444444444', (SELECT id FROM items WHERE name = 'Sharp Fang'), 20.0);

INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', (SELECT id FROM items WHERE name = 'Bone'), 50.0);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', (SELECT id FROM items WHERE name = 'Ancient Rib'), 10.0);

INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'cccccccc-3333-3333-3333-333333333333', (SELECT id FROM items WHERE name = 'Orc Axe'), 35.0);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'cccccccc-3333-3333-3333-333333333333', (SELECT id FROM items WHERE name = 'Heavy Armor Scrap'), 25.0);

INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'eeeeeeee-5555-5555-5555-555555555555', (SELECT id FROM items WHERE name = 'Slime Gel'), 60.0);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance) VALUES (gen_random_uuid(), 'eeeeeeee-5555-5555-5555-555555555555', (SELECT id FROM items WHERE name = 'Mana Jelly'), 15.0);

-- Crafting Recipes
-- Recipe: Steel Sword (Uses Orc Axe, Iron Ore)
INSERT INTO recipes (id, name, description, crafted_item_id, required_level) VALUES ('dddddd01-0000-0000-0000-000000000001', 'Forge Steel Sword', 'Melt down weapons to forge steel.', (SELECT id FROM items WHERE name = 'Steel Sword'), 3);
INSERT INTO recipe_ingredients (id, recipe_id, material_item_id, quantity) VALUES (gen_random_uuid(), 'dddddd01-0000-0000-0000-000000000001', (SELECT id FROM items WHERE name = 'Orc Axe'), 2);
INSERT INTO recipe_ingredients (id, recipe_id, material_item_id, quantity) VALUES (gen_random_uuid(), 'dddddd01-0000-0000-0000-000000000001', (SELECT id FROM items WHERE name = 'Iron Ore'), 5); 

-- Recipe: Elixir (Uses Herb, Mana Jelly)
INSERT INTO recipes (id, name, description, crafted_item_id, required_level) VALUES ('dddddd02-0000-0000-0000-000000000002', 'Brew Elixir', 'A potent mix of herbs and pure mana.', (SELECT id FROM items WHERE name = 'Elixir'), 4);
INSERT INTO recipe_ingredients (id, recipe_id, material_item_id, quantity) VALUES (gen_random_uuid(), 'dddddd02-0000-0000-0000-000000000002', (SELECT id FROM items WHERE name = 'Herb'), 3);
INSERT INTO recipe_ingredients (id, recipe_id, material_item_id, quantity) VALUES (gen_random_uuid(), 'dddddd02-0000-0000-0000-000000000002', (SELECT id FROM items WHERE name = 'Mana Jelly'), 1);
