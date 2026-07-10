package com.rpgengine.crafting.infrastructure.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "recipes")
public class RecipeJpaEntity {
    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "crafted_item_id", nullable = false)
    private UUID craftedItemId;

    @Column(name = "required_level", nullable = false)
    private int requiredLevel;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "recipe_id")
    private List<RecipeIngredientJpaEntity> ingredients;

    public RecipeJpaEntity() {}

    public RecipeJpaEntity(UUID id, String name, String description, UUID craftedItemId, int requiredLevel, List<RecipeIngredientJpaEntity> ingredients) {
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
    public List<RecipeIngredientJpaEntity> getIngredients() { return ingredients; }
}
