package com.rpgengine.inventory.infrastructure.repository;

import com.rpgengine.inventory.infrastructure.entity.ItemJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SpringDataItemRepository extends JpaRepository<ItemJpaEntity, UUID> {
}
