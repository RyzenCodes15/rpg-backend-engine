package com.rpgengine.crafting.infrastructure.repository;

import com.rpgengine.crafting.domain.Recipe;
import com.rpgengine.crafting.domain.RecipeIngredient;
import com.rpgengine.crafting.domain.repository.RecipeRepository;
import com.rpgengine.crafting.infrastructure.entity.RecipeJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class RecipeRepositoryImpl implements RecipeRepository {

    private final SpringDataRecipeRepository springDataRecipeRepository;

    public RecipeRepositoryImpl(SpringDataRecipeRepository springDataRecipeRepository) {
        this.springDataRecipeRepository = springDataRecipeRepository;
    }

    @Override
    public Optional<Recipe> findById(UUID id) {
        return springDataRecipeRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Recipe> findAll() {
        return springDataRecipeRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    private Recipe toDomain(RecipeJpaEntity entity) {
        List<RecipeIngredient> ingredients = entity.getIngredients().stream()
                .map(i -> new RecipeIngredient(
                        i.getId(),
                        i.getRecipeId(),
                        i.getMaterialItemId(),
                        i.getQuantity()
                ))
                .collect(Collectors.toList());

        return new Recipe(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getCraftedItemId(),
                entity.getRequiredLevel(),
                ingredients
        );
    }
}
