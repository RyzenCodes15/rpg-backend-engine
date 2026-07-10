package com.rpgengine.combat.infrastructure.repository;

import com.rpgengine.combat.domain.engine.CombatSession;
import com.rpgengine.combat.domain.repository.CombatSessionRepository;
import com.rpgengine.combat.infrastructure.entity.CombatSessionCooldownJpaEntity;
import com.rpgengine.combat.infrastructure.entity.CombatSessionJpaEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class CombatSessionRepositoryImpl implements CombatSessionRepository {

    private final SpringDataCombatSessionRepository springDataCombatSessionRepository;

    public CombatSessionRepositoryImpl(SpringDataCombatSessionRepository springDataCombatSessionRepository) {
        this.springDataCombatSessionRepository = springDataCombatSessionRepository;
    }

    @Override
    public void save(CombatSession session) {
        List<CombatSessionCooldownJpaEntity> cooldownEntities = session.getCooldowns().entrySet().stream()
                .map(entry -> new CombatSessionCooldownJpaEntity(
                        UUID.randomUUID(),
                        session.getId(),
                        entry.getKey(),
                        entry.getValue()
                ))
                .collect(Collectors.toList());

        CombatSessionJpaEntity entity = new CombatSessionJpaEntity(
                session.getId(),
                session.getCharacterId(),
                session.getMonsterId(),
                session.isActive(),
                session.getCharacterHp(),
                session.getCharacterMana(),
                session.getMonsterHp(),
                session.getStartedAt(),
                session.getUpdatedAt(),
                cooldownEntities
        );

        springDataCombatSessionRepository.save(entity);
    }

    @Override
    public Optional<CombatSession> findActiveSessionByCharacterId(UUID characterId) {
        return springDataCombatSessionRepository.findByCharacterIdAndIsActiveTrue(characterId).map(this::toDomain);
    }

    @Override
    public Optional<CombatSession> findById(UUID id) {
        return springDataCombatSessionRepository.findById(id).map(this::toDomain);
    }

    private CombatSession toDomain(CombatSessionJpaEntity entity) {
        Map<UUID, Integer> cooldowns = new HashMap<>();
        if (entity.getCooldowns() != null) {
            for (CombatSessionCooldownJpaEntity cooldownEntity : entity.getCooldowns()) {
                cooldowns.put(cooldownEntity.getSkillId(), cooldownEntity.getRemainingTurns());
            }
        }

        return new CombatSession(
                entity.getId(),
                entity.getCharacterId(),
                entity.getMonsterId(),
                entity.isActive(),
                entity.getCharacterHp(),
                entity.getCharacterMana(),
                entity.getMonsterHp(),
                entity.getStartedAt(),
                entity.getUpdatedAt(),
                cooldowns
        );
    }
}
