package com.rpgengine.combat.presentation.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record CombatHistoryResponse(
        UUID id,
        UUID monsterId,
        boolean isVictory,
        int damageDealt,
        int damageTaken,
        long goldEarned,
        long experienceEarned,
        LocalDateTime timestamp
) {}
