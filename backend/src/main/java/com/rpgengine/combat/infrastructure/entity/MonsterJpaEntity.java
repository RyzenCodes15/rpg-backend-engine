package com.rpgengine.combat.infrastructure.entity;

import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.domain.MonsterLoot;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Table(name = "monsters")
public class MonsterJpaEntity {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private int level;

    @Column(nullable = false)
    private int health;

    @Column(nullable = false)
    private int attack;

    @Column(nullable = false)
    private int defense;

    @Column(nullable = false)
    private int speed;

    @Column(name = "gold_reward", nullable = false)
    private long goldReward;

    @Column(name = "experience_reward", nullable = false)
    private long experienceReward;

    @OneToMany(mappedBy = "monster", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MonsterLootJpaEntity> lootTable = new ArrayList<>();

    protected MonsterJpaEntity() {}

    public Monster toDomain() {
        List<MonsterLoot> domainLoot = lootTable.stream()
                .map(l -> new MonsterLoot(l.getId(), l.getItemId(), l.getDropChance()))
                .collect(Collectors.toList());
                
        return new Monster(
                this.id,
                this.name,
                this.description,
                this.level,
                this.health,
                this.attack,
                this.defense,
                this.speed,
                this.goldReward,
                this.experienceReward,
                domainLoot
        );
    }
}
