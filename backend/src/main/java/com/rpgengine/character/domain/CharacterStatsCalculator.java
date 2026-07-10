package com.rpgengine.character.domain;

import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.Item;

public class CharacterStatsCalculator {

    public static CharacterStats calculateTotalStats(CharacterStats baseStats, Equipment equipment) {
        if (equipment == null) return baseStats;
        
        CharacterStats current = baseStats;
        current = addStats(current, equipment.getWeapon());
        current = addStats(current, equipment.getHelmet());
        current = addStats(current, equipment.getChestArmor());
        current = addStats(current, equipment.getGloves());
        current = addStats(current, equipment.getBoots());
        current = addStats(current, equipment.getShield());
        current = addStats(current, equipment.getRing());
        current = addStats(current, equipment.getAmulet());
        current = addStats(current, equipment.getCape());
        current = addStats(current, equipment.getLegArmor());
        return current;
    }

    private static CharacterStats addStats(CharacterStats stats, Item item) {
        if (item == null || item.getStats() == null) return stats;
        return new CharacterStats(
                stats.health() + item.getStats().bonusHealth(),
                stats.mana() + item.getStats().bonusMana(),
                stats.attack() + item.getStats().bonusAttack(),
                stats.defense() + item.getStats().bonusDefense(),
                stats.speed() + item.getStats().bonusSpeed(),
                stats.criticalChance().add(item.getStats().bonusCriticalChance()),
                stats.dodgeChance().add(item.getStats().bonusDodgeChance())
        );
    }
}
