package com.rpgengine.inventory.domain.repository;

import com.rpgengine.inventory.domain.Item;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItemRepository {
    Optional<Item> findById(UUID id);
    List<Item> findAll();
    void deleteById(UUID id);
    Item save(Item item);
}
