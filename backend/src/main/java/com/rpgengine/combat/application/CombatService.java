package com.rpgengine.combat.application;

import com.rpgengine.character.application.CharacterService;
import com.rpgengine.character.domain.Character;
import com.rpgengine.combat.domain.CombatHistory;
import com.rpgengine.combat.domain.LootGenerator;
import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.domain.engine.CombatEngine;
import com.rpgengine.combat.domain.engine.CombatResult;
import com.rpgengine.combat.domain.repository.CombatHistoryRepository;
import com.rpgengine.combat.presentation.dto.CombatResponse;
import com.rpgengine.inventory.application.EquipmentService;
import com.rpgengine.inventory.application.InventoryService;
import com.rpgengine.inventory.domain.Equipment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CombatService {

    private final CharacterService characterService;
    private final EquipmentService equipmentService;
    private final InventoryService inventoryService;
    private final MonsterService monsterService;
    private final CombatHistoryRepository combatHistoryRepository;
    
    private final CombatEngine combatEngine = new CombatEngine();
    private final LootGenerator lootGenerator = new LootGenerator();

    public CombatService(CharacterService characterService, EquipmentService equipmentService, InventoryService inventoryService, MonsterService monsterService, CombatHistoryRepository combatHistoryRepository) {
        this.characterService = characterService;
        this.equipmentService = equipmentService;
        this.inventoryService = inventoryService;
        this.monsterService = monsterService;
        this.combatHistoryRepository = combatHistoryRepository;
    }

    @Transactional
    public CombatResponse fight(UUID characterId, UUID monsterId) {
        Character character = characterService.getCharacter(characterId);
        Equipment equipment = equipmentService.getEquipmentByCharacterId(characterId);
        Monster monster = monsterService.getMonsterById(monsterId);

        // Execute deterministic combat
        CombatResult result = combatEngine.simulate(character, equipment, monster);

        List<UUID> droppedItems = List.of();

        if (result.isVictory()) {
            // Award XP and Gold
            character.addExperience(result.experienceEarned());
            character.setGold(character.getGold() + result.goldEarned());
            
            // Generate Loot and add to inventory
            droppedItems = lootGenerator.generateLoot(monster);
            for (UUID itemId : droppedItems) {
                try {
                    inventoryService.addItem(characterId, itemId, 1);
                } catch (Exception e) {
                    // Inventory might be full, ignore or log for now
                }
            }
        }
        
        // Update character health regardless of victory or defeat
        character.setCurrentHealth(result.finalCharacterHealth());
        characterService.updateCharacter(character);

        // Save history
        CombatHistory history = new CombatHistory(
                UUID.randomUUID(),
                characterId,
                monsterId,
                result.isVictory(),
                result.damageDealt(),
                result.damageTaken(),
                result.goldEarned(),
                result.experienceEarned(),
                LocalDateTime.now()
        );
        combatHistoryRepository.save(history);

        return new CombatResponse(
                result.isVictory(),
                result.damageDealt(),
                result.damageTaken(),
                result.goldEarned(),
                result.experienceEarned(),
                result.log().getEvents(),
                droppedItems
        );
    }

    public List<CombatHistory> getCharacterHistory(UUID characterId) {
        return combatHistoryRepository.findByCharacterId(characterId);
    }
}
