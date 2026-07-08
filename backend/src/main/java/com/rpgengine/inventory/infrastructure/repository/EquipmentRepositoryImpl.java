package com.rpgengine.inventory.infrastructure.repository;

import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.ItemStats;
import com.rpgengine.inventory.domain.repository.EquipmentRepository;
import com.rpgengine.inventory.infrastructure.entity.EquipmentJpaEntity;
import com.rpgengine.inventory.infrastructure.entity.ItemJpaEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class EquipmentRepositoryImpl implements EquipmentRepository {

    private final SpringDataEquipmentRepository jpaRepository;
    private final SpringDataItemRepository itemJpaRepository;

    public EquipmentRepositoryImpl(SpringDataEquipmentRepository jpaRepository, SpringDataItemRepository itemJpaRepository) {
        this.jpaRepository = jpaRepository;
        this.itemJpaRepository = itemJpaRepository;
    }

    @Override
    public Equipment save(Equipment equipment) {
        EquipmentJpaEntity entity = toEntity(equipment);
        EquipmentJpaEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Equipment> findByCharacterId(UUID characterId) {
        return jpaRepository.findByCharacterId(characterId).map(this::toDomain);
    }

    private EquipmentJpaEntity toEntity(Equipment equipment) {
        EquipmentJpaEntity entity = new EquipmentJpaEntity();
        entity.setId(equipment.getId());
        entity.setCharacterId(equipment.getCharacterId());

        if (equipment.getWeapon() != null) {
            itemJpaRepository.findById(equipment.getWeapon().getId()).ifPresent(entity::setWeapon);
        }
        if (equipment.getHelmet() != null) {
            itemJpaRepository.findById(equipment.getHelmet().getId()).ifPresent(entity::setHelmet);
        }
        if (equipment.getChestArmor() != null) {
            itemJpaRepository.findById(equipment.getChestArmor().getId()).ifPresent(entity::setChestArmor);
        }
        if (equipment.getGloves() != null) {
            itemJpaRepository.findById(equipment.getGloves().getId()).ifPresent(entity::setGloves);
        }
        if (equipment.getBoots() != null) {
            itemJpaRepository.findById(equipment.getBoots().getId()).ifPresent(entity::setBoots);
        }

        return entity;
    }

    private Equipment toDomain(EquipmentJpaEntity entity) {
        return new Equipment(
                entity.getId(),
                entity.getCharacterId(),
                toItemDomain(entity.getWeapon()),
                toItemDomain(entity.getHelmet()),
                toItemDomain(entity.getChestArmor()),
                toItemDomain(entity.getGloves()),
                toItemDomain(entity.getBoots())
        );
    }

    private Item toItemDomain(ItemJpaEntity entity) {
        if (entity == null) return null;
        
        ItemStats stats = new ItemStats(
                entity.getBonusHealth(),
                entity.getBonusMana(),
                entity.getBonusAttack(),
                entity.getBonusDefense(),
                entity.getBonusSpeed(),
                entity.getBonusCriticalChance()
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
