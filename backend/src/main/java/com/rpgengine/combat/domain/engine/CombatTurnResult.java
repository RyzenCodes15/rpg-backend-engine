package com.rpgengine.combat.domain.engine;

public record CombatTurnResult(
        boolean isFinished,
        boolean isVictory,
        int damageDealt,
        int damageTaken,
        long goldEarned,
        long expEarned,
        int charHealthRemaining,
        int charManaRemaining,
        CombatLog log
) {}
