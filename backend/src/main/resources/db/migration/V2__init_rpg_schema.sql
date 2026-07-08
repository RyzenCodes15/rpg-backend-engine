CREATE TABLE characters (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL UNIQUE,
    character_class VARCHAR(20) NOT NULL,
    level INT NOT NULL DEFAULT 1,
    experience BIGINT NOT NULL DEFAULT 0,
    gold BIGINT NOT NULL DEFAULT 0,
    health INT NOT NULL,
    mana INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    speed INT NOT NULL,
    critical_chance DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_characters_user_id ON characters (user_id);
CREATE INDEX idx_characters_name ON characters (name);

CREATE TABLE items (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    rarity VARCHAR(20) NOT NULL,
    category VARCHAR(20) NOT NULL,
    value BIGINT NOT NULL DEFAULT 0,
    required_level INT NOT NULL DEFAULT 1,
    bonus_health INT NOT NULL DEFAULT 0,
    bonus_mana INT NOT NULL DEFAULT 0,
    bonus_attack INT NOT NULL DEFAULT 0,
    bonus_defense INT NOT NULL DEFAULT 0,
    bonus_speed INT NOT NULL DEFAULT 0,
    bonus_critical_chance DECIMAL(5,2) NOT NULL DEFAULT 0.00
);

CREATE INDEX idx_items_category ON items (category);

CREATE TABLE character_inventories (
    id UUID PRIMARY KEY,
    character_id UUID NOT NULL UNIQUE REFERENCES characters(id) ON DELETE CASCADE,
    capacity INT NOT NULL DEFAULT 20
);

CREATE TABLE inventory_slots (
    id UUID PRIMARY KEY,
    inventory_id UUID NOT NULL REFERENCES character_inventories(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE RESTRICT,
    slot_index INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    UNIQUE (inventory_id, slot_index)
);

CREATE TABLE character_equipment (
    id UUID PRIMARY KEY,
    character_id UUID NOT NULL UNIQUE REFERENCES characters(id) ON DELETE CASCADE,
    weapon_item_id UUID REFERENCES items(id) ON DELETE SET NULL,
    helmet_item_id UUID REFERENCES items(id) ON DELETE SET NULL,
    chest_item_id UUID REFERENCES items(id) ON DELETE SET NULL,
    gloves_item_id UUID REFERENCES items(id) ON DELETE SET NULL,
    boots_item_id UUID REFERENCES items(id) ON DELETE SET NULL
);

-- Insert Basic Seed Items
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_attack)
VALUES ('11111111-1111-1111-1111-111111111111', 'Wooden Sword', 'A basic training sword.', 'COMMON', 'WEAPON', 10, 1, 5);

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_defense)
VALUES ('22222222-2222-2222-2222-222222222222', 'Leather Tunic', 'Basic protection.', 'COMMON', 'CHEST_ARMOR', 15, 1, 5);

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health)
VALUES ('33333333-3333-3333-3333-333333333333', 'Minor Health Potion', 'Restores a small amount of health.', 'COMMON', 'CONSUMABLE', 5, 1, 0);
