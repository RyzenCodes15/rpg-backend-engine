package com.rpgengine.combat.infrastructure.repository;

import com.rpgengine.combat.domain.CombatHistory;
import com.rpgengine.combat.domain.repository.CombatHistoryRepository;
import com.rpgengine.combat.infrastructure.entity.CombatHistoryJpaEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class CombatHistoryRepositoryImpl implements CombatHistoryRepository {

    private final SpringDataCombatHistoryRepository springDataRepository;

    public CombatHistoryRepositoryImpl(SpringDataCombatHistoryRepository springDataRepository) {
        this.springDataRepository = springDataRepository;
    }

    @Override
    public CombatHistory save(CombatHistory history) {
        CombatHistoryJpaEntity entity = new CombatHistoryJpaEntity(
                history.getId(),
                history.getCharacterId(),
                history.getMonsterId(),
                history.isVictory(),
                history.getDamageDealt(),
                history.getDamageTaken(),
                history.getGoldEarned(),
                history.getExperienceEarned(),
                history.getTimestamp()
        );
        CombatHistoryJpaEntity saved = springDataRepository.save(entity);
        return mapToDomain(saved);
    }

    @Override
    public List<CombatHistory> findByCharacterId(UUID characterId) {
        return springDataRepository.findByCharacterIdOrderByTimestampDesc(characterId).stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }

    private CombatHistory mapToDomain(CombatHistoryJpaEntity entity) {
        return new CombatHistory(
                entity.getId(),
                entity.getCharacterId(),
                entity.getMonsterId(),
                entity.isVictory(),
                entity.getDamageDealt(),
                entity.getDamageTaken(),
                entity.getGoldEarned(),
                entity.getExperienceEarned(),
                entity.getTimestamp()
        );
    }
}
