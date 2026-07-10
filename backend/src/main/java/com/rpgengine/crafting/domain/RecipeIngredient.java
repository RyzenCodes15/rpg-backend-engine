package com.rpgengine.crafting.domain;

import java.util.UUID;

public class RecipeIngredient {
    private UUID id;
    private UUID recipeId;
    private UUID materialItemId;
    private int quantity;

    public RecipeIngredient(UUID id, UUID recipeId, UUID materialItemId, int quantity) {
        this.id = id;
        this.recipeId = recipeId;
        this.materialItemId = materialItemId;
        this.quantity = quantity;
    }

    public UUID getId() { return id; }
    public UUID getRecipeId() { return recipeId; }
    public UUID getMaterialItemId() { return materialItemId; }
    public int getQuantity() { return quantity; }
}
