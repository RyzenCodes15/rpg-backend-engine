package com.rpgengine.skill.presentation.dto;

import com.rpgengine.character.domain.CharacterClass;
import com.rpgengine.skill.domain.SkillType;

import java.util.UUID;

public record SkillResponse(
        UUID id,
        String name,
        String description,
        CharacterClass classRestriction,
        int requiredLevel,
        int manaCost,
        int cooldown,
        int baseDamage,
        SkillType skillType,
        String element,
        String icon,
        String animationName,
        String statusEffectType,
        boolean unlocked
) {}
