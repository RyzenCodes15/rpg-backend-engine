# Itemization, Equipment, and Crafting Overhaul

## Overview
The itemization and inventory system has been completely overhauled to support a full RPG experience, expanding upon the basic slots and introducing new stats and UI elements.

## New Equipment Slots
Players can now equip items in the following new slots:
- **Shield**
- **Ring**
- **Amulet**
- **Cape**
- **Leg Armor**

## New Stats
- **Dodge Chance**: A percentage chance to completely evade an enemy attack.
  - Base stat grows by level depending on the character class.
  - Can be boosted by equipping items with `bonusDodgeChance`.

## Combat Engine
- The combat engine now checks against a character's total dodge chance before calculating damage. 
- Loot dropping now correctly returns the names of the dropped items in the combat log and victory screen.

## Crafting
- The crafting system UI has been overhauled to display the actual names and icons of the required materials and crafted items.

## Frontend
- Added new SVG placeholder icons for the new equipment slots.
- Overhauled the `EquipmentPanel` to display a cohesive paper-doll layout.
- Added `bonusDodgeChance` to `ItemTooltip`.
