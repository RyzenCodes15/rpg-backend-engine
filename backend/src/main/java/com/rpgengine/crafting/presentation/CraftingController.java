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
import com.rpgengine.inventory.domain.repository.ItemRepository;
import com.rpgengine.inventory.domain.Item;

@RestController
@RequestMapping("/api/v1/crafting")
@Tag(name = "Crafting", description = "Endpoints for crafting items")
public class CraftingController {

    private final CraftingService craftingService;
    private final ItemRepository itemRepository;

    public CraftingController(CraftingService craftingService, ItemRepository itemRepository) {
        this.craftingService = craftingService;
        this.itemRepository = itemRepository;
    }

    @GetMapping("/recipes")
    @Operation(summary = "Get All Recipes", description = "Retrieves a list of all available recipes.")
    public ResponseEntity<List<RecipeResponse>> getAllRecipes() {
        List<RecipeResponse> responses = craftingService.getAllRecipes().stream()
                .map(r -> {
                    String craftedItemName = itemRepository.findById(r.getCraftedItemId())
                            .map(Item::getName).orElse("Unknown Item");
                    
                    return new RecipeResponse(
                            r.getId(),
                            r.getName(),
                            r.getDescription(),
                            r.getCraftedItemId(),
                            craftedItemName,
                            r.getRequiredLevel(),
                            r.getIngredients().stream()
                                    .map(i -> {
                                        String matName = itemRepository.findById(i.getMaterialItemId())
                                                .map(Item::getName).orElse("Unknown Material");
                                        return new RecipeIngredientResponse(i.getMaterialItemId(), matName, i.getQuantity());
                                    })
                                    .collect(Collectors.toList())
                    );
                })
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
