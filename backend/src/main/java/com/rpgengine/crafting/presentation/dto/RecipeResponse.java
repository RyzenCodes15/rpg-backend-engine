package com.rpgengine.crafting.presentation.dto;

import java.util.List;
import java.util.UUID;

public record RecipeResponse(
        UUID id,
        String name,
        String description,
        UUID craftedItemId,
        String craftedItemName,
        int requiredLevel,
        List<RecipeIngredientResponse> ingredients
) {}
