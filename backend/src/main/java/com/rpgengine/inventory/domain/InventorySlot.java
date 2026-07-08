package com.rpgengine.inventory.domain;

import java.util.UUID;

public class InventorySlot {
    private UUID id;
    private int slotIndex;
    private Item item;
    private int quantity;

    public InventorySlot() {}

    public InventorySlot(UUID id, int slotIndex, Item item, int quantity) {
        this.id = id;
        this.slotIndex = slotIndex;
        this.item = item;
        this.quantity = quantity;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public int getSlotIndex() { return slotIndex; }
    public void setSlotIndex(int slotIndex) { this.slotIndex = slotIndex; }
    public Item getItem() { return item; }
    public void setItem(Item item) { this.item = item; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    
    public void addQuantity(int amount) { this.quantity += amount; }
    public void removeQuantity(int amount) { this.quantity -= amount; }
}
