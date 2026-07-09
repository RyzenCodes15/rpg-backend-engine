package com.rpgengine.combat.domain;

import java.util.List;
import java.util.UUID;

public class Monster {
    private UUID id;
    private String name;
    private String description;
    private int level;
    private int health;
    private int attack;
    private int defense;
    private int speed;
    private long goldReward;
    private long experienceReward;
    private List<MonsterLoot> lootTable;

    public Monster(UUID id, String name, String description, int level, int health, int attack, int defense, int speed, long goldReward, long experienceReward, List<MonsterLoot> lootTable) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.level = level;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.goldReward = goldReward;
        this.experienceReward = experienceReward;
        this.lootTable = lootTable;
    }

    // Getters
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
    public List<MonsterLoot> getLootTable() { return lootTable; }
}
