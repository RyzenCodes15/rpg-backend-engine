package com.rpgengine.crafting.application;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.repository.CharacterRepository;
import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.crafting.domain.Recipe;
import com.rpgengine.crafting.domain.RecipeIngredient;
import com.rpgengine.crafting.domain.repository.RecipeRepository;
import com.rpgengine.inventory.application.InventoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class CraftingService {

    private final RecipeRepository recipeRepository;
    private final InventoryService inventoryService;
    private final CharacterRepository characterRepository;

    public CraftingService(RecipeRepository recipeRepository, InventoryService inventoryService, CharacterRepository characterRepository) {
        this.recipeRepository = recipeRepository;
        this.inventoryService = inventoryService;
        this.characterRepository = characterRepository;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public boolean craftItem(UUID characterId, UUID recipeId) {
        Character character = characterRepository.findById(characterId)
                .orElseThrow(() -> new ResourceNotFoundException("Character not found"));

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));

        if (character.getLevel() < recipe.getRequiredLevel()) {
            throw new IllegalArgumentException("Level too low for crafting");
        }

        // Check if all ingredients are available
        for (RecipeIngredient ingredient : recipe.getIngredients()) {
            if (!inventoryService.hasItems(characterId, ingredient.getMaterialItemId(), ingredient.getQuantity())) {
                throw new IllegalArgumentException("Missing required materials");
            }
        }

        // Consume ingredients
        for (RecipeIngredient ingredient : recipe.getIngredients()) {
            inventoryService.consumeItems(characterId, ingredient.getMaterialItemId(), ingredient.getQuantity());
        }

        // Add crafted item
        inventoryService.addItem(characterId, recipe.getCraftedItemId(), 1);

        return true;
    }
}
