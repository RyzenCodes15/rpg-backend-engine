package com.rpgengine.inventory.domain.repository;

import com.rpgengine.inventory.domain.Item;
import java.util.Optional;
import java.util.UUID;

public interface ItemRepository {
    Optional<Item> findById(UUID id);
}
