package com.rpgengine.crafting.presentation;

import com.rpgengine.crafting.application.CraftingService;
import com.rpgengine.crafting.presentation.dto.RecipeIngredientResponse;
import com.rpgengine.crafting.presentation.dto.RecipeResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/crafting")
@Tag(name = "Crafting", description = "Endpoints for crafting items")
public class CraftingController {

    private final CraftingService craftingService;

    public CraftingController(CraftingService craftingService) {
        this.craftingService = craftingService;
    }

    @GetMapping("/recipes")
    @Operation(summary = "Get All Recipes", description = "Retrieves a list of all available recipes.")
    public ResponseEntity<List<RecipeResponse>> getAllRecipes() {
        List<RecipeResponse> responses = craftingService.getAllRecipes().stream()
                .map(r -> new RecipeResponse(
                        r.getId(),
                        r.getName(),
                        r.getDescription(),
                        r.getCraftedItemId(),
                        r.getRequiredLevel(),
                        r.getIngredients().stream()
                                .map(i -> new RecipeIngredientResponse(i.getMaterialItemId(), i.getQuantity()))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/{characterId}/craft/{recipeId}")
    @Operation(summary = "Craft an Item", description = "Attempts to craft an item for a character using a specific recipe.")
    public ResponseEntity<String> craftItem(
            @PathVariable UUID characterId,
            @PathVariable UUID recipeId) {
        boolean success = craftingService.craftItem(characterId, recipeId);
        if (success) {
            return ResponseEntity.ok("Successfully crafted item!");
        } else {
            return ResponseEntity.badRequest().body("Failed to craft item.");
        }
    }
}
