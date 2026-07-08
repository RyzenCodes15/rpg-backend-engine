package com.rpgengine.inventory.domain.repository;

import com.rpgengine.inventory.domain.Equipment;
import java.util.Optional;
import java.util.UUID;

public interface EquipmentRepository {
    Equipment save(Equipment equipment);
    Optional<Equipment> findByCharacterId(UUID characterId);
}
