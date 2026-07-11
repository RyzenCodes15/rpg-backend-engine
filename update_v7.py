import re

with open('backend/src/main/resources/db/migration/V7__itemization_redesign.sql', 'r') as f:
    content = f.read()

# Fix ARMORS
content = re.sub(
    r"('20000000-0000-0000-0000-000000000004', 'Heavy Armor Plate', 'Thick armor plate.', 'RARE', 'ARMOR', 120, 10, 25, 40);",
    r"('20000000-0000-0000-0000-000000000004', 'Heavy Armor Plate', 'Thick armor plate.', 'RARE', 'ARMOR', 120, 10, 25, 40)\nON CONFLICT (name) DO UPDATE SET \n    description = EXCLUDED.description,\n    rarity = EXCLUDED.rarity,\n    category = EXCLUDED.category,\n    value = EXCLUDED.value,\n    required_level = EXCLUDED.required_level,\n    bonus_defense = EXCLUDED.bonus_defense,\n    bonus_health = EXCLUDED.bonus_health;",
    content
)

# Fix HELMETS
content = re.sub(
    r"('30000000-0000-0000-0000-000000000005', 'Cursed Skull', 'A legendary cursed skull helmet.', 'LEGENDARY', 'HELMET', 1500, 15, 25, 100);",
    r"('30000000-0000-0000-0000-000000000005', 'Cursed Skull', 'A legendary cursed skull helmet.', 'LEGENDARY', 'HELMET', 1500, 15, 25, 100)\nON CONFLICT (name) DO UPDATE SET \n    description = EXCLUDED.description,\n    rarity = EXCLUDED.rarity,\n    category = EXCLUDED.category,\n    value = EXCLUDED.value,\n    required_level = EXCLUDED.required_level,\n    bonus_defense = EXCLUDED.bonus_defense,\n    bonus_mana = EXCLUDED.bonus_mana;",
    content
)

# Fix BOOTS
content = re.sub(
    r"\('40000000-0000-0000-0000-000000000004', 'War Boots', 'Heavy combat boots.', 'RARE', 'BOOTS', 110, 11, 15, 5, 0.0\);",
    r"('40000000-0000-0000-0000-000000000004', 'War Boots', 'Heavy combat boots.', 'RARE', 'BOOTS', 110, 11, 15, 5, 0.0)\nON CONFLICT (name) DO UPDATE SET \n    description = EXCLUDED.description,\n    rarity = EXCLUDED.rarity,\n    category = EXCLUDED.category,\n    value = EXCLUDED.value,\n    required_level = EXCLUDED.required_level,\n    bonus_defense = EXCLUDED.bonus_defense,\n    bonus_speed = EXCLUDED.bonus_speed,\n    bonus_dodge_chance = EXCLUDED.bonus_dodge_chance;",
    content
)

# Fix MATERIALS
content = re.sub(
    r"('50000000-0000-0000-0000-000000000007', 'Primal Slime Core', 'A legendary slime drop.', 'LEGENDARY', 'MATERIAL', 400, 10);",
    r"('50000000-0000-0000-0000-000000000007', 'Primal Slime Core', 'A legendary slime drop.', 'LEGENDARY', 'MATERIAL', 400, 10)\nON CONFLICT (name) DO UPDATE SET \n    description = EXCLUDED.description,\n    rarity = EXCLUDED.rarity,\n    category = EXCLUDED.category,\n    value = EXCLUDED.value,\n    required_level = EXCLUDED.required_level;",
    content
)

# Fix SKILLS
content = re.sub(
    r"('Blade Storm', 'The ultimate warrior attack.', 'WARRIOR', 25, 80, 12, 150, 'PHYSICAL', 'blade_storm', 'slash_anim');",
    r"('Blade Storm', 'The ultimate warrior attack.', 'WARRIOR', 25, 80, 12, 150, 'PHYSICAL', 'blade_storm', 'slash_anim')\nON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description;",
    content
)

