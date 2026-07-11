package com.rpgengine.inventory.application;

import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.EquipmentSlot;
import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.ItemCategory;
import com.rpgengine.inventory.domain.repository.EquipmentRepository;
import com.rpgengine.inventory.domain.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final ItemRepository itemRepository;

    public EquipmentService(EquipmentRepository equipmentRepository, ItemRepository itemRepository) {
        this.equipmentRepository = equipmentRepository;
        this.itemRepository = itemRepository;
    }

    @Transactional
    public void createEquipment(UUID characterId) {
        Equipment equipment = new Equipment(UUID.randomUUID(), characterId, null, null, null, null);
        equipmentRepository.save(equipment);
    }

    public Equipment getEquipmentByCharacterId(UUID characterId) {
        return equipmentRepository.findByCharacterId(characterId)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found"));
    }

    @Transactional
    public void equipItem(UUID characterId, UUID itemId, EquipmentSlot slot) {
        Equipment equipment = getEquipmentByCharacterId(characterId);
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        // Validate item category matches slot
        if (!isCategoryValidForSlot(item.getCategory(), slot)) {
            throw new IllegalArgumentException("Item cannot be equipped in this slot");
        }

        switch (slot) {
            case WEAPON -> equipment.setWeapon(item);
            case HELMET -> equipment.setHelmet(item);
            case ARMOR -> equipment.setArmor(item);
            case BOOTS -> equipment.setBoots(item);
        }

        equipmentRepository.save(equipment);
    }

    @Transactional
    public void unequipItem(UUID characterId, EquipmentSlot slot) {
        Equipment equipment = getEquipmentByCharacterId(characterId);
        switch (slot) {
            case WEAPON -> equipment.setWeapon(null);
            case HELMET -> equipment.setHelmet(null);
            case ARMOR -> equipment.setArmor(null);
            case BOOTS -> equipment.setBoots(null);
        }
        equipmentRepository.save(equipment);
    }

    private boolean isCategoryValidForSlot(ItemCategory category, EquipmentSlot slot) {
        return switch (slot) {
            case WEAPON -> category == ItemCategory.WEAPON;
            case HELMET -> category == ItemCategory.HELMET;
            case ARMOR -> category == ItemCategory.ARMOR;
            case BOOTS -> category == ItemCategory.BOOTS;
        };
    }
}
