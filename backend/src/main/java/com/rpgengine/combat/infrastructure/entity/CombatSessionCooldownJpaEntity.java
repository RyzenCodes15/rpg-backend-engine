package com.rpgengine.combat.infrastructure.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "combat_session_cooldowns")
public class CombatSessionCooldownJpaEntity {
    @Id
    private UUID id;

    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    @Column(name = "skill_id", nullable = false)
    private UUID skillId;

    @Column(name = "remaining_turns", nullable = false)
    private int remainingTurns;

    public CombatSessionCooldownJpaEntity() {}

    public CombatSessionCooldownJpaEntity(UUID id, UUID sessionId, UUID skillId, int remainingTurns) {
        this.id = id;
        this.sessionId = sessionId;
        this.skillId = skillId;
        this.remainingTurns = remainingTurns;
    }

    public UUID getId() { return id; }
    public UUID getSessionId() { return sessionId; }
    public UUID getSkillId() { return skillId; }
    public int getRemainingTurns() { return remainingTurns; }
}
