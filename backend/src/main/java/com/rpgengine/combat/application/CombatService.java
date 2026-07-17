package com.rpgengine.combat.application;

import com.rpgengine.character.application.CharacterService;
import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.CharacterStats;
import com.rpgengine.character.domain.CharacterStatsCalculator;
import com.rpgengine.combat.domain.CombatHistory;
import com.rpgengine.combat.domain.LootGenerator;
import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.domain.engine.CombatEngine;
import com.rpgengine.combat.domain.engine.CombatSession;
import com.rpgengine.combat.domain.engine.CombatTurnResult;
import com.rpgengine.combat.domain.repository.CombatHistoryRepository;
import com.rpgengine.combat.domain.repository.CombatSessionRepository;
import com.rpgengine.combat.presentation.dto.CombatResponse;
import com.rpgengine.common.exception.ResourceNotFoundException;
import com.rpgengine.inventory.application.EquipmentService;
import com.rpgengine.inventory.application.InventoryService;
import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.Item;
import com.rpgengine.inventory.domain.repository.ItemRepository;
import com.rpgengine.skill.domain.Skill;
import com.rpgengine.skill.domain.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CombatService {

    private final CharacterService characterService;
    private final EquipmentService equipmentService;
    private final InventoryService inventoryService;
    private final MonsterService monsterService;
    private final CombatHistoryRepository combatHistoryRepository;
    private final CombatSessionRepository combatSessionRepository;
    private final SkillRepository skillRepository;
    private final ItemRepository itemRepository;
    
    private final CombatEngine combatEngine = new CombatEngine();
    private final LootGenerator lootGenerator = new LootGenerator();

    public CombatService(CharacterService characterService, EquipmentService equipmentService, InventoryService inventoryService, MonsterService monsterService, CombatHistoryRepository combatHistoryRepository, CombatSessionRepository combatSessionRepository, SkillRepository skillRepository, ItemRepository itemRepository) {
        this.characterService = characterService;
        this.equipmentService = equipmentService;
        this.inventoryService = inventoryService;
        this.monsterService = monsterService;
        this.combatHistoryRepository = combatHistoryRepository;
        this.combatSessionRepository = combatSessionRepository;
        this.skillRepository = skillRepository;
        this.itemRepository = itemRepository;
    }

    @Transactional
    public CombatSession startCombat(UUID characterId, UUID monsterId) {
        // End ALL existing active sessions for this character to prevent duplicate session errors
        List<CombatSession> existingSessions = combatSessionRepository.findAllActiveSessionsByCharacterId(characterId);
        for (CombatSession existing : existingSessions) {
            existing.setActive(false);
            combatSessionRepository.save(existing);
        }

        Character character = characterService.getCharacter(characterId);
        if (character.getCurrentHealth() <= 0) {
            Equipment equipment = equipmentService.getEquipmentByCharacterId(characterId);
            CharacterStats totalStats = CharacterStatsCalculator.calculateTotalStats(character.getBaseStats(), equipment);
            character.setCurrentHealth(totalStats.health());
            character.setCurrentMana(totalStats.mana());
            characterService.updateCharacter(character);
        }

        Monster monster = monsterService.getMonsterById(monsterId);

        CombatSession session = new CombatSession(
                UUID.randomUUID(),
                characterId,
                monsterId,
                true,
                character.getCurrentHealth(),
                character.getCurrentMana(),
                monster.getHealth(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                new HashMap<>()
        );
        
        combatSessionRepository.save(session);
        return session;
    }

    public CombatSession getActiveSession(UUID characterId) {
        return combatSessionRepository.findActiveSessionByCharacterId(characterId)
                .orElseThrow(() -> new ResourceNotFoundException("No active combat session found"));
    }

    @Transactional
    public CombatResponse executeTurn(UUID characterId, UUID skillId) {
        CombatSession session = getActiveSession(characterId);
        Character character = characterService.getCharacter(characterId);
        Equipment equipment = equipmentService.getEquipmentByCharacterId(characterId);
        Monster monster = monsterService.getMonsterById(session.getMonsterId());

        Skill skill = null;
        if (skillId != null) {
            skill = skillRepository.findById(skillId).orElseThrow(() -> new ResourceNotFoundException("Skill not found"));
        }

        CombatTurnResult result = combatEngine.processTurn(session, character, equipment, monster, skill);
        session.setUpdatedAt(LocalDateTime.now());
        combatSessionRepository.save(session);

        List<UUID> droppedItems = List.of();

        if (result.isFinished()) {
            if (result.isVictory()) {
                character.addExperience(result.expEarned());
                character.setGold(character.getGold() + result.goldEarned());
                
                droppedItems = lootGenerator.generateLoot(monster);
                for (UUID itemId : droppedItems) {
                    try {
                        inventoryService.addItem(characterId, itemId, 1);
                    } catch (Exception e) {
                        // ignore full inventory
                    }
                }
            }
            
            character.setCurrentHealth(result.charHealthRemaining());
            character.setCurrentMana(result.charManaRemaining());
            characterService.updateCharacter(character);

            CombatHistory history = new CombatHistory(
                    UUID.randomUUID(),
                    characterId,
                    monster.getId(),
                    result.isVictory(),
                    result.damageDealt(),
                    result.damageTaken(),
                    result.goldEarned(),
                    result.expEarned(),
                    LocalDateTime.now()
            );
            combatHistoryRepository.save(history);
        } else {
            // just update health and mana
            character.setCurrentHealth(result.charHealthRemaining());
            character.setCurrentMana(result.charManaRemaining());
            characterService.updateCharacter(character);
        }

        List<String> droppedItemNames = droppedItems.stream()
                .map(id -> itemRepository.findById(id).map(Item::getName).orElse("Unknown Item"))
                .collect(Collectors.toList());

        return new CombatResponse(
                result.isVictory(),
                result.damageDealt(),
                result.damageTaken(),
                result.goldEarned(),
                result.expEarned(),
                result.log().getEvents(),
                droppedItemNames
        );
    }

    public List<CombatHistory> getCharacterHistory(UUID characterId) {
        return combatHistoryRepository.findByCharacterId(characterId);
    }
}
