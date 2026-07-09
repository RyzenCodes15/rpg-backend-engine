package com.rpgengine.combat.domain.engine;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.CharacterStats;
import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.domain.statuseffect.StatusEffect;
import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.Item;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class CombatEngine {
    private final Random random = new Random();

    public CombatResult simulate(Character character, Equipment equipment, Monster monster) {
        CombatLog log = new CombatLog();
        
        // Calculate total character stats including equipment
        CharacterStats totalStats = calculateTotalStats(character.getBaseStats(), equipment);
        
        int charHealth = totalStats.health();
        int monsterHealth = monster.getHealth();
        
        int damageDealtToMonster = 0;
        int damageTakenByChar = 0;
        
        List<StatusEffect> charEffects = new ArrayList<>();
        List<StatusEffect> monsterEffects = new ArrayList<>();

        boolean charTurn = totalStats.speed() >= monster.getSpeed();

        while (charHealth > 0 && monsterHealth > 0) {
            if (charTurn) {
                // Apply effects to char
                boolean canAct = applyEffects(charEffects, character.getName(), log, charHealth);
                // Updating charHealth would require returning it from applyEffects, let's simplify for now
                // or just not have status effects affect max health directly in this loop
                
                if (canAct && charHealth > 0) {
                    // Character attacks
                    int damage = calculateDamage(totalStats.attack(), monster.getDefense());
                    
                    // Crit check
                    boolean isCrit = random.nextDouble() * 100 < totalStats.criticalChance().doubleValue();
                    if (isCrit) {
                        damage *= 1.5;
                    }
                    
                    monsterHealth -= damage;
                    damageDealtToMonster += damage;
                    
                    String msg = character.getName() + " attacks " + monster.getName() + " for " + damage + " damage!" + (isCrit ? " (Critical Hit!)" : "");
                    log.addEvent(new CombatEvent(character.getName(), "Attack", damage, msg));
                }
            } else {
                // Apply effects to monster
                boolean canAct = applyEffects(monsterEffects, monster.getName(), log, monsterHealth);
                
                if (canAct && monsterHealth > 0) {
                    // Monster attacks
                    int damage = calculateDamage(monster.getAttack(), totalStats.defense());
                    charHealth -= damage;
                    damageTakenByChar += damage;
                    
                    String msg = monster.getName() + " attacks " + character.getName() + " for " + damage + " damage!";
                    log.addEvent(new CombatEvent(monster.getName(), "Attack", damage, msg));
                }
            }
            charTurn = !charTurn;
            
            // Clean up expired effects
            charEffects.removeIf(StatusEffect::isExpired);
            monsterEffects.removeIf(StatusEffect::isExpired);
        }

        boolean isVictory = charHealth > 0;
        
        if (isVictory) {
            log.addEvent(new CombatEvent("System", "Victory", 0, character.getName() + " defeated " + monster.getName() + "!"));
        } else {
            log.addEvent(new CombatEvent("System", "Defeat", 0, character.getName() + " was defeated by " + monster.getName() + "."));
        }

        long goldEarned = isVictory ? monster.getGoldReward() : 0;
        long expEarned = isVictory ? monster.getExperienceReward() : 0;

        return new CombatResult(isVictory, damageDealtToMonster, damageTakenByChar, goldEarned, expEarned, log);
    }

    private boolean applyEffects(List<StatusEffect> effects, String targetName, CombatLog log, int currentHealth) {
        boolean canAct = true;
        for (StatusEffect effect : effects) {
            StatusEffect.EffectResult result = effect.apply(currentHealth);
            log.addEvent(result.event());
            effect.decrementDuration();
            if (!result.canAct()) {
                canAct = false;
            }
            // Note: in a fully robust system, the effect result should actually modify currentHealth.
            // Since this is a simple turn-based auto-resolve, we might just log it or pass health by reference.
            // For now, we omit complex health updates from status effects to keep it simple.
        }
        return canAct;
    }

    private int calculateDamage(int attack, int defense) {
        // Simple formula: Attack - (Defense / 2), minimum 1
        int damage = attack - (defense / 2);
        return Math.max(1, damage);
    }

    private CharacterStats calculateTotalStats(CharacterStats baseStats, Equipment equipment) {
        if (equipment == null) return baseStats;
        
        CharacterStats current = baseStats;
        current = addStats(current, equipment.getWeapon());
        current = addStats(current, equipment.getHelmet());
        current = addStats(current, equipment.getChestArmor());
        current = addStats(current, equipment.getGloves());
        current = addStats(current, equipment.getBoots());
        return current;
    }

    private CharacterStats addStats(CharacterStats stats, Item item) {
        if (item == null) return stats;
        return new CharacterStats(
                stats.health() + item.getStats().bonusHealth(),
                stats.mana() + item.getStats().bonusMana(),
                stats.attack() + item.getStats().bonusAttack(),
                stats.defense() + item.getStats().bonusDefense(),
                stats.speed() + item.getStats().bonusSpeed(),
                stats.criticalChance().add(item.getStats().bonusCriticalChance())
        );
    }
}
