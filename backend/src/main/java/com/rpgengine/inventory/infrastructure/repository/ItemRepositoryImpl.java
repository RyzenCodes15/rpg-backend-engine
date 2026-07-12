package com.rpgengine.inventory.infrastructure.repository;

import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.ItemStats;
import com.rpgengine.inventory.domain.repository.ItemRepository;
import com.rpgengine.inventory.infrastructure.entity.ItemJpaEntity;
import org.springframework.stereotype.Component;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @Override
    public List<Item> findAll() {
        return jpaRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Item save(Item item) {
        ItemJpaEntity entity = toEntity(item);
        entity = jpaRepository.save(entity);
        return toDomain(entity);
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    private ItemJpaEntity toEntity(Item item) {
        ItemJpaEntity entity = new ItemJpaEntity();
        entity.setId(item.getId());
        entity.setName(item.getName());
        entity.setDescription(item.getDescription());
        entity.setRarity(item.getRarity());
        entity.setCategory(item.getCategory());
        entity.setValue(item.getValue());
        entity.setRequiredLevel(item.getRequiredLevel());
        if (item.getStats() != null) {
            entity.setBonusHealth(item.getStats().bonusHealth());
            entity.setBonusMana(item.getStats().bonusMana());
            entity.setBonusAttack(item.getStats().bonusAttack());
            entity.setBonusDefense(item.getStats().bonusDefense());
            entity.setBonusSpeed(item.getStats().bonusSpeed());
            entity.setBonusCriticalChance(item.getStats().bonusCriticalChance());
            entity.setBonusDodgeChance(item.getStats().bonusDodgeChance());
        }
        return entity;
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
