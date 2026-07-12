package com.rpgengine.skill.infrastructure.repository;

import com.rpgengine.character.domain.CharacterClass;
import com.rpgengine.skill.domain.Skill;
import com.rpgengine.skill.domain.repository.SkillRepository;
import com.rpgengine.skill.infrastructure.entity.SkillJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class SkillRepositoryImpl implements SkillRepository {

    private final SpringDataSkillRepository springDataSkillRepository;

    public SkillRepositoryImpl(SpringDataSkillRepository springDataSkillRepository) {
        this.springDataSkillRepository = springDataSkillRepository;
    }

    @Override
    public Optional<Skill> findById(UUID id) {
        return springDataSkillRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Skill> findAll() {
        return springDataSkillRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<Skill> findByClassRestriction(CharacterClass classRestriction) {
        return springDataSkillRepository.findByClassRestriction(classRestriction).stream().map(this::toDomain).collect(Collectors.toList());
    }
    @Override
    public Skill save(Skill skill) {
        SkillJpaEntity entity = new SkillJpaEntity(
                skill.getId(),
                skill.getName(),
                skill.getDescription(),
                skill.getClassRestriction(),
                skill.getRequiredLevel(),
                skill.getManaCost(),
                skill.getCooldown(),
                skill.getBaseDamage(),
                skill.getSkillType(),
                skill.getElement(),
                skill.getIcon(),
                skill.getAnimationName(),
                skill.getStatusEffectType()
        );
        entity = springDataSkillRepository.save(entity);
        return toDomain(entity);
    }

    @Override
    public void deleteById(UUID id) {
        springDataSkillRepository.deleteById(id);
    }

    private Skill toDomain(SkillJpaEntity entity) {
        return new Skill(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getClassRestriction(),
                entity.getRequiredLevel(),
                entity.getManaCost(),
                entity.getCooldown(),
                entity.getBaseDamage(),
                entity.getSkillType(),
                entity.getElement(),
                entity.getIcon(),
                entity.getAnimationName(),
                entity.getStatusEffectType()
        );
    }
}
