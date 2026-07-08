package com.rpgengine.inventory.presentation;

import com.rpgengine.character.application.CharacterService;
import com.rpgengine.character.domain.Character;
import com.rpgengine.inventory.application.InventoryService;
import com.rpgengine.inventory.domain.Inventory;
import com.rpgengine.inventory.presentation.dto.InventoryResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/characters/{characterId}/inventory")
@Tag(name = "Inventory", description = "Inventory management APIs")
public class InventoryController {

    private final InventoryService inventoryService;
    private final CharacterService characterService;

    public InventoryController(InventoryService inventoryService, CharacterService characterService) {
        this.inventoryService = inventoryService;
        this.characterService = characterService;
    }

    @GetMapping
    @Operation(summary = "Get character inventory")
    public ResponseEntity<InventoryResponse> getInventory(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @PathVariable UUID characterId) {
            
        // Check authorization
        Character character = characterService.getCharacter(characterId);
        if (!character.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Inventory inventory = inventoryService.getInventoryByCharacterId(characterId);
        return ResponseEntity.ok(InventoryResponse.fromDomain(inventory));
    }

    @PostMapping("/items/{itemId}")
    @Operation(summary = "Add an item to the inventory (Development/Testing)")
    public ResponseEntity<Void> addItem(
            @AuthenticationPrincipal(expression = "id") UUID userId,
            @PathVariable UUID characterId,
            @PathVariable UUID itemId,
            @RequestParam(defaultValue = "1") int quantity) {
            
        Character character = characterService.getCharacter(characterId);
        if (!character.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        inventoryService.addItem(characterId, itemId, quantity);
        return ResponseEntity.ok().build();
    }
}
