package com.rpgengine.character.application;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.CharacterStats;
import com.rpgengine.character.domain.CharacterStatsCalculator;
import com.rpgengine.inventory.application.EquipmentService;
import com.rpgengine.inventory.domain.Equipment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class CampService {

    private final CharacterService characterService;
    private final EquipmentService equipmentService;

    public CampService(CharacterService characterService, EquipmentService equipmentService) {
        this.characterService = characterService;
        this.equipmentService = equipmentService;
    }

    @Transactional
    public Character restAtCamp(UUID characterId) {
        Character character = characterService.getCharacter(characterId);
        Equipment equipment = equipmentService.getEquipmentByCharacterId(characterId);
        CharacterStats totalStats = CharacterStatsCalculator.calculateTotalStats(character.getBaseStats(), equipment);
        
        // Restore HP and Mana to maximum
        character.setCurrentHealth(totalStats.health());
        character.setCurrentMana(totalStats.mana());
        
        characterService.updateCharacter(character);
        return character;
    }
}
