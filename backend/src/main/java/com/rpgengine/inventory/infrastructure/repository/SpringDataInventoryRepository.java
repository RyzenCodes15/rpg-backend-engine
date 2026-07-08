package com.rpgengine.inventory.infrastructure.repository;

import com.rpgengine.inventory.infrastructure.entity.InventoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SpringDataInventoryRepository extends JpaRepository<InventoryJpaEntity, UUID> {
    Optional<InventoryJpaEntity> findByCharacterId(UUID characterId);
}
