package com.rpgengine.crafting.infrastructure.repository;

import com.rpgengine.crafting.infrastructure.entity.RecipeJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpringDataRecipeRepository extends JpaRepository<RecipeJpaEntity, UUID> {
    
    @EntityGraph(attributePaths = {"ingredients"})
    List<RecipeJpaEntity> findAll();
}
