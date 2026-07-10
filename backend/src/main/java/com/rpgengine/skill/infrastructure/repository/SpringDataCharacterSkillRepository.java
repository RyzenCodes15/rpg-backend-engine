package com.rpgengine.skill.infrastructure.repository;

import com.rpgengine.skill.infrastructure.entity.CharacterSkillJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SpringDataCharacterSkillRepository extends JpaRepository<CharacterSkillJpaEntity, UUID> {
    List<CharacterSkillJpaEntity> findByCharacterId(UUID characterId);
    Optional<CharacterSkillJpaEntity> findByCharacterIdAndSkillId(UUID characterId, UUID skillId);
}
