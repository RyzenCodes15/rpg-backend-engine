package com.rpgengine.skill.domain;

import com.rpgengine.character.domain.CharacterClass;

import java.util.UUID;

public class Skill {
    private UUID id;
    private String name;
    private String description;
    private CharacterClass classRestriction;
    private int requiredLevel;
    private int manaCost;
    private int cooldown;
    private int baseDamage;
    private SkillType skillType;
    private String element;
    private String icon;
    private String animationName;
    private String statusEffectType;

    public Skill(UUID id, String name, String description, CharacterClass classRestriction, int requiredLevel, int manaCost, int cooldown, int baseDamage, SkillType skillType, String element, String icon, String animationName, String statusEffectType) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.classRestriction = classRestriction;
        this.requiredLevel = requiredLevel;
        this.manaCost = manaCost;
        this.cooldown = cooldown;
        this.baseDamage = baseDamage;
        this.skillType = skillType;
        this.element = element;
        this.icon = icon;
        this.animationName = animationName;
        this.statusEffectType = statusEffectType;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public CharacterClass getClassRestriction() { return classRestriction; }
    public int getRequiredLevel() { return requiredLevel; }
    public int getManaCost() { return manaCost; }
    public int getCooldown() { return cooldown; }
    public int getBaseDamage() { return baseDamage; }
    public SkillType getSkillType() { return skillType; }
    public String getElement() { return element; }
    public String getIcon() { return icon; }
    public String getAnimationName() { return animationName; }
    public String getStatusEffectType() { return statusEffectType; }
}
