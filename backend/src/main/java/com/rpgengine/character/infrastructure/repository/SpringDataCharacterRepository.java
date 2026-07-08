package com.rpgengine.character.infrastructure.repository;

import com.rpgengine.character.infrastructure.entity.CharacterJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpringDataCharacterRepository extends JpaRepository<CharacterJpaEntity, UUID> {
    List<CharacterJpaEntity> findByUserId(UUID userId);
}
