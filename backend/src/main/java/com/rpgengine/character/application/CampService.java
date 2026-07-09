package com.rpgengine.character.application;

import com.rpgengine.character.domain.Character;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class CampService {

    private final CharacterService characterService;

    public CampService(CharacterService characterService) {
        this.characterService = characterService;
    }

    @Transactional
    public Character restAtCamp(UUID characterId) {
        Character character = characterService.getCharacter(characterId);
        
        // Restore HP and Mana to maximum
        character.setCurrentHealth(character.getBaseStats().health());
        character.setCurrentMana(character.getBaseStats().mana());
        
        characterService.updateCharacter(character);
        return character;
    }
}
