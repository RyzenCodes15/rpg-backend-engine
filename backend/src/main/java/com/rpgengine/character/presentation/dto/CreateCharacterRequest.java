package com.rpgengine.character.presentation.dto;

import com.rpgengine.character.domain.CharacterClass;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCharacterRequest(
        @NotBlank(message = "Character name is required")
        String name,
        
        @NotNull(message = "Character class is required")
        CharacterClass characterClass
) {}
