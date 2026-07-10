package com.rpgengine.inventory.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class Inventory {
    private UUID id;
    private UUID characterId;
    private int capacity;
    private List<InventorySlot> slots;

    public Inventory() {
        this.slots = new ArrayList<>();
    }

    public Inventory(UUID id, UUID characterId, int capacity, List<InventorySlot> slots) {
        this.id = id;
        this.characterId = characterId;
        this.capacity = capacity;
        this.slots = slots != null ? slots : new ArrayList<>();
    }

    public boolean canAddItem() {
        return slots.size() < capacity;
    }

    public void addItem(Item item, int quantity) {
        // Find existing stack if stackable (assuming all stackable for simplicity for now, except equipment)
        if (item.getCategory() == ItemCategory.CONSUMABLE || item.getCategory() == ItemCategory.MATERIAL) {
            Optional<InventorySlot> existingSlot = slots.stream()
                    .filter(slot -> slot.getItem().getId().equals(item.getId()))
                    .findFirst();
                    
            if (existingSlot.isPresent()) {
                existingSlot.get().addQuantity(quantity);
                return;
            }
        }
        
        if (!canAddItem()) {
            throw new IllegalStateException("Inventory is full");
        }
        
        int nextSlotIndex = slots.stream().mapToInt(InventorySlot::getSlotIndex).max().orElse(-1) + 1;
        slots.add(new InventorySlot(UUID.randomUUID(), nextSlotIndex, item, quantity));
    }
    
    public void removeItemSlot(UUID slotId) {
        slots.removeIf(slot -> slot.getId().equals(slotId));
    }

    public boolean hasItem(UUID itemId, int requiredQuantity) {
        int total = slots.stream()
                .filter(slot -> slot.getItem().getId().equals(itemId))
                .mapToInt(InventorySlot::getQuantity)
                .sum();
        return total >= requiredQuantity;
    }

    public void consumeItem(UUID itemId, int quantityToConsume) {
        if (!hasItem(itemId, quantityToConsume)) {
            throw new IllegalStateException("Not enough items");
        }
        int remainingToConsume = quantityToConsume;
        for (int i = slots.size() - 1; i >= 0; i--) {
            InventorySlot slot = slots.get(i);
            if (slot.getItem().getId().equals(itemId)) {
                if (slot.getQuantity() > remainingToConsume) {
                    slot.removeQuantity(remainingToConsume);
                    break;
                } else {
                    remainingToConsume -= slot.getQuantity();
                    slots.remove(i);
                }
            }
        }
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getCharacterId() { return characterId; }
    public void setCharacterId(UUID characterId) { this.characterId = characterId; }
    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public List<InventorySlot> getSlots() { return slots; }
    public void setSlots(List<InventorySlot> slots) { this.slots = slots; }
}
