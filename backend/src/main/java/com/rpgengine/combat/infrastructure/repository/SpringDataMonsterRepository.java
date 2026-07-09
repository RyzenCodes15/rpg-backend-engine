package com.rpgengine.combat.infrastructure.repository;

import com.rpgengine.combat.infrastructure.entity.MonsterJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SpringDataMonsterRepository extends JpaRepository<MonsterJpaEntity, UUID> {
}
