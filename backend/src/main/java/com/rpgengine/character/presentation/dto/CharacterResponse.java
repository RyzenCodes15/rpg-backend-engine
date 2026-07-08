package com.rpgengine.character.presentation.dto;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.CharacterClass;
import com.rpgengine.character.domain.CharacterStats;
import java.util.UUID;

public record CharacterResponse(
        UUID id,
        String name,
        CharacterClass characterClass,
        int level,
        long experience,
        long gold,
        CharacterStats baseStats
) {
    public static CharacterResponse fromDomain(Character character) {
        return new CharacterResponse(
                character.getId(),
                character.getName(),
                character.getCharacterClass(),
                character.getLevel(),
                character.getExperience(),
                character.getGold(),
                character.getBaseStats()
        );
    }
}
