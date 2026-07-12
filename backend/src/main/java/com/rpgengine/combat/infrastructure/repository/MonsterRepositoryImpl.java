package com.rpgengine.combat.infrastructure.repository;

import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.domain.repository.MonsterRepository;
import com.rpgengine.combat.infrastructure.entity.MonsterJpaEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class MonsterRepositoryImpl implements MonsterRepository {

    private final SpringDataMonsterRepository springDataRepository;

    public MonsterRepositoryImpl(SpringDataMonsterRepository springDataRepository) {
        this.springDataRepository = springDataRepository;
    }

    @Override
    public List<Monster> findAll() {
        return springDataRepository.findAll().stream()
                .map(MonsterJpaEntity::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Monster> findById(UUID id) {
        return springDataRepository.findById(id).map(MonsterJpaEntity::toDomain);
    }

    @Override
    public Monster save(Monster monster) {
        MonsterJpaEntity entity = toEntity(monster);
        entity = springDataRepository.save(entity);
        return entity.toDomain();
    }

    @Override
    public void deleteById(UUID id) {
        springDataRepository.deleteById(id);
    }

    private MonsterJpaEntity toEntity(Monster monster) {
        MonsterJpaEntity entity = new MonsterJpaEntity();
        entity.setId(monster.getId());
        entity.setName(monster.getName());
        entity.setDescription(monster.getDescription());
        entity.setLevel(monster.getLevel());
        entity.setHealth(monster.getHealth());
        entity.setAttack(monster.getAttack());
        entity.setDefense(monster.getDefense());
        entity.setSpeed(monster.getSpeed());
        entity.setGoldReward(monster.getGoldReward());
        entity.setExperienceReward(monster.getExperienceReward());

        if (monster.getLootTable() != null) {
            List<com.rpgengine.combat.infrastructure.entity.MonsterLootJpaEntity> lootEntities = monster.getLootTable().stream().map(l -> {
                com.rpgengine.combat.infrastructure.entity.MonsterLootJpaEntity loot = new com.rpgengine.combat.infrastructure.entity.MonsterLootJpaEntity(l.getItemId(), l.getDropChance());
                if (l.getId() != null) {
                    loot.setId(l.getId());
                }
                loot.setMonster(entity);
                return loot;
            }).collect(Collectors.toList());
            entity.setLootTable(lootEntities);
        }
        return entity;
    }
}
