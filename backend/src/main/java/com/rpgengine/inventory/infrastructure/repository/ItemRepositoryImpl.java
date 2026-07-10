package com.rpgengine.inventory.infrastructure.repository;

import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.ItemStats;
import com.rpgengine.inventory.domain.repository.ItemRepository;
import com.rpgengine.inventory.infrastructure.entity.ItemJpaEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class ItemRepositoryImpl implements ItemRepository {

    private final SpringDataItemRepository jpaRepository;

    public ItemRepositoryImpl(SpringDataItemRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<Item> findById(UUID id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    private Item toDomain(ItemJpaEntity entity) {
        ItemStats stats = new ItemStats(
                entity.getBonusHealth(),
                entity.getBonusMana(),
                entity.getBonusAttack(),
                entity.getBonusDefense(),
                entity.getBonusSpeed(),
                entity.getBonusCriticalChance(),
                entity.getBonusDodgeChance()
        );
        return new Item(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getRarity(),
                entity.getCategory(),
                entity.getValue(),
                entity.getRequiredLevel(),
                stats
        );
    }
}
