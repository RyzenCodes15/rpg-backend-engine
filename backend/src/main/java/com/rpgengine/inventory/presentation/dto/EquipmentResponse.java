package com.rpgengine.inventory.presentation.dto;

import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.Item;
import java.util.UUID;

public record EquipmentResponse(
        UUID id,
        UUID characterId,
        Item weapon,
        Item helmet,
        Item armor,
        Item boots
) {
    public static EquipmentResponse fromDomain(Equipment equipment) {
        return new EquipmentResponse(
                equipment.getId(),
                equipment.getCharacterId(),
                equipment.getWeapon(),
                equipment.getHelmet(),
                equipment.getArmor(),
                equipment.getBoots()
        );
    }
}
