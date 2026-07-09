package com.rpgengine.character.infrastructure.repository;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.CharacterStats;
import com.rpgengine.character.domain.repository.CharacterRepository;
import com.rpgengine.character.infrastructure.entity.CharacterJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class CharacterRepositoryImpl implements CharacterRepository {

    private final SpringDataCharacterRepository jpaRepository;

    public CharacterRepositoryImpl(SpringDataCharacterRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Character save(Character character) {
        CharacterJpaEntity entity = toEntity(character);
        CharacterJpaEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Character> findById(UUID id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Character> findByUserId(UUID userId) {
        return jpaRepository.findByUserId(userId).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    private CharacterJpaEntity toEntity(Character character) {
        CharacterJpaEntity entity = new CharacterJpaEntity();
        entity.setId(character.getId());
        entity.setUserId(character.getUserId());
        entity.setName(character.getName());
        entity.setCharacterClass(character.getCharacterClass());
        entity.setLevel(character.getLevel());
        entity.setExperience(character.getExperience());
        entity.setGold(character.getGold());
        entity.setCurrentHealth(character.getCurrentHealth());
        entity.setCurrentMana(character.getCurrentMana());
        if (character.getBaseStats() != null) {
            entity.setHealth(character.getBaseStats().health());
            entity.setMana(character.getBaseStats().mana());
            entity.setAttack(character.getBaseStats().attack());
            entity.setDefense(character.getBaseStats().defense());
            entity.setSpeed(character.getBaseStats().speed());
            entity.setCriticalChance(character.getBaseStats().criticalChance());
        }
        entity.setCreatedAt(character.getCreatedAt());
        entity.setUpdatedAt(character.getUpdatedAt());
        return entity;
    }

    private Character toDomain(CharacterJpaEntity entity) {
        CharacterStats stats = new CharacterStats(
                entity.getHealth(),
                entity.getMana(),
                entity.getAttack(),
                entity.getDefense(),
                entity.getSpeed(),
                entity.getCriticalChance()
        );
        return new Character(
                entity.getId(),
                entity.getUserId(),
                entity.getName(),
                entity.getCharacterClass(),
                entity.getLevel(),
                entity.getExperience(),
                entity.getGold(),
                entity.getCurrentHealth(),
                entity.getCurrentMana(),
                stats,
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
