package com.rpgengine.inventory.infrastructure.repository;

import com.rpgengine.inventory.domain.Inventory;
import com.rpgengine.inventory.domain.InventorySlot;
import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.ItemStats;
import com.rpgengine.inventory.domain.repository.InventoryRepository;
import com.rpgengine.inventory.infrastructure.entity.InventoryJpaEntity;
import com.rpgengine.inventory.infrastructure.entity.InventorySlotJpaEntity;
import com.rpgengine.inventory.infrastructure.entity.ItemJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class InventoryRepositoryImpl implements InventoryRepository {

    private final SpringDataInventoryRepository jpaRepository;
    private final SpringDataItemRepository itemJpaRepository;

    public InventoryRepositoryImpl(SpringDataInventoryRepository jpaRepository, SpringDataItemRepository itemJpaRepository) {
        this.jpaRepository = jpaRepository;
        this.itemJpaRepository = itemJpaRepository;
    }

    @Override
    public Inventory save(Inventory inventory) {
        InventoryJpaEntity entity = toEntity(inventory);
        InventoryJpaEntity saved = jpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Inventory> findByCharacterId(UUID characterId) {
        return jpaRepository.findByCharacterId(characterId).map(this::toDomain);
    }

    private InventoryJpaEntity toEntity(Inventory inventory) {
        InventoryJpaEntity entity = new InventoryJpaEntity();
        entity.setId(inventory.getId());
        entity.setCharacterId(inventory.getCharacterId());
        entity.setCapacity(inventory.getCapacity());

        if (inventory.getSlots() != null) {
            List<InventorySlotJpaEntity> slotEntities = inventory.getSlots().stream().map(slot -> {
                InventorySlotJpaEntity slotEntity = new InventorySlotJpaEntity();
                slotEntity.setId(slot.getId());
                slotEntity.setInventoryId(inventory.getId());
                slotEntity.setSlotIndex(slot.getSlotIndex());
                slotEntity.setQuantity(slot.getQuantity());
                
                // Fetch the item reference
                ItemJpaEntity itemEntity = itemJpaRepository.findById(slot.getItem().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Item not found"));
                slotEntity.setItem(itemEntity);
                
                return slotEntity;
            }).collect(Collectors.toList());
            
            entity.setSlots(slotEntities);
        }

        return entity;
    }

    private Inventory toDomain(InventoryJpaEntity entity) {
        List<InventorySlot> slots = entity.getSlots().stream().map(slotEntity -> {
            Item item = toItemDomain(slotEntity.getItem());
            return new InventorySlot(slotEntity.getId(), slotEntity.getSlotIndex(), item, slotEntity.getQuantity());
        }).collect(Collectors.toList());
        
        return new Inventory(entity.getId(), entity.getCharacterId(), entity.getCapacity(), slots);
    }

    private Item toItemDomain(ItemJpaEntity entity) {
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
