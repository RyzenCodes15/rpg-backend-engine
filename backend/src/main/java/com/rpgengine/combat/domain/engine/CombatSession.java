package com.rpgengine.combat.domain.engine;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class CombatSession {
    private UUID id;
    private UUID characterId;
    private UUID monsterId;
    private boolean isActive;
    private int characterHp;
    private int characterMana;
    private int monsterHp;
    private LocalDateTime startedAt;
    private LocalDateTime updatedAt;
    private Map<UUID, Integer> cooldowns;

    public CombatSession(UUID id, UUID characterId, UUID monsterId, boolean isActive, int characterHp, int characterMana, int monsterHp, LocalDateTime startedAt, LocalDateTime updatedAt, Map<UUID, Integer> cooldowns) {
        this.id = id;
        this.characterId = characterId;
        this.monsterId = monsterId;
        this.isActive = isActive;
        this.characterHp = characterHp;
        this.characterMana = characterMana;
        this.monsterHp = monsterHp;
        this.startedAt = startedAt;
        this.updatedAt = updatedAt;
        this.cooldowns = cooldowns != null ? cooldowns : new HashMap<>();
    }

    public void decrementCooldowns() {
        cooldowns.replaceAll((k, v) -> Math.max(0, v - 1));
        cooldowns.values().removeIf(v -> v <= 0);
    }

    public void setCooldown(UUID skillId, int turns) {
        cooldowns.put(skillId, turns);
    }

    public boolean isSkillOnCooldown(UUID skillId) {
        return cooldowns.getOrDefault(skillId, 0) > 0;
    }

    public UUID getId() { return id; }
    public UUID getCharacterId() { return characterId; }
    public UUID getMonsterId() { return monsterId; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    public int getCharacterHp() { return characterHp; }
    public void setCharacterHp(int characterHp) { this.characterHp = characterHp; }
    public int getCharacterMana() { return characterMana; }
    public void setCharacterMana(int characterMana) { this.characterMana = characterMana; }
    public int getMonsterHp() { return monsterHp; }
    public void setMonsterHp(int monsterHp) { this.monsterHp = monsterHp; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public Map<UUID, Integer> getCooldowns() { return cooldowns; }
}
