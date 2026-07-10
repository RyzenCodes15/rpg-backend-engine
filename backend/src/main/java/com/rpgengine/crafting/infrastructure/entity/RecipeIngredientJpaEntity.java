package com.rpgengine.crafting.infrastructure.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "recipe_ingredients")
public class RecipeIngredientJpaEntity {
    @Id
    private UUID id;

    @Column(name = "recipe_id", nullable = false)
    private UUID recipeId;

    @Column(name = "material_item_id", nullable = false)
    private UUID materialItemId;

    @Column(nullable = false)
    private int quantity;

    public RecipeIngredientJpaEntity() {}

    public RecipeIngredientJpaEntity(UUID id, UUID recipeId, UUID materialItemId, int quantity) {
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
