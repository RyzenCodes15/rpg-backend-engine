package com.rpgengine.combat.infrastructure.repository;

import com.rpgengine.combat.infrastructure.entity.CombatHistoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpringDataCombatHistoryRepository extends JpaRepository<CombatHistoryJpaEntity, UUID> {
    List<CombatHistoryJpaEntity> findByCharacterIdOrderByTimestampDesc(UUID characterId);
}
