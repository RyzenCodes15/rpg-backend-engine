package com.rpgengine.combat.domain.engine;

public record CombatResult(
        boolean isVictory,
        int damageDealt,
        int damageTaken,
        long goldEarned,
        long experienceEarned,
        int finalCharacterHealth,
        CombatLog log
) {}
