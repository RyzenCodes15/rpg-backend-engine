import re

with open('backend/src/main/resources/db/migration/V7__itemization_redesign.sql', 'r') as f:
    content = f.read()

# Restore IDs in INSERT INTO items
replacements = [
    (r"\(SELECT id FROM items WHERE name = 'Goblin Blade' LIMIT 1\)", "'10000000-0000-0000-0000-000000000007'"),
    (r"\(SELECT id FROM items WHERE name = 'Goblin King''s Sword' LIMIT 1\)", "'10000000-0000-0000-0000-000000000008'"),
    (r"\(SELECT id FROM items WHERE name = 'Rusted Sword' LIMIT 1\)", "'10000000-0000-0000-0000-000000000009'"),
    (r"\(SELECT id FROM items WHERE name = 'Warlord''s Axe' LIMIT 1\)", "'10000000-0000-0000-0000-000000000010'"),
    (r"\(SELECT id FROM items WHERE name = 'Heavy Armor Plate' LIMIT 1\)", "'20000000-0000-0000-0000-000000000004'"),
    (r"\(SELECT id FROM items WHERE name = 'Bone Helmet' LIMIT 1\)", "'30000000-0000-0000-0000-000000000004'"),
    (r"\(SELECT id FROM items WHERE name = 'Cursed Skull' LIMIT 1\)", "'30000000-0000-0000-0000-000000000005'"),
    (r"\(SELECT id FROM items WHERE name = 'Hunter Boots' LIMIT 1\)", "'40000000-0000-0000-0000-000000000002'"),
    (r"\(SELECT id FROM items WHERE name = 'War Boots' LIMIT 1\)", "'40000000-0000-0000-0000-000000000004'"),
    (r"\(SELECT id FROM items WHERE name = 'Goblin Jelly' LIMIT 1\)", "'50000000-0000-0000-0000-000000000001'"),
    (r"\(SELECT id FROM items WHERE name = 'Goblin Tooth' LIMIT 1\)", "'50000000-0000-0000-0000-000000000002'"),
    (r"\(SELECT id FROM items WHERE name = 'Alpha Wolf Pelt' LIMIT 1\)", "'50000000-0000-0000-0000-000000000003'"),
    (r"\(SELECT id FROM items WHERE name = 'Ancient Bone' LIMIT 1\)", "'50000000-0000-0000-0000-000000000004'"),
    (r"\(SELECT id FROM items WHERE name = 'Green Jelly' LIMIT 1\)", "'50000000-0000-0000-0000-000000000005'"),
    (r"\(SELECT id FROM items WHERE name = 'Blue Jelly' LIMIT 1\)", "'50000000-0000-0000-0000-000000000006'"),
    (r"\(SELECT id FROM items WHERE name = 'Primal Slime Core' LIMIT 1\)", "'50000000-0000-0000-0000-000000000007'")
]

# We only want to restore the IDs in the "INSERT INTO items" statements.
# Let's split the file, fix the items part, and keep the monster_loot part using SELECT.
parts = content.split("-- 5. Monster Loot")
items_part = parts[0]
monster_loot_part = "-- 5. Monster Loot" + parts[1]

for search, replacement in replacements:
    items_part = re.sub(search, replacement, items_part)

new_content = items_part + monster_loot_part

with open('backend/src/main/resources/db/migration/V7__itemization_redesign.sql', 'w') as f:
    f.write(new_content)

