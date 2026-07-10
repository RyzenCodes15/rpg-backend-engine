package com.rpgengine.skill.infrastructure.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "character_skills")
public class CharacterSkillJpaEntity {
    @Id
    private UUID id;

    @Column(name = "character_id", nullable = false)
    private UUID characterId;

    @Column(name = "skill_id", nullable = false)
    private UUID skillId;

    @Column(name = "unlocked_at", nullable = false)
    private LocalDateTime unlockedAt;

    public CharacterSkillJpaEntity() {}

    public CharacterSkillJpaEntity(UUID id, UUID characterId, UUID skillId, LocalDateTime unlockedAt) {
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