content = re.sub(
    r"('Mana Burst', 'Unleash raw mana.', 'MAGE', 5, 25, 3, 30, 'MAGIC', 'ARCANE', 'mana_burst', 'arcane_anim', NULL);",
    r"('Mana Burst', 'Unleash raw mana.', 'MAGE', 5, 25, 3, 30, 'MAGIC', 'ARCANE', 'mana_burst', 'arcane_anim', NULL)\nON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description;",
    content
)

content = re.sub(
    r"('Poison Volley', 'Multiple poisoned arrows.', 'ARCHER', 25, 60, 10, 90, 'PHYSICAL', 'poison_volley', 'multi_anim');",
    r"('Poison Volley', 'Multiple poisoned arrows.', 'ARCHER', 25, 60, 10, 90, 'PHYSICAL', 'poison_volley', 'multi_anim')\nON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description;",
    content
)

# Fix monster_loot items to use SELECT
content = re.sub(r"'50000000-0000-0000-0000-000000000001'", r"(SELECT id FROM items WHERE name = 'Goblin Jelly' LIMIT 1)", content)
content = re.sub(r"'50000000-0000-0000-0000-000000000002'", r"(SELECT id FROM items WHERE name = 'Goblin Tooth' LIMIT 1)", content)
content = re.sub(r"'10000000-0000-0000-0000-000000000007'", r"(SELECT id FROM items WHERE name = 'Goblin Blade' LIMIT 1)", content)
content = re.sub(r"'10000000-0000-0000-0000-000000000008'", r"(SELECT id FROM items WHERE name = 'Goblin King''s Sword' LIMIT 1)", content)

content = re.sub(r"'40000000-0000-0000-0000-000000000002'", r"(SELECT id FROM items WHERE name = 'Hunter Boots' LIMIT 1)", content)
content = re.sub(r"'50000000-0000-0000-0000-000000000003'", r"(SELECT id FROM items WHERE name = 'Alpha Wolf Pelt' LIMIT 1)", content)

content = re.sub(r"'50000000-0000-0000-0000-000000000004'", r"(SELECT id FROM items WHERE name = 'Ancient Bone' LIMIT 1)", content)
content = re.sub(r"'10000000-0000-0000-0000-000000000009'", r"(SELECT id FROM items WHERE name = 'Rusted Sword' LIMIT 1)", content)
content = re.sub(r"'30000000-0000-0000-0000-000000000004'", r"(SELECT id FROM items WHERE name = 'Bone Helmet' LIMIT 1)", content)
content = re.sub(r"'30000000-0000-0000-0000-000000000005'", r"(SELECT id FROM items WHERE name = 'Cursed Skull' LIMIT 1)", content)

content = re.sub(r"'50000000-0000-0000-0000-000000000005'", r"(SELECT id FROM items WHERE name = 'Green Jelly' LIMIT 1)", content)
content = re.sub(r"'50000000-0000-0000-0000-000000000006'", r"(SELECT id FROM items WHERE name = 'Blue Jelly' LIMIT 1)", content)
content = re.sub(r"'50000000-0000-0000-0000-000000000007'", r"(SELECT id FROM items WHERE name = 'Primal Slime Core' LIMIT 1)", content)

content = re.sub(r"'20000000-0000-0000-0000-000000000004'", r"(SELECT id FROM items WHERE name = 'Heavy Armor Plate' LIMIT 1)", content)
content = re.sub(r"'40000000-0000-0000-0000-000000000004'", r"(SELECT id FROM items WHERE name = 'War Boots' LIMIT 1)", content)
content = re.sub(r"'10000000-0000-0000-0000-000000000010'", r"(SELECT id FROM items WHERE name = 'Warlord''s Axe' LIMIT 1)", content)


with open('backend/src/main/resources/db/migration/V7__itemization_redesign.sql', 'w') as f:
    f.write(content)
