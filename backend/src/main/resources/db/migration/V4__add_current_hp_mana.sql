ALTER TABLE characters ADD COLUMN current_health INT;
ALTER TABLE characters ADD COLUMN current_mana INT;

-- Initialize existing rows to max health/mana
UPDATE characters SET current_health = health, current_mana = mana;

-- Make columns NOT NULL after initializing data
ALTER TABLE characters ALTER COLUMN current_health SET NOT NULL;
ALTER TABLE characters ALTER COLUMN current_mana SET NOT NULL;

-- Insert Medium and Large Health Potions
INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health)
VALUES ('44444444-4444-4444-4444-444444444444', 'Medium Health Potion', 'Restores a moderate amount of health.', 'UNCOMMON', 'CONSUMABLE', 20, 3, 50) ON CONFLICT DO NOTHING;

INSERT INTO items (id, name, description, rarity, category, value, required_level, bonus_health)
VALUES ('55555555-5555-5555-5555-555555555555', 'Large Health Potion', 'Restores a large amount of health.', 'RARE', 'CONSUMABLE', 50, 5, 100) ON CONFLICT DO NOTHING;
