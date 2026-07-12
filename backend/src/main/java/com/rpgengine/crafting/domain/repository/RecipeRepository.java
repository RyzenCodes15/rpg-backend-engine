package com.rpgengine.crafting.domain.repository;

import com.rpgengine.crafting.domain.Recipe;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecipeRepository {
    Optional<Recipe> findById(UUID id);
    List<Recipe> findAll();
    Recipe save(Recipe recipe);
    void deleteById(UUID id);
}
