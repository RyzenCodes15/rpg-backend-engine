package com.rpgengine.combat.domain.engine;

public record CombatEvent(
        String actor,
        String action,
        int damage,
        String message
) {}
