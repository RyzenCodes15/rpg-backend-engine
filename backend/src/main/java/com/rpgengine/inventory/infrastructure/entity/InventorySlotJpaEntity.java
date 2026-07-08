package com.rpgengine.inventory.infrastructure.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.util.UUID;

@Entity
@Table(name = "inventory_slots")
public class InventorySlotJpaEntity {

    @Id
    private UUID id;

    @Column(name = "inventory_id", nullable = false)
    private UUID inventoryId;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private ItemJpaEntity item;

    @Column(name = "slot_index", nullable = false)
    private int slotIndex;

    @Column(nullable = false)
    private int quantity;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getInventoryId() { return inventoryId; }
    public void setInventoryId(UUID inventoryId) { this.inventoryId = inventoryId; }
    public ItemJpaEntity getItem() { return item; }
    public void setItem(ItemJpaEntity item) { this.item = item; }
    public int getSlotIndex() { return slotIndex; }
    public void setSlotIndex(int slotIndex) { this.slotIndex = slotIndex; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
