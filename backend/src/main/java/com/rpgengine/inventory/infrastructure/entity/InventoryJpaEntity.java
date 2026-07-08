package com.rpgengine.inventory.infrastructure.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.util.List;
import java.util.UUID;
import java.util.ArrayList;

@Entity
@Table(name = "character_inventories")
public class InventoryJpaEntity {

    @Id
    private UUID id;

    @Column(name = "character_id", nullable = false, unique = true)
    private UUID characterId;

    @Column(nullable = false)
    private int capacity;

    @OneToMany(mappedBy = "inventoryId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InventorySlotJpaEntity> slots = new ArrayList<>();

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getCharacterId() { return characterId; }
    public void setCharacterId(UUID characterId) { this.characterId = characterId; }
    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public List<InventorySlotJpaEntity> getSlots() { return slots; }
    public void setSlots(List<InventorySlotJpaEntity> slots) { this.slots = slots; }
}
