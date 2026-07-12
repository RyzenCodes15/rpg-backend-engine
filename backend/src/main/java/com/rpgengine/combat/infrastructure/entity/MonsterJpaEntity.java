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

    public MonsterJpaEntity() {}

    public void setId(UUID id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setLevel(int level) { this.level = level; }
    public void setHealth(int health) { this.health = health; }
    public void setAttack(int attack) { this.attack = attack; }
    public void setDefense(int defense) { this.defense = defense; }
    public void setSpeed(int speed) { this.speed = speed; }
    public void setGoldReward(long goldReward) { this.goldReward = goldReward; }
    public void setExperienceReward(long experienceReward) { this.experienceReward = experienceReward; }
    public void setLootTable(List<MonsterLootJpaEntity> lootTable) { this.lootTable = lootTable; }
    
    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public int getLevel() { return level; }
    public int getHealth() { return health; }
    public int getAttack() { return attack; }
    public int getDefense() { return defense; }
    public int getSpeed() { return speed; }
    public long getGoldReward() { return goldReward; }
    public long getExperienceReward() { return experienceReward; }
    public List<MonsterLootJpaEntity> getLootTable() { return lootTable; }

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
