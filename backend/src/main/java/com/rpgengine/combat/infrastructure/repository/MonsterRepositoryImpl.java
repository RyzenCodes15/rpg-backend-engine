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
}
