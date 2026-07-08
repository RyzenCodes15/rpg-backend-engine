package com.rpgengine.inventory.application;

import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.inventory.domain.Inventory;
import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.repository.InventoryRepository;
import com.rpgengine.inventory.domain.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;

    public InventoryService(InventoryRepository inventoryRepository, ItemRepository itemRepository) {
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
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
}
