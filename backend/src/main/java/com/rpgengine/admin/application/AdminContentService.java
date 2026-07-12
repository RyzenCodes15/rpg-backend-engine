package com.rpgengine.admin.application;

import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.domain.repository.MonsterRepository;
import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.repository.ItemRepository;
import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.crafting.domain.Recipe;
import com.rpgengine.crafting.domain.repository.RecipeRepository;
import com.rpgengine.skill.domain.Skill;
import com.rpgengine.skill.domain.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class AdminContentService {

    private final ItemRepository itemRepository;
    private final MonsterRepository monsterRepository;
    private final SkillRepository skillRepository;
    private final RecipeRepository recipeRepository;

    public AdminContentService(
            ItemRepository itemRepository, 
            MonsterRepository monsterRepository,
            SkillRepository skillRepository,
            RecipeRepository recipeRepository) {
        this.itemRepository = itemRepository;
        this.monsterRepository = monsterRepository;
        this.skillRepository = skillRepository;
        this.recipeRepository = recipeRepository;
    }

    @Transactional(readOnly = true)
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Item updateItem(UUID itemId, Item item) {
        if (itemRepository.findById(itemId).isEmpty()) {
            throw new ResourceNotFoundException("Item not found");
        }
        item.setId(itemId);
        return itemRepository.save(item);
    }

    public void deleteItem(UUID itemId) {
        itemRepository.deleteById(itemId);
    }

    @Transactional(readOnly = true)
    public List<Monster> getMonsters() {
        return monsterRepository.findAll();
    }

    public Monster createMonster(Monster monster) {
        return monsterRepository.save(monster);
    }

    public Monster updateMonster(UUID monsterId, Monster monster) {
        if (monsterRepository.findById(monsterId).isEmpty()) {
            throw new ResourceNotFoundException("Monster not found");
        }
        // Domain model is immutable mostly, so we might need to recreate it with the existing ID.
        // But since we are passing it in, we just set the ID and save. 
        // Wait, Monster is a record/class? Let's check if Monster is a class.
        // It's a class with getters, maybe it has setters, or we can use constructor.
        Monster updated = new Monster(
                monsterId,
                monster.getName(),
                monster.getDescription(),
                monster.getLevel(),
                monster.getHealth(),
                monster.getAttack(),
                monster.getDefense(),
                monster.getSpeed(),
                monster.getGoldReward(),
                monster.getExperienceReward(),
                monster.getLootTable()
        );
        return monsterRepository.save(updated);
    }

    public void deleteMonster(UUID monsterId) {
        monsterRepository.deleteById(monsterId);
    }

    // --- Skills ---

    @Transactional(readOnly = true)
    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }

    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill updateSkill(UUID skillId, Skill skill) {
        if (skillRepository.findById(skillId).isEmpty()) {
            throw new ResourceNotFoundException("Skill not found");
        }
        Skill updated = new Skill(
                skillId,
                skill.getName(),
                skill.getDescription(),
                skill.getClassRestriction(),
                skill.getRequiredLevel(),
                skill.getManaCost(),
                skill.getCooldown(),
                skill.getBaseDamage(),
                skill.getSkillType(),
                skill.getElement(),
                skill.getIcon(),
                skill.getAnimationName(),
                skill.getStatusEffectType()
        );
        return skillRepository.save(updated);
    }

    public void deleteSkill(UUID skillId) {
        skillRepository.deleteById(skillId);
    }

    // --- Recipes ---

    @Transactional(readOnly = true)
    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(UUID recipeId, Recipe recipe) {
        if (recipeRepository.findById(recipeId).isEmpty()) {
            throw new ResourceNotFoundException("Recipe not found");
        }
        Recipe updated = new Recipe(
                recipeId,
                recipe.getName(),
                recipe.getDescription(),
                recipe.getCraftedItemId(),
                recipe.getRequiredLevel(),
                recipe.getIngredients()
        );
        return recipeRepository.save(updated);
    }

    public void deleteRecipe(UUID recipeId) {
        recipeRepository.deleteById(recipeId);
    }
}
