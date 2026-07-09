package com.rpgengine.combat.domain;

import java.math.BigDecimal;
import java.util.UUID;

public class MonsterLoot {
    private UUID id;
    private UUID itemId;
    private BigDecimal dropChance;

    public MonsterLoot(UUID id, UUID itemId, BigDecimal dropChance) {
        this.id = id;
        this.itemId = itemId;
        this.dropChance = dropChance;
    }

    public UUID getId() { return id; }
    public UUID getItemId() { return itemId; }
    public BigDecimal getDropChance() { return dropChance; }
}
