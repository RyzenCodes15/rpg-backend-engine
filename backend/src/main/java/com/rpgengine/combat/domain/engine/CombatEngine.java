package com.rpgengine.combat.domain.engine;

import com.rpgengine.character.domain.Character;
import com.rpgengine.character.domain.CharacterStats;
import com.rpgengine.combat.domain.Monster;
import com.rpgengine.combat.domain.statuseffect.StatusEffect;
import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.inventory.domain.Equipment;
import com.rpgengine.character.domain.CharacterStatsCalculator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class CombatEngine {
    private final Random random = new Random();

    public CombatTurnResult processTurn(CombatSession session, Character character, Equipment equipment, Monster monster, com.rpgengine.skill.domain.Skill chosenSkill) {
        CombatLog log = new CombatLog();
        CharacterStats totalStats = CharacterStatsCalculator.calculateTotalStats(character.getBaseStats(), equipment);
        
        int charHealth = session.getCharacterHp();
        int monsterHealth = session.getMonsterHp();
        int charMana = session.getCharacterMana();

        int damageDealtToMonster = 0;
        int damageTakenByChar = 0;

        // Player Turn
        if (charHealth > 0) {
            if (chosenSkill != null) {
                if (charMana < chosenSkill.getManaCost()) {
                    log.addEvent(new CombatEvent(character.getName(), "Error", 0, "Not enough mana!"));
                } else if (session.isSkillOnCooldown(chosenSkill.getId())) {
                    log.addEvent(new CombatEvent(character.getName(), "Error", 0, "Skill is on cooldown!"));
                } else {
                    charMana -= chosenSkill.getManaCost();
                    session.setCooldown(chosenSkill.getId(), chosenSkill.getCooldown());
                    
                    int damage = calculateDamage(totalStats.attack() + chosenSkill.getBaseDamage(), monster.getDefense());
                    monsterHealth -= damage;
                    damageDealtToMonster += damage;
                    
                    String msg = character.getName() + " uses " + chosenSkill.getName() + " on " + monster.getName() + " for " + damage + " damage!";
                    log.addEvent(new CombatEvent(character.getName(), chosenSkill.getName(), damage, msg));
                }
            } else {
                // Basic Attack
                int damage = calculateDamage(totalStats.attack(), monster.getDefense());
                boolean isCrit = random.nextDouble() * 100 < totalStats.criticalChance().doubleValue();
                if (isCrit) { damage *= 1.5; }
                
                monsterHealth -= damage;
                damageDealtToMonster += damage;
                
                String msg = character.getName() + " attacks " + monster.getName() + " for " + damage + " damage!" + (isCrit ? " (Critical Hit!)" : "");
                log.addEvent(new CombatEvent(character.getName(), "Attack", damage, msg));
            }
        }

        // Monster Turn
        if (monsterHealth > 0 && damageDealtToMonster >= 0 /* ensures they didn't just fail to act */) {
            boolean charDodged = random.nextDouble() * 100 < totalStats.dodgeChance().doubleValue();
            
            if (charDodged) {
                String msg = character.getName() + " dodged " + monster.getName() + "'s attack!";
                log.addEvent(new CombatEvent(monster.getName(), "Dodge", 0, msg));
            } else {
                int damage = calculateDamage(monster.getAttack(), totalStats.defense());
                charHealth -= damage;
                damageTakenByChar += damage;
                
                String msg = monster.getName() + " attacks " + character.getName() + " for " + damage + " damage!";
                log.addEvent(new CombatEvent(monster.getName(), "Attack", damage, msg));
            }
        }

        // Clean up session
        session.decrementCooldowns();
        session.setCharacterHp(Math.max(0, charHealth));
        session.setCharacterMana(charMana);
        session.setMonsterHp(Math.max(0, monsterHealth));

        boolean isFinished = session.getCharacterHp() == 0 || session.getMonsterHp() == 0;
        boolean isVictory = session.getMonsterHp() == 0;

        if (isFinished) {
            session.setActive(false);
            if (isVictory) {
                log.addEvent(new CombatEvent("System", "Victory", 0, character.getName() + " defeated " + monster.getName() + "!"));
            } else {
                log.addEvent(new CombatEvent("System", "Defeat", 0, character.getName() + " was defeated by " + monster.getName() + "."));
            }
        }

        long goldEarned = isVictory ? monster.getGoldReward() : 0;
        long expEarned = isVictory ? monster.getExperienceReward() : 0;

        return new CombatTurnResult(isFinished, isVictory, damageDealtToMonster, damageTakenByChar, goldEarned, expEarned, session.getCharacterHp(), session.getCharacterMana(), log);
    }

    private int calculateDamage(int attack, int defense) {
        int damage = attack - (defense / 2);
        return Math.max(1, damage);
    }
}
