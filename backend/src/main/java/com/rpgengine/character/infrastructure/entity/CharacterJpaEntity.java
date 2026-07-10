package com.rpgengine.character.infrastructure.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.rpgengine.character.domain.CharacterClass;

@Entity
@Table(name = "characters")
public class CharacterJpaEntity {
    
    @Id
    private UUID id;
    
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    
    @Column(nullable = false, unique = true, length = 50)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "character_class", nullable = false, length = 20)
    private CharacterClass characterClass;
    
    @Column(nullable = false)
    private int level = 1;
    
    @Column(nullable = false)
    private long experience = 0;
    
    @Column(nullable = false)
    private long gold = 0;
    
    @Column(nullable = false)
    private int health;
    
    @Column(name = "current_health", nullable = false)
    private int currentHealth;
    
    @Column(nullable = false)
    private int mana;
    
    @Column(name = "current_mana", nullable = false)
    private int currentMana;
    
    @Column(nullable = false)
    private int attack;
    
    @Column(nullable = false)
    private int defense;
    
    @Column(nullable = false)
    private int speed;
    
    @Column(name = "critical_chance", nullable = false, precision = 5, scale = 2)
    private BigDecimal criticalChance;
    
    @Column(name = "dodge_chance", nullable = false, precision = 5, scale = 2)
    private BigDecimal dodgeChance;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters and setters
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
    public int getHealth() { return health; }
    public void setHealth(int health) { this.health = health; }
    public int getCurrentHealth() { return currentHealth; }
    public void setCurrentHealth(int currentHealth) { this.currentHealth = currentHealth; }
    public int getMana() { return mana; }
    public void setMana(int mana) { this.mana = mana; }
    public int getCurrentMana() { return currentMana; }
    public void setCurrentMana(int currentMana) { this.currentMana = currentMana; }
    public int getAttack() { return attack; }
    public void setAttack(int attack) { this.attack = attack; }
    public int getDefense() { return defense; }
    public void setDefense(int defense) { this.defense = defense; }
    public int getSpeed() { return speed; }
    public void setSpeed(int speed) { this.speed = speed; }
    public BigDecimal getCriticalChance() { return criticalChance; }
    public void setCriticalChance(BigDecimal criticalChance) { this.criticalChance = criticalChance; }
    public BigDecimal getDodgeChance() { return dodgeChance; }
    public void setDodgeChance(BigDecimal dodgeChance) { this.dodgeChance = dodgeChance; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
