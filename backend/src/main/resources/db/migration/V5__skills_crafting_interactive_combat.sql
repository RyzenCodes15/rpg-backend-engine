CREATE TABLE skills (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    class_restriction VARCHAR(20) NOT NULL,
    required_level INT NOT NULL DEFAULT 1,
    mana_cost INT NOT NULL DEFAULT 0,
    cooldown INT NOT NULL DEFAULT 0,
    base_damage INT NOT NULL DEFAULT 0,
    skill_type VARCHAR(20) NOT NULL,
    element VARCHAR(20),
    icon VARCHAR(255),
    animation_name VARCHAR(50),
    status_effect_type VARCHAR(50)
);

CREATE TABLE character_skills (
    id UUID PRIMARY KEY,
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (character_id, skill_id)
);

CREATE TABLE recipes (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    crafted_item_id UUID NOT NULL REFERENCES items(id) ON DELETE RESTRICT,
    required_level INT NOT NULL DEFAULT 1
);

CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY,
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    material_item_id UUID NOT NULL REFERENCES items(id) ON DELETE RESTRICT,
    quantity INT NOT NULL DEFAULT 1,
    UNIQUE (recipe_id, material_item_id)
);

CREATE TABLE combat_sessions (
    id UUID PRIMARY KEY,
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    monster_id UUID NOT NULL REFERENCES monsters(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    character_hp INT NOT NULL,
    character_mana INT NOT NULL,
    monster_hp INT NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE combat_session_cooldowns (
    id UUID PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES combat_sessions(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    remaining_turns INT NOT NULL DEFAULT 0,
    UNIQUE (session_id, skill_id)
);

-- Seed Initial Materials
INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('c1111111-1111-1111-1111-111111111111', 'Iron Ore', 'A basic metal ore.', 'COMMON', 'MATERIAL', 5, 1) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('c2222222-2222-2222-2222-222222222222', 'Wood', 'Sturdy wood for crafting.', 'COMMON', 'MATERIAL', 2, 1) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('c3333333-3333-3333-3333-333333333333', 'Crystal', 'A magical crystal.', 'RARE', 'MATERIAL', 25, 5) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('c4444444-4444-4444-4444-444444444444', 'Herb', 'A common healing herb.', 'COMMON', 'MATERIAL', 3, 1) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level)
VALUES ('c5555555-5555-5555-5555-555555555555', 'Leather', 'Tanned leather.', 'COMMON', 'MATERIAL', 6, 1) ON CONFLICT DO NOTHING;

-- Seed Skills
-- Warrior
INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d1111111-1111-1111-1111-111111111111', 'Slash', 'A strong sweeping attack.', 'WARRIOR', 1, 10, 1, 15, 'PHYSICAL', NULL, 'slash', 'slash_anim', NULL);

INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d1111111-2222-1111-1111-111111111111', 'Shield Bash', 'Bashes the enemy, causing a stun.', 'WARRIOR', 3, 20, 3, 10, 'PHYSICAL', NULL, 'shield_bash', 'bash_anim', 'STUN');

INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d1111111-3333-1111-1111-111111111111', 'Power Strike', 'A devastating heavy blow.', 'WARRIOR', 5, 30, 4, 35, 'PHYSICAL', NULL, 'power_strike', 'heavy_strike', NULL);

-- Mage
INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d2222222-1111-1111-1111-111111111111', 'Fireball', 'Hurls a ball of fire that burns.', 'MAGE', 1, 15, 2, 20, 'MAGIC', 'FIRE', 'fireball', 'fireball_anim', 'BURN');

INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d2222222-2222-1111-1111-111111111111', 'Ice Spike', 'Pierces the enemy with ice, causing freeze.', 'MAGE', 3, 20, 3, 15, 'MAGIC', 'ICE', 'ice_spike', 'ice_anim', 'FREEZE');

INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d2222222-3333-1111-1111-111111111111', 'Arcane Bolt', 'A pure burst of magical energy.', 'MAGE', 5, 25, 1, 25, 'MAGIC', 'ARCANE', 'arcane_bolt', 'arcane_anim', NULL);

-- Archer
INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d3333333-1111-1111-1111-111111111111', 'Quick Shot', 'A rapid arrow attack.', 'ARCHER', 1, 8, 1, 12, 'PHYSICAL', NULL, 'quick_shot', 'shoot_anim', NULL);

INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d3333333-2222-1111-1111-111111111111', 'Poison Arrow', 'Shoots an envenomed arrow.', 'ARCHER', 3, 15, 3, 10, 'PHYSICAL', 'NATURE', 'poison_arrow', 'poison_anim', 'POISON');

INSERT INTO skills (id, name, description, class_restriction, required_level, mana_cost, cooldown, base_damage, skill_type, element, icon, animation_name, status_effect_type)
VALUES ('d3333333-3333-1111-1111-111111111111', 'Multi Shot', 'Fires multiple arrows at once.', 'ARCHER', 5, 25, 3, 30, 'PHYSICAL', NULL, 'multi_shot', 'multi_anim', NULL);

-- Add materials to monster loot
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 20.00); -- Goblin drops Iron Ore

INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444', 30.00); -- Skeleton drops Herb

INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'dddddddd-4444-4444-4444-444444444444', 'c5555555-5555-5555-5555-555555555555', 40.00); -- Wolf drops Leather

-- Add Recipes
-- Minor Health Potion Recipe (Uses Herb)
INSERT INTO recipes (id, name, description, crafted_item_id, required_level)
VALUES ('e1111111-1111-1111-1111-111111111111', 'Brew Minor Health Potion', 'Combine herbs to make a minor potion.', '33333333-3333-3333-3333-333333333333', 1);

INSERT INTO recipe_ingredients (id, recipe_id, material_item_id, quantity)
VALUES (gen_random_uuid(), 'e1111111-1111-1111-1111-111111111111', 'c4444444-4444-4444-4444-444444444444', 2);

-- Iron Sword Recipe (Uses Iron Ore + Wood)
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack)
VALUES ('f2222222-2222-2222-2222-222222222222', 'Iron Sword', 'A sharp iron sword.', 'UNCOMMON', 'WEAPON', 25, 3, 12);

INSERT INTO recipes (id, name, description, crafted_item_id, required_level)
VALUES ('e2222222-2222-2222-2222-222222222222', 'Forge Iron Sword', 'Forge a sharp sword from iron.', 'f2222222-2222-2222-2222-222222222222', 2);

INSERT INTO recipe_ingredients (id, recipe_id, material_item_id, quantity)
VALUES (gen_random_uuid(), 'e2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 3);
INSERT INTO recipe_ingredients (id, recipe_id, material_item_id, quantity)
VALUES (gen_random_uuid(), 'e2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 1);

-- Leather Armor Recipe (Uses Leather)
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense)
VALUES ('f3333333-3333-3333-3333-333333333333', 'Reinforced Leather Armor', 'Better protection.', 'UNCOMMON', 'CHEST_ARMOR', 30, 3, 10);

INSERT INTO recipes (id, name, description, crafted_item_id, required_level)
VALUES ('e3333333-3333-3333-3333-333333333333', 'Craft Reinforced Leather Armor', 'Stitch leather armor.', 'f3333333-3333-3333-3333-333333333333', 2);

INSERT INTO recipe_ingredients (id, recipe_id, material_item_id, quantity)
VALUES (gen_random_uuid(), 'e3333333-3333-3333-3333-333333333333', 'c5555555-5555-5555-5555-555555555555', 4);
