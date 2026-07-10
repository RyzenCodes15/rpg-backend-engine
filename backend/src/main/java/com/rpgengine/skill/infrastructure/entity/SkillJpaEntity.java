package com.rpgengine.skill.infrastructure.entity;

import com.rpgengine.character.domain.CharacterClass;
import com.rpgengine.skill.domain.SkillType;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "skills")
public class SkillJpaEntity {
    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "class_restriction", nullable = false)
    private CharacterClass classRestriction;

    @Column(name = "required_level", nullable = false)
    private int requiredLevel;

    @Column(name = "mana_cost", nullable = false)
    private int manaCost;

    @Column(nullable = false)
    private int cooldown;

    @Column(name = "base_damage", nullable = false)
    private int baseDamage;

    @Enumerated(EnumType.STRING)
    @Column(name = "skill_type", nullable = false)
    private SkillType skillType;

    private String element;
    private String icon;
    
    @Column(name = "animation_name")
    private String animationName;
    
    @Column(name = "status_effect_type")
    private String statusEffectType;

    public SkillJpaEntity() {}

    public SkillJpaEntity(UUID id, String name, String description, CharacterClass classRestriction, int requiredLevel, int manaCost, int cooldown, int baseDamage, SkillType skillType, String element, String icon, String animationName, String statusEffectType) {
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
