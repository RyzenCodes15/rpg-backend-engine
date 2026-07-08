package com.rpgengine.character.application;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.CharacterClass;
import com.rpgengine.character.domain.repository.CharacterRepository;
import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.inventory.application.EquipmentService;
import com.rpgengine.inventory.application.InventoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final InventoryService inventoryService;
    private final EquipmentService equipmentService;

    public CharacterService(CharacterRepository characterRepository, InventoryService inventoryService, EquipmentService equipmentService) {
        this.characterRepository = characterRepository;
        this.inventoryService = inventoryService;
        this.equipmentService = equipmentService;
    }

    @Transactional
    public Character createCharacter(UUID userId, String name, CharacterClass characterClass) {
        // Create character
        Character character = Character.createNew(userId, name, characterClass);
        Character savedCharacter = characterRepository.save(character);

        // Initialize inventory and equipment for the new character
        inventoryService.createInventory(savedCharacter.getId());
        equipmentService.createEquipment(savedCharacter.getId());

        return savedCharacter;
    }

    public List<Character> getUserCharacters(UUID userId) {
        return characterRepository.findByUserId(userId);
    }

    public Character getCharacter(UUID characterId) {
        return characterRepository.findById(characterId)
                .orElseThrow(() -> new ResourceNotFoundException("Character not found"));
    }

    @Transactional
    public void addExperience(UUID characterId, long exp) {
        Character character = getCharacter(characterId);
        character.addExperience(exp);
        characterRepository.save(character);
    }

    @Transactional
    public void deleteCharacter(UUID characterId, UUID userId) {
        Character character = getCharacter(characterId);
        if (!character.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to delete this character");
        }
        characterRepository.deleteById(characterId);
    }
}
