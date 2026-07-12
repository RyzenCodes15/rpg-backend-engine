package com.rpgengine.admin.presentation;

import com.rpgengine.admin.application.AdminContentService;
import com.rpgengine.combat.domain.Monster;
import com.rpgengine.common.presentation.dto.ApiResponse;
import com.rpgengine.inventory.domain.Item;
import com.rpgengine.crafting.domain.Recipe;
import com.rpgengine.skill.domain.Skill;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/content")
@Tag(name = "Admin Content", description = "Admin endpoints for game content management")
public class AdminContentController {

    private final AdminContentService adminContentService;

    public AdminContentController(AdminContentService adminContentService) {
        this.adminContentService = adminContentService;
    }

    // --- Items ---

    @GetMapping("/items")
    @Operation(summary = "Get All Items", description = "Retrieves all game items")
    public ResponseEntity<ApiResponse<List<Item>>> getItems() {
        return ResponseEntity.ok(ApiResponse.success(adminContentService.getItems()));
    }

    @PostMapping("/items")
    @Operation(summary = "Create Item", description = "Creates a new item")
    public ResponseEntity<ApiResponse<Item>> createItem(@Valid @RequestBody Item item) {
        Item created = adminContentService.createItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(created));
    }

    @PutMapping("/items/{itemId}")
    @Operation(summary = "Update Item", description = "Updates an existing item")
    public ResponseEntity<ApiResponse<Item>> updateItem(
            @PathVariable UUID itemId,
            @Valid @RequestBody Item item) {
        Item updated = adminContentService.updateItem(itemId, item);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/items/{itemId}")
    @Operation(summary = "Delete Item", description = "Deletes an existing item")
    public ResponseEntity<ApiResponse<Void>> deleteItem(@PathVariable UUID itemId) {
        adminContentService.deleteItem(itemId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // --- Monsters ---

    @GetMapping("/monsters")
    @Operation(summary = "Get All Monsters", description = "Retrieves all monsters")
    public ResponseEntity<ApiResponse<List<Monster>>> getMonsters() {
        return ResponseEntity.ok(ApiResponse.success(adminContentService.getMonsters()));
    }

    @PostMapping("/monsters")
    @Operation(summary = "Create Monster", description = "Creates a new monster")
    public ResponseEntity<ApiResponse<Monster>> createMonster(@Valid @RequestBody Monster monster) {
        Monster created = adminContentService.createMonster(monster);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(created));
    }

    @PutMapping("/monsters/{monsterId}")
    @Operation(summary = "Update Monster", description = "Updates an existing monster")
    public ResponseEntity<ApiResponse<Monster>> updateMonster(
            @PathVariable UUID monsterId,
            @Valid @RequestBody Monster monster) {
        Monster updated = adminContentService.updateMonster(monsterId, monster);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/monsters/{monsterId}")
    @Operation(summary = "Delete Monster", description = "Deletes an existing monster")
    public ResponseEntity<ApiResponse<Void>> deleteMonster(@PathVariable UUID monsterId) {
        adminContentService.deleteMonster(monsterId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // --- Skills ---

    @GetMapping("/skills")
    @Operation(summary = "Get All Skills", description = "Retrieves all game skills")
    public ResponseEntity<ApiResponse<List<Skill>>> getSkills() {
        return ResponseEntity.ok(ApiResponse.success(adminContentService.getSkills()));
    }

    @PostMapping("/skills")
    @Operation(summary = "Create Skill", description = "Creates a new skill")
    public ResponseEntity<ApiResponse<Skill>> createSkill(@Valid @RequestBody Skill skill) {
        Skill created = adminContentService.createSkill(skill);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(created));
    }

    @PutMapping("/skills/{skillId}")
    @Operation(summary = "Update Skill", description = "Updates an existing skill")
    public ResponseEntity<ApiResponse<Skill>> updateSkill(
            @PathVariable UUID skillId,
            @Valid @RequestBody Skill skill) {
        Skill updated = adminContentService.updateSkill(skillId, skill);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/skills/{skillId}")
    @Operation(summary = "Delete Skill", description = "Deletes an existing skill")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable UUID skillId) {
        adminContentService.deleteSkill(skillId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // --- Recipes ---

    @GetMapping("/recipes")
    @Operation(summary = "Get All Recipes", description = "Retrieves all game recipes")
    public ResponseEntity<ApiResponse<List<Recipe>>> getRecipes() {
        return ResponseEntity.ok(ApiResponse.success(adminContentService.getRecipes()));
    }

    @PostMapping("/recipes")
    @Operation(summary = "Create Recipe", description = "Creates a new recipe")
    public ResponseEntity<ApiResponse<Recipe>> createRecipe(@Valid @RequestBody Recipe recipe) {
        Recipe created = adminContentService.createRecipe(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(created));
    }

    @PutMapping("/recipes/{recipeId}")
    @Operation(summary = "Update Recipe", description = "Updates an existing recipe")
    public ResponseEntity<ApiResponse<Recipe>> updateRecipe(
            @PathVariable UUID recipeId,
            @Valid @RequestBody Recipe recipe) {
        Recipe updated = adminContentService.updateRecipe(recipeId, recipe);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/recipes/{recipeId}")
    @Operation(summary = "Delete Recipe", description = "Deletes an existing recipe")
    public ResponseEntity<ApiResponse<Void>> deleteRecipe(@PathVariable UUID recipeId) {
        adminContentService.deleteRecipe(recipeId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
