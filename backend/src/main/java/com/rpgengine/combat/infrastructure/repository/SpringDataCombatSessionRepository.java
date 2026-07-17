package com.rpgengine.combat.infrastructure.repository;

import com.rpgengine.combat.infrastructure.entity.CombatSessionJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SpringDataCombatSessionRepository extends JpaRepository<CombatSessionJpaEntity, UUID> {
    Optional<CombatSessionJpaEntity> findByCharacterIdAndIsActiveTrue(UUID characterId);
    List<CombatSessionJpaEntity> findAllByCharacterIdAndIsActiveTrue(UUID characterId);
    Optional<CombatSessionJpaEntity> findFirstByCharacterIdAndIsActiveTrueOrderByStartedAtDesc(UUID characterId);
}
