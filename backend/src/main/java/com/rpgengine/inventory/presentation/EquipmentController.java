package com.rpgengine.inventory.presentation;

import com.rpgengine.character.application.CharacterService;
import com.rpgengine.character.domain.Character;
import com.rpgengine.inventory.application.EquipmentService;
import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.EquipmentSlot;
import com.rpgengine.inventory.presentation.dto.EquipmentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/characters/{characterId}/equipment")
@Tag(name = "Equipment", description = "Equipment management APIs")
public class EquipmentController {

    private final EquipmentService equipmentService;
    private final CharacterService characterService;

    public EquipmentController(EquipmentService equipmentService, CharacterService characterService) {
        this.equipmentService = equipmentService;
        this.characterService = characterService;
    }

    @GetMapping
    @Operation(summary = "Get character equipment")
    public ResponseEntity<EquipmentResponse> getEquipment(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @PathVariable UUID characterId) {
            
        Character character = characterService.getCharacter(characterId);
        if (!character.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Equipment equipment = equipmentService.getEquipmentByCharacterId(characterId);
        return ResponseEntity.ok(EquipmentResponse.fromDomain(equipment));
    }

    @PostMapping("/{slot}/equip/{itemId}")
    @Operation(summary = "Equip an item")
    public ResponseEntity<Void> equipItem(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @PathVariable UUID characterId,
            @PathVariable EquipmentSlot slot,
            @PathVariable UUID itemId) {
            
        Character character = characterService.getCharacter(characterId);
        if (!character.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        equipmentService.equipItem(characterId, itemId, slot);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{slot}/unequip")
    @Operation(summary = "Unequip an item")
    public ResponseEntity<Void> unequipItem(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @PathVariable UUID characterId,
            @PathVariable EquipmentSlot slot) {
            
        Character character = characterService.getCharacter(characterId);
        if (!character.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        equipmentService.unequipItem(characterId, slot);
        return ResponseEntity.ok().build();
    }
}
