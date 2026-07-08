package com.rpgengine.inventory.domain.repository;

import com.rpgengine.inventory.domain.Inventory;
import java.util.Optional;
import java.util.UUID;

public interface InventoryRepository {
    Inventory save(Inventory inventory);
    Optional<Inventory> findByCharacterId(UUID characterId);
}
