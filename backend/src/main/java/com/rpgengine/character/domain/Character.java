package com.rpgengine.character.domain;

import java.time.LocalDateTime;
import java.util.UUID;

public class Character {
    private UUID id;
    private UUID userId;
    private String name;
    private CharacterClass characterClass;
    private int level;
    private long experience;
    private long gold;
    private CharacterStats baseStats;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Character() {}

    public Character(UUID id, UUID userId, String name, CharacterClass characterClass, int level, long experience, long gold, CharacterStats baseStats, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.characterClass = characterClass;
        this.level = level;
        this.experience = experience;
        this.gold = gold;
        this.baseStats = baseStats;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Character createNew(UUID userId, String name, CharacterClass characterClass) {
        StatGrowthStrategy strategy = StatGrowthStrategyFactory.getStrategy(characterClass);
        CharacterStats initialStats = strategy.getBaseStats();
        
        return new Character(
                UUID.randomUUID(),
                userId,
                name,
                characterClass,
                1,
                0L,
                0L,
                initialStats,
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    public void addExperience(long exp) {
        this.experience += exp;
        checkLevelUp();
    }

    private void checkLevelUp() {
        // Simple formula: required exp = level * 1000
        long requiredExp = this.level * 1000L;
        while (this.experience >= requiredExp) {
            this.experience -= requiredExp;
            this.level++;
            
            // Increase base stats based on class strategy
            StatGrowthStrategy strategy = StatGrowthStrategyFactory.getStrategy(this.characterClass);
            this.baseStats = this.baseStats.add(strategy.getGrowthPerLevel());
            
            requiredExp = this.level * 1000L;
        }
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public CharacterClass getCharacterClass() { return characterClass; }
    public void setCharacterClass(CharacterClass characterClass) { this.characterClass = characterClass; }
    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }
    public long getExperience() { return experience; }
    public void setExperience(long experience) { this.experience = experience; }
    public long getGold() { return gold; }
    public void setGold(long gold) { this.gold = gold; }
    public CharacterStats getBaseStats() { return baseStats; }
    public void setBaseStats(CharacterStats baseStats) { this.baseStats = baseStats; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
