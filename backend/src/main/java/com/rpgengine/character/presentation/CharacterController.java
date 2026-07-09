package com.rpgengine.character.presentation;

import com.rpgengine.character.application.CharacterService;
import com.rpgengine.character.domain.Character;
import com.rpgengine.character.presentation.dto.CharacterResponse;
import com.rpgengine.character.presentation.dto.CreateCharacterRequest;
import com.rpgengine.inventory.application.EquipmentService;
import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.character.domain.CharacterStatsCalculator;
import com.rpgengine.character.domain.CharacterStats;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/characters")
@Tag(name = "Characters", description = "Character management APIs")
public class CharacterController {

    private final CharacterService characterService;
    private final EquipmentService equipmentService;

    public CharacterController(CharacterService characterService, EquipmentService equipmentService) {
        this.characterService = characterService;
        this.equipmentService = equipmentService;
    }

    @PostMapping
    @Operation(summary = "Create a new character")
    public ResponseEntity<CharacterResponse> createCharacter(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @Valid @RequestBody CreateCharacterRequest request) {
        
        Character character = characterService.createCharacter(userId, request.name(), request.characterClass());
        Equipment equipment = equipmentService.getEquipmentByCharacterId(character.getId());
        CharacterStats totalStats = CharacterStatsCalculator.calculateTotalStats(character.getBaseStats(), equipment);
        return ResponseEntity.status(HttpStatus.CREATED).body(CharacterResponse.fromDomain(character, totalStats));
    }

    @GetMapping
    @Operation(summary = "Get all characters for the authenticated user")
    public ResponseEntity<List<CharacterResponse>> getUserCharacters(@AuthenticationPrincipal(expression = "id") UUID userId) {
        List<CharacterResponse> characters = characterService.getUserCharacters(userId).stream()
                .map(character -> {
                    Equipment equipment = equipmentService.getEquipmentByCharacterId(character.getId());
                    CharacterStats totalStats = CharacterStatsCalculator.calculateTotalStats(character.getBaseStats(), equipment);
                    return CharacterResponse.fromDomain(character, totalStats);
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(characters);
    }

    @GetMapping("/{characterId}")
    @Operation(summary = "Get character details")
    public ResponseEntity<CharacterResponse> getCharacter(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @PathVariable UUID characterId) {
        
        Character character = characterService.getCharacter(characterId);
        if (!character.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Equipment equipment = equipmentService.getEquipmentByCharacterId(characterId);
        CharacterStats totalStats = CharacterStatsCalculator.calculateTotalStats(character.getBaseStats(), equipment);
        return ResponseEntity.ok(CharacterResponse.fromDomain(character, totalStats));
    }

    @DeleteMapping("/{characterId}")
    @Operation(summary = "Delete a character")
    public ResponseEntity<Void> deleteCharacter(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @PathVariable UUID characterId) {
        
        characterService.deleteCharacter(characterId, userId);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{characterId}/exp")
    @Operation(summary = "Add experience to a character (Development/Testing)")
    public ResponseEntity<Void> addExperience(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @PathVariable UUID characterId,
            @RequestParam long amount) {
        
        Character character = characterService.getCharacter(characterId);
        if (!character.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        characterService.addExperience(characterId, amount);
        return ResponseEntity.ok().build();
    }
}
