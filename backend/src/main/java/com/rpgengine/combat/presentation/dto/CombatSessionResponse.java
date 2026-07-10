package com.rpgengine.combat.presentation.dto;

import java.util.Map;
import java.util.UUID;

public record CombatSessionResponse(
        UUID sessionId,
        UUID characterId,
        UUID monsterId,
        boolean isActive,
        int characterHp,
        int characterMana,
        int monsterHp,
        Map<UUID, Integer> cooldowns
) {}
