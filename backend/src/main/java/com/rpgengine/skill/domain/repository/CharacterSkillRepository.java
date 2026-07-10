package com.rpgengine.skill.domain.repository;

import com.rpgengine.skill.domain.CharacterSkill;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CharacterSkillRepository {
    void save(CharacterSkill characterSkill);
    List<CharacterSkill> findByCharacterId(UUID characterId);
    Optional<CharacterSkill> findByCharacterIdAndSkillId(UUID characterId, UUID skillId);
}
