package com.rpgengine.skill.domain;

import java.time.LocalDateTime;
import java.util.UUID;

public class CharacterSkill {
    private UUID id;
    private UUID characterId;
    private UUID skillId;
    private LocalDateTime unlockedAt;

    public CharacterSkill(UUID id, UUID characterId, UUID skillId, LocalDateTime unlockedAt) {
        this.id = id;
        this.characterId = characterId;
        this.skillId = skillId;
        this.unlockedAt = unlockedAt;
    }

    public UUID getId() { return id; }
    public UUID getCharacterId() { return characterId; }
    public UUID getSkillId() { return skillId; }
    public LocalDateTime getUnlockedAt() { return unlockedAt; }
}
