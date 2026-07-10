package com.rpgengine.inventory.infrastructure.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.math.BigDecimal;
import java.util.UUID;
import com.rpgengine.inventory.domain.ItemCategory;
import com.rpgengine.inventory.domain.ItemRarity;

@Entity
@Table(name = "items")
public class ItemJpaEntity {

    @Id
    private UUID id;
    
    @Column(nullable = false, unique = true, length = 100)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ItemRarity rarity;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ItemCategory category;
    
    @Column(nullable = false)
    private long value;
    
    @Column(name = "required_level", nullable = false)
    private int requiredLevel;
    
    @Column(name = "bonus_health", nullable = false)
    private int bonusHealth;
    
    @Column(name = "bonus_mana", nullable = false)
    private int bonusMana;
    
    @Column(name = "bonus_attack", nullable = false)
    private int bonusAttack;
    
    @Column(name = "bonus_defense", nullable = false)
    private int bonusDefense;
    
    @Column(name = "bonus_speed", nullable = false)
    private int bonusSpeed;
    
    @Column(name = "bonus_critical_chance", nullable = false, precision = 5, scale = 2)
    private BigDecimal bonusCriticalChance;

    @Column(name = "bonus_dodge_chance", nullable = false, precision = 5, scale = 2)
    private BigDecimal bonusDodgeChance;

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public ItemRarity getRarity() { return rarity; }
    public void setRarity(ItemRarity rarity) { this.rarity = rarity; }
    public ItemCategory getCategory() { return category; }
    public void setCategory(ItemCategory category) { this.category = category; }
    public long getValue() { return value; }
    public void setValue(long value) { this.value = value; }
    public int getRequiredLevel() { return requiredLevel; }
    public void setRequiredLevel(int requiredLevel) { this.requiredLevel = requiredLevel; }
    public int getBonusHealth() { return bonusHealth; }
    public void setBonusHealth(int bonusHealth) { this.bonusHealth = bonusHealth; }
    public int getBonusMana() { return bonusMana; }
    public void setBonusMana(int bonusMana) { this.bonusMana = bonusMana; }
    public int getBonusAttack() { return bonusAttack; }
    public void setBonusAttack(int bonusAttack) { this.bonusAttack = bonusAttack; }
    public int getBonusDefense() { return bonusDefense; }
    public void setBonusDefense(int bonusDefense) { this.bonusDefense = bonusDefense; }
    public int getBonusSpeed() { return bonusSpeed; }
    public void setBonusSpeed(int bonusSpeed) { this.bonusSpeed = bonusSpeed; }
    public BigDecimal getBonusCriticalChance() { return bonusCriticalChance; }
    public void setBonusCriticalChance(BigDecimal bonusCriticalChance) { this.bonusCriticalChance = bonusCriticalChance; }
    public BigDecimal getBonusDodgeChance() { return bonusDodgeChance; }
    public void setBonusDodgeChance(BigDecimal bonusDodgeChance) { this.bonusDodgeChance = bonusDodgeChance; }
}
