package com.rpgengine.combat.domain.repository;

import com.rpgengine.combat.domain.engine.CombatSession;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CombatSessionRepository {
    void save(CombatSession session);
    Optional<CombatSession> findActiveSessionByCharacterId(UUID characterId);
    List<CombatSession> findAllActiveSessionsByCharacterId(UUID characterId);
    Optional<CombatSession> findById(UUID id);
}
