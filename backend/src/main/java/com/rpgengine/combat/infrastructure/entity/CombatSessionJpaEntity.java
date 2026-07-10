package com.rpgengine.combat.infrastructure.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "combat_sessions")
public class CombatSessionJpaEntity {
    @Id
    private UUID id;

    @Column(name = "character_id", nullable = false)
    private UUID characterId;

    @Column(name = "monster_id", nullable = false)
    private UUID monsterId;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "character_hp", nullable = false)
    private int characterHp;

    @Column(name = "character_mana", nullable = false)
    private int characterMana;

    @Column(name = "monster_hp", nullable = false)
    private int monsterHp;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "session_id")
    private List<CombatSessionCooldownJpaEntity> cooldowns;

    public CombatSessionJpaEntity() {}

    public CombatSessionJpaEntity(UUID id, UUID characterId, UUID monsterId, boolean isActive, int characterHp, int characterMana, int monsterHp, LocalDateTime startedAt, LocalDateTime updatedAt, List<CombatSessionCooldownJpaEntity> cooldowns) {
        this.id = id;
        this.characterId = characterId;
        this.monsterId = monsterId;
        this.isActive = isActive;
        this.characterHp = characterHp;
        this.characterMana = characterMana;
        this.monsterHp = monsterHp;
        this.startedAt = startedAt;
        this.updatedAt = updatedAt;
        this.cooldowns = cooldowns;
    }

    public UUID getId() { return id; }
    public UUID getCharacterId() { return characterId; }
    public UUID getMonsterId() { return monsterId; }
    public boolean isActive() { return isActive; }
    public int getCharacterHp() { return characterHp; }
    public int getCharacterMana() { return characterMana; }
    public int getMonsterHp() { return monsterHp; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public List<CombatSessionCooldownJpaEntity> getCooldowns() { return cooldowns; }
}
