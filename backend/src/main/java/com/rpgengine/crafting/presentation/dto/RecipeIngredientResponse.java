package com.rpgengine.crafting.presentation.dto;

import java.util.UUID;

public record RecipeIngredientResponse(
        UUID materialItemId,
        int quantity
) {}
