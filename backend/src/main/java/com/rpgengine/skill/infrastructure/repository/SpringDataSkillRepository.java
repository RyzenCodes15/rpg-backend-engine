package com.rpgengine.skill.infrastructure.repository;

import com.rpgengine.character.domain.CharacterClass;
import com.rpgengine.skill.infrastructure.entity.SkillJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpringDataSkillRepository extends JpaRepository<SkillJpaEntity, UUID> {
    List<SkillJpaEntity> findByClassRestriction(CharacterClass classRestriction);
}
