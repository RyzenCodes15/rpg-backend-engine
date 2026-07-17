package com.rpgengine.combat.domain;

import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class OrcGuaranteedLootTest {

    @Test
    void testOrcGuaranteedLootDropsAlways() {
        LootGenerator lootGenerator = new LootGenerator();

        UUID orcToothId = UUID.fromString("60000000-0000-0000-0000-000000000001");
        UUID shinySwordId = UUID.fromString("10000000-0000-0000-0000-000000000011");

        MonsterLoot toothLoot = new MonsterLoot(UUID.randomUUID(), orcToothId, BigDecimal.valueOf(100.0));
        MonsterLoot swordLoot = new MonsterLoot(UUID.randomUUID(), shinySwordId, BigDecimal.valueOf(100.0));

        Monster orc = new Monster(
                UUID.fromString("eeeeeeee-5555-5555-5555-555555555555"),
                "Orc",
                "A brutal and tough warrior.",
                5, 80, 20, 10, 6, 40, 60,
                List.of(toothLoot, swordLoot)
        );

        // Run 100 consecutive battles against the Orc to verify 100% guaranteed drop rate without any probability failures
        for (int i = 0; i < 100; i++) {
            List<UUID> droppedItems = lootGenerator.generateLoot(orc);
            assertNotNull(droppedItems);
            assertEquals(2, droppedItems.size(), "Orc must drop exactly 2 items every time");
            assertTrue(droppedItems.contains(orcToothId), "Orc must always drop Orc Tooth");
            assertTrue(droppedItems.contains(shinySwordId), "Orc must always drop Shiny Sword");
        }
    }
}
