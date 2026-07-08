package com.rpgengine.inventory.presentation.dto;

import com.rpgengine.inventory.domain.Inventory;
import com.rpgengine.inventory.domain.InventorySlot;
import com.rpgengine.inventory.domain.Item;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record InventoryResponse(
        UUID id,
        UUID characterId,
        int capacity,
        List<InventorySlotResponse> slots
) {
    public static InventoryResponse fromDomain(Inventory inventory) {
        List<InventorySlotResponse> slots = inventory.getSlots().stream()
                .map(InventorySlotResponse::fromDomain)
                .collect(Collectors.toList());
        return new InventoryResponse(inventory.getId(), inventory.getCharacterId(), inventory.getCapacity(), slots);
    }
}

record InventorySlotResponse(
        UUID id,
        int slotIndex,
        Item item,
        int quantity
) {
    public static InventorySlotResponse fromDomain(InventorySlot slot) {
        return new InventorySlotResponse(slot.getId(), slot.getSlotIndex(), slot.getItem(), slot.getQuantity());
    }
}
