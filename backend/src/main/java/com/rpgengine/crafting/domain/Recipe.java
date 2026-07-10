package com.rpgengine.crafting.domain;

import java.util.List;
import java.util.UUID;

public class Recipe {
    private UUID id;
    private String name;
    private String description;
    private UUID craftedItemId;
    private int requiredLevel;
    private List<RecipeIngredient> ingredients;

    public Recipe(UUID id, String name, String description, UUID craftedItemId, int requiredLevel, List<RecipeIngredient> ingredients) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.craftedItemId = craftedItemId;
        this.requiredLevel = requiredLevel;
        this.ingredients = ingredients;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public UUID getCraftedItemId() { return craftedItemId; }
    public int getRequiredLevel() { return requiredLevel; }
    public List<RecipeIngredient> getIngredients() { return ingredients; }
}
