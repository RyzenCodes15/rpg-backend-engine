package com.rpgengine.skill.domain.repository;

import com.rpgengine.character.domain.CharacterClass;
import com.rpgengine.skill.domain.Skill;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SkillRepository {
    Optional<Skill> findById(UUID id);
    List<Skill> findAll();
    List<Skill> findByClassRestriction(CharacterClass classRestriction);
}
