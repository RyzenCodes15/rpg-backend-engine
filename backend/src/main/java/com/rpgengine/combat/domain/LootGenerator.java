package com.rpgengine.combat.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

public class LootGenerator {
    private final Random random = new Random();

    public List<UUID> generateLoot(Monster monster) {
        List<UUID> droppedItems = new ArrayList<>();
        
        for (MonsterLoot loot : monster.getLootTable()) {
            double roll = random.nextDouble() * 100.0; // 0.0 to 100.0
            if (roll <= loot.getDropChance().doubleValue()) {
                droppedItems.add(loot.getItemId());
            }
        }
        
        return droppedItems;
    }
}
