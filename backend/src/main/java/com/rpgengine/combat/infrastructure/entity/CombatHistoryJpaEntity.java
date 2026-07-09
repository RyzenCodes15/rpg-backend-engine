package com.rpgengine.combat.infrastructure.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "combat_history")
public class CombatHistoryJpaEntity {
    
    @Id
    private UUID id;

    @Column(name = "character_id", nullable = false)
    private UUID characterId;

    @Column(name = "monster_id", nullable = false)
    private UUID monsterId;

    @Column(name = "is_victory", nullable = false)
    private boolean isVictory;

    @Column(name = "damage_dealt", nullable = false)
    private int damageDealt;

    @Column(name = "damage_taken", nullable = false)
    private int damageTaken;

    @Column(name = "gold_earned", nullable = false)
    private long goldEarned;

    @Column(name = "experience_earned", nullable = false)
    private long experienceEarned;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    protected CombatHistoryJpaEntity() {}

    public CombatHistoryJpaEntity(UUID id, UUID characterId, UUID monsterId, boolean isVictory, int damageDealt, int damageTaken, long goldEarned, long experienceEarned, LocalDateTime timestamp) {
        this.id = id;
        this.characterId = characterId;
        this.monsterId = monsterId;
        this.isVictory = isVictory;
        this.damageDealt = damageDealt;
        this.damageTaken = damageTaken;
        this.goldEarned = goldEarned;
        this.experienceEarned = experienceEarned;
        this.timestamp = timestamp;
    }

    public UUID getId() { return id; }
    public UUID getCharacterId() { return characterId; }
    public UUID getMonsterId() { return monsterId; }
    public boolean isVictory() { return isVictory; }
    public int getDamageDealt() { return damageDealt; }
    public int getDamageTaken() { return damageTaken; }
    public long getGoldEarned() { return goldEarned; }
    public long getExperienceEarned() { return experienceEarned; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
