package com.rpgengine.skill.infrastructure.repository;

import com.rpgengine.skill.domain.CharacterSkill;
import com.rpgengine.skill.domain.repository.CharacterSkillRepository;
import com.rpgengine.skill.infrastructure.entity.CharacterSkillJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class CharacterSkillRepositoryImpl implements CharacterSkillRepository {

    private final SpringDataCharacterSkillRepository springDataCharacterSkillRepository;

    public CharacterSkillRepositoryImpl(SpringDataCharacterSkillRepository springDataCharacterSkillRepository) {
        this.springDataCharacterSkillRepository = springDataCharacterSkillRepository;
    }

    @Override
    public void save(CharacterSkill characterSkill) {
        CharacterSkillJpaEntity entity = new CharacterSkillJpaEntity(
                characterSkill.getId(),
                characterSkill.getCharacterId(),
                characterSkill.getSkillId(),
                characterSkill.getUnlockedAt()
        );
        springDataCharacterSkillRepository.save(entity);
    }

    @Override
    public List<CharacterSkill> findByCharacterId(UUID characterId) {
        return springDataCharacterSkillRepository.findByCharacterId(characterId)
                .stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Optional<CharacterSkill> findByCharacterIdAndSkillId(UUID characterId, UUID skillId) {
        return springDataCharacterSkillRepository.findByCharacterIdAndSkillId(characterId, skillId)
                .map(this::toDomain);
    }

    private CharacterSkill toDomain(CharacterSkillJpaEntity entity) {
        return new CharacterSkill(
                entity.getId(),
                entity.getCharacterId(),
                entity.getSkillId(),
                entity.getUnlockedAt()
        );
    }
}
