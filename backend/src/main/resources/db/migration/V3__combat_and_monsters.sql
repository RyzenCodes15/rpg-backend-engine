CREATE TABLE monsters (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    level INT NOT NULL DEFAULT 1,
    health INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    speed INT NOT NULL,
    gold_reward BIGINT NOT NULL DEFAULT 0,
    experience_reward BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE monster_loot (
    id UUID PRIMARY KEY,
    monster_id UUID NOT NULL REFERENCES monsters(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    drop_chance DECIMAL(5,2) NOT NULL
);

CREATE TABLE combat_history (
    id UUID PRIMARY KEY,
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    monster_id UUID NOT NULL REFERENCES monsters(id) ON DELETE CASCADE,
    is_victory BOOLEAN NOT NULL,
    damage_dealt INT NOT NULL DEFAULT 0,
    damage_taken INT NOT NULL DEFAULT 0,
    gold_earned BIGINT NOT NULL DEFAULT 0,
    experience_earned BIGINT NOT NULL DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_combat_history_char_id ON combat_history (character_id);

-- Insert Monsters
-- Goblin: level 1, easy
INSERT INTO monsters (id, name, description, level, health, attack, defense, speed, gold_reward, experience_reward)
VALUES ('aaaaaaaa-1111-1111-1111-111111111111', 'Goblin', 'A weak but pesky creature.', 1, 30, 8, 2, 5, 10, 15);

-- Skeleton: level 2
INSERT INTO monsters (id, name, description, level, health, attack, defense, speed, gold_reward, experience_reward)
VALUES ('bbbbbbbb-2222-2222-2222-222222222222', 'Skeleton', 'An undead warrior.', 2, 45, 12, 5, 4, 15, 25);

-- Slime: level 1, high def, low attack
INSERT INTO monsters (id, name, description, level, health, attack, defense, speed, gold_reward, experience_reward)
VALUES ('cccccccc-3333-3333-3333-333333333333', 'Slime', 'A gelatinous blob.', 1, 40, 5, 8, 2, 8, 12);

-- Wolf: level 3, fast
INSERT INTO monsters (id, name, description, level, health, attack, defense, speed, gold_reward, experience_reward)
VALUES ('dddddddd-4444-4444-4444-444444444444', 'Wolf', 'A swift and dangerous predator.', 3, 50, 15, 4, 10, 20, 35);

-- Orc: level 5, strong
INSERT INTO monsters (id, name, description, level, health, attack, defense, speed, gold_reward, experience_reward)
VALUES ('eeeeeeee-5555-5555-5555-555555555555', 'Orc', 'A brutal and tough warrior.', 5, 80, 20, 10, 6, 40, 60);

-- Insert New Items (Loot)
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health)
VALUES ('44444444-4444-4444-4444-444444444444', 'Goblin Ear', 'A gross trophy.', 'COMMON', 'MATERIAL', 2, 1, 0);

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health)
VALUES ('55555555-5555-5555-5555-555555555555', 'Bone Fragment', 'A piece of a skeleton.', 'COMMON', 'MATERIAL', 3, 1, 0);

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health)
VALUES ('66666666-6666-6666-6666-666666666666', 'Slime Jelly', 'Sticky and gross.', 'COMMON', 'MATERIAL', 2, 1, 0);

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health)
VALUES ('77777777-7777-7777-7777-777777777777', 'Wolf Pelt', 'A warm pelt.', 'UNCOMMON', 'MATERIAL', 10, 1, 0);

-- Insert Loot Tables
-- Goblin drops Wooden Sword (5%), Minor Health Potion (10%), Goblin Ear (50%)
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 5.00);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 10.00);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'aaaaaaaa-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 50.00);

-- Skeleton drops Bone Fragment (60%), Leather Tunic (5%)
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 60.00);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'bbbbbbbb-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 5.00);

-- Slime drops Slime Jelly (70%), Minor Health Potion (15%)
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'cccccccc-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666', 70.00);
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'cccccccc-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 15.00);

-- Wolf drops Wolf Pelt (50%)
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'dddddddd-4444-4444-4444-444444444444', '77777777-7777-7777-7777-777777777777', 50.00);

-- Orc drops random items
INSERT INTO monster_loot (id, monster_id, item_id, drop_chance)
VALUES (gen_random_uuid(), 'eeeeeeee-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 15.00);
