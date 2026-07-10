package com.rpgengine.combat.presentation.dto;

import com.rpgengine.combat.domain.engine.CombatEvent;
import java.util.List;
import java.util.UUID;

public record CombatResponse(
        boolean isVictory,
        int damageDealt,
        int damageTaken,
        long goldEarned,
        long experienceEarned,
        List<CombatEvent> log,
        List<String> itemsDropped
) {}
