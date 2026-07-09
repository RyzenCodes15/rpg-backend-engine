package com.rpgengine.combat.infrastructure.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "monster_loot")
public class MonsterLootJpaEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "monster_id", nullable = false)
    private MonsterJpaEntity monster;

    @Column(name = "item_id", nullable = false)
    private UUID itemId;

    @Column(name = "drop_chance", nullable = false, precision = 5, scale = 2)
    private BigDecimal dropChance;

    protected MonsterLootJpaEntity() {}

    public MonsterLootJpaEntity(UUID itemId, BigDecimal dropChance) {
        this.itemId = itemId;
        this.dropChance = dropChance;
    }

    public UUID getId() { return id; }
    public MonsterJpaEntity getMonster() { return monster; }
    public void setMonster(MonsterJpaEntity monster) { this.monster = monster; }
    public UUID getItemId() { return itemId; }
    public BigDecimal getDropChance() { return dropChance; }
}
