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
        Equipment equipment = new Equipment(UUID.randomUUID(), characterId, null, null, null, null, null, null, null, null, null, null);
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
            case CHEST_ARMOR -> equipment.setChestArmor(item);
            case GLOVES -> equipment.setGloves(item);
            case BOOTS -> equipment.setBoots(item);
            case SHIELD -> equipment.setShield(item);
            case RING -> equipment.setRing(item);
            case AMULET -> equipment.setAmulet(item);
            case CAPE -> equipment.setCape(item);
            case LEG_ARMOR -> equipment.setLegArmor(item);
        }

        equipmentRepository.save(equipment);
    }

    @Transactional
    public void unequipItem(UUID characterId, EquipmentSlot slot) {
        Equipment equipment = getEquipmentByCharacterId(characterId);
        switch (slot) {
            case WEAPON -> equipment.setWeapon(null);
            case HELMET -> equipment.setHelmet(null);
            case CHEST_ARMOR -> equipment.setChestArmor(null);
            case GLOVES -> equipment.setGloves(null);
            case BOOTS -> equipment.setBoots(null);
            case SHIELD -> equipment.setShield(null);
            case RING -> equipment.setRing(null);
            case AMULET -> equipment.setAmulet(null);
            case CAPE -> equipment.setCape(null);
            case LEG_ARMOR -> equipment.setLegArmor(null);
        }
        equipmentRepository.save(equipment);
    }

    private boolean isCategoryValidForSlot(ItemCategory category, EquipmentSlot slot) {
        return switch (slot) {
            case WEAPON -> category == ItemCategory.WEAPON;
            case HELMET -> category == ItemCategory.HELMET;
            case CHEST_ARMOR -> category == ItemCategory.CHEST_ARMOR;
            case GLOVES -> category == ItemCategory.GLOVES;
            case BOOTS -> category == ItemCategory.BOOTS;
            case SHIELD -> category == ItemCategory.SHIELD;
            case RING -> category == ItemCategory.RING;
            case AMULET -> category == ItemCategory.AMULET;
            case CAPE -> category == ItemCategory.CAPE;
            case LEG_ARMOR -> category == ItemCategory.LEG_ARMOR;
        };
    }
}
