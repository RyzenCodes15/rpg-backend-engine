package com.rpgengine.inventory.application;

import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.inventory.domain.Inventory;
import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.repository.EquipmentRepository;
import com.rpgengine.inventory.domain.repository.InventoryRepository;
import com.rpgengine.inventory.domain.repository.ItemRepository;
import com.rpgengine.character.domain.CharacterStatsCalculator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;
    private final com.rpgengine.character.domain.repository.CharacterRepository characterRepository;
    private final EquipmentRepository equipmentRepository;

    public InventoryService(InventoryRepository inventoryRepository, ItemRepository itemRepository, com.rpgengine.character.domain.repository.CharacterRepository characterRepository, EquipmentRepository equipmentRepository) {
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
        this.characterRepository = characterRepository;
        this.equipmentRepository = equipmentRepository;
    }

    @Transactional
    public void createInventory(UUID characterId) {
        Inventory inventory = new Inventory(UUID.randomUUID(), characterId, 20, new ArrayList<>());
        inventoryRepository.save(inventory);
    }

    public Inventory getInventoryByCharacterId(UUID characterId) {
        return inventoryRepository.findByCharacterId(characterId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));
    }

    @Transactional
    public void addItem(UUID characterId, UUID itemId, int quantity) {
        Inventory inventory = getInventoryByCharacterId(characterId);
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
                
        inventory.addItem(item, quantity);
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void removeItemSlot(UUID characterId, UUID slotId) {
        Inventory inventory = getInventoryByCharacterId(characterId);
        inventory.removeItemSlot(slotId);
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void useItem(UUID characterId, UUID slotId) {
        Inventory inventory = getInventoryByCharacterId(characterId);
        com.rpgengine.inventory.domain.InventorySlot slot = inventory.getSlots().stream()
                .filter(s -> s.getId().equals(slotId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));

        Item item = slot.getItem();
        if (item.getCategory() != com.rpgengine.inventory.domain.ItemCategory.CONSUMABLE) {
            throw new IllegalArgumentException("Item is not consumable");
        }

        com.rpgengine.character.domain.Character character = characterRepository.findById(characterId)
                .orElseThrow(() -> new ResourceNotFoundException("Character not found"));

        // Heal character
        Equipment equipment = equipmentRepository.findByCharacterId(characterId).orElse(null);
        int maxHealth = CharacterStatsCalculator.calculateTotalStats(character.getBaseStats(), equipment).health();
        int healingAmount = item.getStats().bonusHealth();
        int newHealth = Math.min(maxHealth, character.getCurrentHealth() + healingAmount);
        character.setCurrentHealth(newHealth);
        characterRepository.save(character);

        // Consume item
        if (slot.getQuantity() > 1) {
            slot.removeQuantity(1);
        } else {
            inventory.removeItemSlot(slotId);
        }
        inventoryRepository.save(inventory);
    }
}
