package com.rpgengine.character.application;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.CharacterClass;
import com.rpgengine.character.domain.repository.CharacterRepository;
import com.rpgengine.inventory.application.EquipmentService;
import com.rpgengine.inventory.application.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CharacterServiceTest {

    @Mock
    private CharacterRepository characterRepository;
    @Mock
    private InventoryService inventoryService;
    @Mock
    private EquipmentService equipmentService;

    private CharacterService characterService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        characterService = new CharacterService(characterRepository, inventoryService, equipmentService);
    }

    @Test
    void createCharacter_ShouldInitializeCorrectly() {
        UUID userId = UUID.randomUUID();
        String name = "Hero";
        
        when(characterRepository.save(any(Character.class))).thenAnswer(i -> {
            Character c = i.getArgument(0);
            c.setId(UUID.randomUUID());
            return c;
        });

        Character result = characterService.createCharacter(userId, name, CharacterClass.WARRIOR);

        assertNotNull(result);
        assertEquals(name, result.getName());
        assertEquals(CharacterClass.WARRIOR, result.getCharacterClass());
        assertEquals(1, result.getLevel());
        
        verify(characterRepository).save(any(Character.class));
        verify(inventoryService).createInventory(result.getId());
        verify(equipmentService).createEquipment(result.getId());
    }

    @Test
    void addExperience_ShouldLevelUp() {
        UUID characterId = UUID.randomUUID();
        Character character = Character.createNew(UUID.randomUUID(), "Hero", CharacterClass.WARRIOR);
        character.setId(characterId);
        
        when(characterRepository.findById(characterId)).thenReturn(java.util.Optional.of(character));
        
        // Add exactly 1000 exp (enough for level 2, since requirement is level*1000)
        characterService.addExperience(characterId, 1000);
        
        assertEquals(2, character.getLevel());
        assertEquals(0, character.getExperience()); // (1000 - 1000)
        
        // Add 2500 exp (req for level 2 -> 3 is 2000, 500 remainder)
        characterService.addExperience(characterId, 2500);
        
        assertEquals(3, character.getLevel());
        assertEquals(500, character.getExperience());
        
        verify(characterRepository, times(2)).save(character);
    }
}
