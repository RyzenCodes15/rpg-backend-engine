package com.rpgengine.combat.domain;

import java.time.LocalDateTime;
import java.util.UUID;

public class CombatHistory {
    private UUID id;
    private UUID characterId;
    private UUID monsterId;
    private boolean isVictory;
    private int damageDealt;
    private int damageTaken;
    private long goldEarned;
    private long experienceEarned;
    private LocalDateTime timestamp;

    public CombatHistory(UUID id, UUID characterId, UUID monsterId, boolean isVictory, int damageDealt, int damageTaken, long goldEarned, long experienceEarned, LocalDateTime timestamp) {
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

    // Getters
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
